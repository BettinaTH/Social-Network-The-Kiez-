// all axios request will go here
// all ctuinbs creators here
// so ...every function here MUST return an object with a type property!
import axios from './axios'

export async function receiveFriendsWannabes(){

    const { data } = await axios.get('/friendslist/');
    console.log('data in friendslist action.js: ', data)
        return{
            type: 'RECEIVE_FRIENDS_WANNABES',
            friendslist: data.friendslist
        };
}

    // ajay GET request to get friend and wannabes
    // ONCE WE GET RESP FROM SERVER return an object that contains type AND list we just
    //got back from server!
    // make user you have friends