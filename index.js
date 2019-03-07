const express = require('express');
const app = express();
const compression = require('compression');
//// from petition
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const db = require ('./db');
const hashPassword = require ('./auth.js').hashPassword;
/// petition copy end
// amazon bucket
//const s3 = require('./s3');
//const config = require('./config'); 
// ENDE amazon bucket

app.use(compression());

// LINK TO THE CSS
app.use(
    express.static('./public')
);
app.use(cookieSession({
    secret: `I'm always angry.`,
    maxAge: 1000 * 60 * 60 * 24 * 14 // Cookies lasts 2 weeks
}));

app.use(bodyParser.json());

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

/// Middleware to prevent not loggedIn users to go to the loggedIn Section
/*app.use(function (req, res, next){
    if (!req.session.id && req.url != '/welcome' && req.url != '/login'){
        res.redirect('/welcome');
    } else {
        next();
    }
});*/

//function for required Login
function isLoggedIn(req, res, next){
    if(!req.session.id){
        res.sendStatus(403);
    } else {
        next();
    }
}


// checking if I am in production //
if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
};


/// USER COMPONENT
app.get('/user', isLoggedIn, (req, res) => {
        db.userInfo(req.session.id).then(({rows}) =>{
            if (!rows[0].picture){
                rows[0].picture = '/default.jpg'
            }
            res.json(rows[0])
        }).catch(err =>{
            console.log('err in app get user: ', err)
        })
    }); 


/*// UPLOAD FROM IMAGEBOARD
app.post('/upload', uploader.single('file'),s3.upload, function(req, res) {
    // If nothing went wrong the file is already in the uploads directory
    console.log('req.file: ', req.file);
    console.log('req.body:', req.body);
    if (req.file) {
        var url= config.s3Url + req.file.filename;
        console.log('config.s3Url: ', config.s3Url);
        console.log('req.file.filename:', req.file.filename);

        db.saveImage(req.body.title, req.body.username, req.body.description, url)
            .then(results => {
                res.json(results.rows); 
            }).catch(err =>{
                console.log('err in db save Image: ', err);
            });
    } else {
        res.json({
            success: false
        });
    }
});*/


//REGISTER COMPONENT
app.post('/register', function(req, res) {
        console.log("req.body:",req.body);
    // check the required fields
    // IF all fields are filed out, send data to database (table users), hash the password and redirect them to petition
    // database sends back the users ID as a cookie
        if (req.body.first && req.body.last && req.body.email && req.body.password){
            hashPassword(req.body.password).then(hashedPassword =>{
                db.register(req.body.first, req.body.last, req.body.email,hashedPassword).then(data => {
                    console.log('id: ', data.rows[0].id);
                    req.session.id = data.rows[0].id;
                    console.log('session id: ', req.session.id);
                    req.session.first = req.body.first;
                    req.session.last = req.body.last;
                    req.session.email = req.body.email;
                    console.log('data =>: ', data);
                    res.json({success:true});
                }).catch( err => {
                    console.log ("app.post register: ", err);
                    res.json({success:false})
                });
            })
            } else {
                res.json({success:false});
            }
})

app.post("/login", function(req, res){
    if(req.body.email && req.body.password){
        console.log('body mail: ', req.body.email)
        console.log('body:', req.body);
        db.checkLogin(req.body.email)
            .then(profileInfo =>{
                if(profileInfo.rows[0]){
                    req.session.first = profileInfo.rows[0].first;
                    req.session.last = profileInfo.rows[0].last;
                    req.session.mail = profileInfo.rows[0].email;
                    req.session.id = profileInfo.rows[0].id;
                    console.log('print out profileInfo: ', profileInfo);
                    console.log('req.body.password: ', req.body.password);
                    console.log('profilInfo.rows: ', profileInfo.rows[0].password); 
                    db.checkPassword(req.body.password, profileInfo.rows[0].password)
                        .then(matchingPassword => {
                            if(matchingPassword == true){
                                res.json({success:true});                                                        
                            } else {
                                res.json({success:false});
                            }  
                        })
                        .catch(err=>{
                            console.log("error checkPassword: ", err);
                        }); 
                }
            }).catch(err =>{
                console.log('error checkLogin: ', err);
            });
    } else {
        res.render('/login');
    }
});


//WELCOME COMPONENT
app.get('/welcome', function(req, res) {
    if (req.session.id) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
})



// the last route
app.get('*', function(req, res) {
    if (!req.session.id) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.listen(8080, function() {
    console.log("I'm listening.");
});
