export default function reducer(state = {}, action){
    if(action.type == 'RECEIVE_FRIENDS_WANNABES'){
        state = Object.assign({}, state, {
            friendslist:action.friendslist
        });
    }
    // return new state object that contains a property
    // called friendsWannabes whose value is the array we got back from the server
    return state
}
