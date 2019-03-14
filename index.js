const express = require('express');
const app = express();
const compression = require('compression');
//// from petition
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const db = require ('./db');
const hashPassword = require ('./auth.js').hashPassword;
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');

/// petition copy end
// amazon bucket
const s3 = require('./s3');
const config = require('./config'); 
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

// store and uplaod images - do not touch//
var diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//////////////////////////////////////////////////////

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
////////////////////////////////////////////////////////////

// FRIENDSLIST
app.get('/friendslist/', (req, res) =>{
    console.log('get a list of friens route')
    db.friends(req.session.id).then(
        data =>{
            console.log('data.rows in get friends: ', data.rows)
            res.json(data.rows)
        }
    )
    console.log()
})

/// COMPONENT FRIENDSBUTTON
app.get('/get-initial-status/:otherUserId', (req, res) =>{
    console.log('app get initial status');
    console.log('session id in Friendship status:', req.session.id)
    console.log('req.params.id in Friendship status: ', req.params.otherUserId)
    db.friendship(req.session.id, req.params.otherUserId).then(
        data =>{
            console.log('data.rows in status: ', data.rows)
            if(!data.rows){
                console.log('accpeted rows: ', data.rows)
                res.json({});
            } else{
                console.log('data.rows0: ', data.rows[0])
                res.json(data.rows[0]);
            }
        }
    )
})

app.post('/get-friend/', (req, res) =>{
    console.log('connected to get-friend');
    db.sendFriendRequest(req.session.id, req.body.id, req.body.status)
    .then(data =>{
        console.log('data.status.row: ', data.rows);
        console.log('data.rows0.accepted: ', data.rows[0].accepted);
           res.json(data.rows[0].accepted)
        }
    )
})


app.post('/lost-friend/', (req, res) =>{
    db.endFriendship(req.session.id, req.body.id)
    console.log('data in lost friend: ', data.rows)
    .then(data =>{
        res.json(data.rows)
    })
})

app.post('/add-friend/', (req, res) =>{
    console.log('app post route add friend');
    console.log('status in add Friend route: ', req.body.status)
    console.log('my id in add friend: ', req.session.id)
    console.log('body ID in add friend: ', req.body.id)

    db.addFriend(req.session.id, req.body.id, req.body.status)
    .then(data =>{
        console.log('data.rows0.accepted: ', data.rows);
        res.json(data.rows)
    })
})


/// USER COMPONENT
app.get('/user', isLoggedIn, (req, res) => {
        db.userInfo(req.session.id).then(({rows}) =>{
            if (!rows[0].picture){
                rows[0].picture = '/default.png'
            }
            res.json(rows[0])
        }).catch(err =>{
            console.log('err in app get user: ', err)
        })
    }); 

/// see other users profile    
app.get('/others/:id', isLoggedIn, (req, res) => {
    console.log('session id: ', req.session.id)
    console.log('params id: ', req.params.id)
    if(req.params.id != req.session.id)
        db.userInfo(req.params.id).then(({rows}) =>{
            if (!rows[0].picture){
                rows[0].picture = '/default.png'
            }
            res.json(rows[0])
        }).catch(err =>{
            console.log('err in app get user: ', err)
        })
    }); 

// UPDATE BIO
app.post('/bio', function(req, res){
    console.log('anything from BioEditor');
    console.log('id in update bio:', req.session);
    console.log('body.bio: ', req.body.bio)
    db.updateBio(req.session.id, req.body.bio).then(data => {
        console.log('req. textarea in app post bio: ', req.body.bio)
        console.log('data in bio: ', data)
        res.json(data.rows); 
        }).catch(err =>{
            console.log('err in update Bio:', err)
        })
});


// UPLOAD
app.post('/upload', uploader.single('file'),s3.upload, function(req, res) {
    // If nothing went wrong the file is already in the uploads directory
    console.log('Id:', req.session);
         var url= config.s3Url + req.file.filename;

        db.saveImage(req.session.id, url)
            .then(data => {
                res.json(data.rows); 
            }).catch(err =>{
                console.log('err in db save Image: ', err);
})
});


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
