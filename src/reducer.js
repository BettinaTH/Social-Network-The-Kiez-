export default function reducer(state = {}, action){
    if(action.type == 'RECEIVE_FRIENDS_WANNABES'){
        state = Object.assign({}, state, {
            friendslist:action.friendslist
        });
    }

    if (action.type == 'LOST_FRIEND'){
        state = Object.assign({}, state, {
            friendslist: state.friendslist && state.friendslist.filter(
                friendslist => action.otherUserId != friendslist.id
            )
        });
    }
    // return new state object that contains a property
    // called friendsWannabes whose value is the array we got back from the server
    return state
}
