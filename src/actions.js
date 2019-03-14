// all axios request will go here
// all ctuinbs creators here
// so ...every function here MUST return an object with a type property!

export function receiveFriendsWannabes(){

    axios.get('/friendslist/').then(data => {console.log('data in actions.js: ', data)}

    // ajay GET request to get friend and wannabes
    // ONCE WE GET RESP FROM SERVER return an object that contains type AND list we just
    //got back from server!
    // make user you have friends
}