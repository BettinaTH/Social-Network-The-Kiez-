const express = require('express');
const app = express();
const compression = require('compression');
//// from petition
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const csurf = require('csurf');
const db = require ('./db');
//const hashPassword = require ('./auth.js').hashPassword;
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
            //hashPassword(req.body.password).then(hashedPassword =>{
                db.register(req.body.first, req.body.last, req.body.email).then(data => {
                    req.session.id = data.rows[0].id;
                    req.session.first = req.body.first;
                    req.session.last = req.body.last;
                    req.session.email = req.body.email;
                    console.log('data =>: ', data);
                    res.redirect("/");
                }).catch ( err => {
                    console.log ("app.post register: ", err);}); 
            });  
        } else {
            res.render('register');
        }});


//WELCOME COMPONENT
app.get('/welcome', function(req, res) {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
})

// the last route
app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});


app.listen(8080, function() {
    console.log("I'm listening.");
});
