var bcrypt = require('bcryptjs');

var spicedPg = require('spiced-pg');


var db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/network');


// FRIENDSHIP
module.exports.friendship = function friendship(myId, otherUserId){
    return db.query( 'SELECT * FROM friendships WHERE(receiver = $1 AND sender = $2) OR (receiver = $2 AND sender = $1)', [myId, otherUserId]);
};

// END FRIENDSHIP
module.exports.endFriendship = function endFriendship(myId, othersUserID){
    return db.query('DELETE * FROM friendships WHERE sender=$1', [myId, othersUserID]);
};
// ADD A FRIEND
module.exports.sendFriendRequest = function sendFriendRequest(myId, othersUserID, status){
        return db.query('INSERT INTO friendships (sender, receiver, accepted) VALUES ($1, $2, $3) RETURNING *', [myId, othersUserID, status]);
};


// USER REGISTER FROM PETITION//
module.exports.register = function register(first, last, email, password){
    return db.query('INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id',[first, last, email, password]);
};

// USER ADDS MORE PROFILE FROM PETITION
module.exports.moreProfile = function moreProfile(age, city, url, user_id){
    return db.query('INSERT INTO users_profile(age, city, url, user_id) VALUES ($1, $2, $3, $4)', [age, city,url, user_id]);
};

// checkin FROM PETITION
module.exports.checkLogin = function checkLogin(email){
    return db.query('SELECT id, first, last, email, password FROM users WHERE email=$1', [email]);
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


// GETTING USERS INFO
module.exports.userInfo = function showFullProfile (user_id){ 
    return db.query('SELECT id, first, last, picture, bio FROM users WHERE users.id=$1', [user_id]);
};

// Safe new picture
module.exports.saveImage = function saveImage(id, url){
    return db.query(`UPDATE users SET picture = $2 WHERE id=$1`, [id, url]);};


// update BIo
module.exports.updateBio = function updateBio (id, bio){
    return db.query('UPDATE users SET bio = $2  WHERE id =$1 RETURNING bio' ,[ id, bio]);
};


