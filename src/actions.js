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

export function deleteFriendship (otherUserId){
    return axios.post('/lost-friend', {id: otherUserId}).then(()=> {
        return{
            type:'LOST_FRIEND',
            otherUserId
        }
    });
    
}
export function newFriend (otherUserId){
    return axios.post('/add-friend/',{id: otherUserId, status: 'yes'}).then(() =>{
        console.log('status in action.js newFriend: ', status)
        return{
            type:'NEW_FRIENDSHIP',
            otherUserId
        }
    });
}

export async function onlineUsers (data){
    console.log('data in online users in action.js: ', data)
    return{
        type: 'ONLINE_USERS',
        online: data
    } 
}

export async function userJoined (data){
    console.log('data in  users in action.js: ', data)
    return{
        type: 'USER_JOINED',
        joined: data
    } 
}

export async function userLeft (data){
    console.log('data in users left in action.js: ', data)
    return{
        type: 'USER_LEFT',
        left: data
    } 
}


    // ajay GET request to get friend and wannabes
    // ONCE WE GET RESP FROM SERVER return an object that contains type AND list we just
    //got back from server!
    // make user you have friends