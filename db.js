var bcrypt = require('bcryptjs');

var spicedPg = require('spiced-pg');


var db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/wintergreen-petition');


// USER REGISTER FROM PETITION//
module.exports.register = function register(first, last, email, password){
    return db.query('INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id',
        [first, last, email, password]);
};

// USER ADDS MORE PROFILE FROM PETITION
module.exports.moreProfile = function moreProfile(age, city, url, user_id){
    return db.query('INSERT INTO users_profile(age, city, url, user_id) VALUES ($1, $2, $3, $4)', [age, city,url, user_id]);
};

// checkin FROM PETITION
module.exports.checkLogin = function checkLogin(email){
    return db.query('SELECT first, last, email, password, users.id, signature.id AS signed FROM users LEFT JOIN signature ON signature.user_id=users.id WHERE email=$1', [email]);
};
// check Password FROM PETITION
module.exports.checkPassword = function checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function(err, doesMatch) {
            if (err) {
                reject(err);
            } else {
                resolve(doesMatch);
            }
        });
    });
};


// EDITING Profile FROM PETITION
module.exports.showFullProfile = function showFullProfile (user_id){ 
    return db.query('SELECT first, last, age, city, url, password, email FROM users LEFT JOIN users_profile ON users.id=users_profile.user_id WHERE user_id=$1', [user_id]);
};

module.exports.updateProfile = function updateProfile (first, last, email, age, city, url, user_id){
    return db.query('INSERT first, last, email, age, city, url FROM users LEFT JOIN users_profile ON users.id=users_profile.user_id VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (user_id) DO UPDATE SET first = $1, last = $2, email = $3, age = $4, city = $5, url=$6 ',[first, last, email, age, city, url, user_id]);
};
module.exports.updateProfilePW = function updateProfilePW (first, last, email, password, age, city, url, user_id){
    return db.query(`INSERT first, last, email, password, age, 
    city, url FROM users LEFT JOIN users_profile ON users.id=users_profile.user_id VALUES 
    ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (user_id) DO UPDATE SET first = $1, last = $2, email = $3,  
    password = $4, age = $5, city = $6, url=$7`,[first, last, email, password, age, city, url, user_id]);
};

