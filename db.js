var bcrypt = require('bcryptjs');

var spicedPg = require('spiced-pg');


var db = spicedPg(process.env.DATABASE_URL || 'postgres:postgres:postgres@localhost:5432/network');

// GET ONLINE USERS
module.exports.getOnlineUsers = function (onlineUsers){
    return db.query('SELECT id, first, last, picture FROM users WHERE id = ANY($1)', [onlineUsers])
};

// FRIENDLIST
module.exports.friends = function friends(myId){
    return db.query( `
    SELECT users.id, first, last, picture, accepted
    FROM friendships
    JOIN users
    ON (accepted = 'pending' AND receiver = $1 AND sender = users.id)
    OR (accepted = 'yes' AND receiver = $1 AND sender = users.id)
    OR (accepted = 'yes' AND sender = $1 AND receiver = users.id)`, [myId])
};


// FRIENDSHIP
module.exports.friendship = function friendship(myId, otherUserId){
    return db.query( 'SELECT * FROM friendships WHERE(receiver = $1 AND sender = $2) OR (receiver = $2 AND sender = $1)', [myId, otherUserId]);
};

// END FRIENDSHIP
module.exports.endFriendship = function endFriendship(myId, othersUserID){
    return db.query('DELETE FROM friendships WHERE(receiver = $1 AND sender = $2) OR (receiver = $2 AND sender = $1)', [myId, othersUserID]);
};
// REQUEST A FRIEND
module.exports.sendFriendRequest = function sendFriendRequest(myId, othersUserID, status){
        return db.query('INSERT INTO friendships (sender, receiver, accepted) VALUES ($1, $2, $3) RETURNING *', [myId, othersUserID, status]);
};

// ADD A FRIEND
module.exports.addFriend = function addFriend(myId, othersUserID, status){
    return db.query('UPDATE friendships SET accepted=$3 WHERE (receiver = $1 AND sender = $2) OR (receiver = $2 AND sender = $1)',[myId, othersUserID, status])
};

// USER REGISTER 
module.exports.register = function register(first, last, email, password){
    return db.query('INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4) RETURNING id',[first, last, email, password]);
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
module.exports.userInfo = function showFullProfile (id){ 
    return db.query('SELECT id, first, last, picture, bio FROM users WHERE users.id=$1', [id]);
};

// Safe new picture
module.exports.saveImage = function saveImage(id, url){
    return db.query(`UPDATE users SET picture = $2 WHERE id=$1`, [id, url]);};


// update BIo
module.exports.updateBio = function updateBio (id, bio){
    return db.query('UPDATE users SET bio = $2  WHERE id =$1 RETURNING bio' ,[ id, bio]);
};


