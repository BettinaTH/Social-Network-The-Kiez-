const express = require('express');
const app = express();
// io socket
const server = require('http').Server(app);
const io = require('socket.io')(server, { origins: 'localhost:8080' });

const compression = require('compression');

//const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const db = require ('./db');
const hashPassword = require ('./auth.js').hashPassword;
var multer = require('multer');
var uidSafe = require('uid-safe');
var path = require('path');



// amazon bucket
const s3 = require('./s3');
const config = require('./config'); 
// ENDE amazon bucket

app.use(compression());

// LINK TO THE CSS
app.use(
    express.static('./public')
);

// cookie session with socket.io
const cookieSession = require('cookie-session');
const cookieSessionMiddleware = cookieSession({
            secret: `I'm always angry.`,
            maxAge: 1000 * 60 * 60 * 24 * 90
        });

        app.use(cookieSessionMiddleware);
        io.use(function(socket, next) {
            cookieSessionMiddleware(socket.request, socket.request.res, next);
        });

app.use(bodyParser.json());

app.use(csurf());

app.use(function(req, res, next){
    res.cookie('mytoken', req.csrfToken());
    next();
});

// store and uplaod images - do not touch
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

//function for required Login
function isLoggedIn(req, res, next){
    if(!req.session.id){
        res.sendStatus(403);
    } else {
        next();
    }
}

// bundle server
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


// FRIENDSLIST
app.get('/friendslist/', (req, res) =>{
    console.log('get a list of friens route')
    db.friends(req.session.id).then(
        data =>{
            console.log('data.rows in friendslist: ', data.rows)
            res.json({friendslist: data.rows})
        }
    )
    console.log()
})

// COMPONENT FRIENDSBUTTON
app.get('/get-initial-status/:otherUserId', (req, res) =>{
    db.friendship(req.session.id, req.params.otherUserId).then(
        data =>{
            console.log('data.rows in status: ', data.rows)
            if(!data.rows){
                res.json({});
            } else{
                res.json(data.rows);
            }
        }
    )
})

app.post('/get-friend/', (req, res) =>{
    db.sendFriendRequest(req.session.id, req.body.id, req.body.status)
    .then(data =>{
        console.log('data.status.row: ', data.rows);
           res.json(data.rows)
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
    db.addFriend(req.session.id, req.body.id, req.body.status)
    .then(data =>{
        console.log('data.rows in add friend: ', data.rows);
        res.json(data.rows)
    })
})

// USER COMPONENT
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

// OTHERPROFILE COMPONENT    
app.get('/others/:id', isLoggedIn, (req, res) => {
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

// BIOEDITOR COMPONENT
app.post('/bio', function(req, res){
    db.updateBio(req.session.id, req.body.bio).then(data => {
        console.log('data in bio: ', data)
        res.json(data.rows); 
        }).catch(err =>{
            console.log('err in update Bio:', err)
        })
});


// UPLOAD
app.post('/upload', uploader.single('file'),s3.upload, function(req, res) {

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
        if (req.body.first && req.body.last && req.body.email && req.body.password){
            hashPassword(req.body.password).then(hashedPassword =>{
                db.register(req.body.first, req.body.last, req.body.email,hashedPassword).then(data => {
                    req.session.id = data.rows[0].id;
                    req.session.first = req.body.first;
                    req.session.last = req.body.last;
                    req.session.email = req.body.email;
                    console.log('data =>: ', data);
                    res.json({success:true});
                }).catch( err => {
                    console.log (" err in post register: ", err);
                    res.json({success:false})
                });
            })
            } else {
                res.json({success:false});
            }
})

app.post("/login", function(req, res){
    if(req.body.email && req.body.password){
        db.checkLogin(req.body.email)
            .then(profileInfo =>{
                if(profileInfo.rows[0]){
                    req.session.first = profileInfo.rows[0].first;
                    req.session.last = profileInfo.rows[0].last;
                    req.session.mail = profileInfo.rows[0].email;
                    req.session.id = profileInfo.rows[0].id; 
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

// LOGOUT
app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/welcome");
});


// the last route
app.get('*', function(req, res) {
    if (!req.session.id) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


server.listen(8080, function() {
    console.log("I'm listening.");
});

const onlineUsers = {};


io.on('connection', socket =>{
    console.log('hello from socket connection')
    const {id} = socket.request.session;
    console.log('userId in socket connection: ', id);
    if (!id){
        return socket.disconnect();
    }

    onlineUsers[socket.id] = id;

    db.getOnlineUsers(Object.values(onlineUsers)).then(
        ({rows}) =>{
            socket.emit('onlineUsers', {
                onlineUsers: rows
            })
            console.log('rows in socket onlineusers: ', rows)
        }
    )
    const alreadyHere = Object.values(onlineUsers)
        .filter(onlineId => {
            return onlineId == id;
        }).length > 1;
    if (!alreadyHere){
        db.userInfo(id).then(({rows}) => {
                socket.broadcast.emit('userJoined' , {
                    onlineUser: rows[0]
                }); 
                console.log('rows in user joined: ', rows[0]);
            })
        }
    
    socket.on('disconnect', () =>{
        delete onlineUsers[socket.id];
        if(!Object.values(onlineUsers).includes(id)){
            socket.broadcast.emit('userLeft', id);
        }
    })

})
