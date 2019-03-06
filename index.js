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
