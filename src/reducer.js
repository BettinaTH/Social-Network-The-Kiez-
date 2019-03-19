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

    if(action.type == 'NEW_FRIENDSHIP'){
        state = Object.assign({}, state,{
            friendslist: state.friendslist.map(friendslist => {
                if(action.otherUserId == friendslist.id){
                    return Object.assign({}, friendslist,{
                        accepted: 'yes'
                    });
                } else {
                    return Object.assign({}, friendslist);
                }
            })
        });
    }
    if (action.type == 'ONLINE_USERS'){
        console.log('online user action:', action)
        	state = Object.assign({}, state, {
                online: action.online
            })

    }

    if (action.type == 'USER_LEFT'){
        console.log('user left action:', action)
        	state = Object.assign({}, state, {
                online: state.online.filter( user => user.id != action.left)
            })

    }

    if (action.type == 'USER_JOINED'){
        console.log('joined user action:', action)
        state = Object.assign({}, state, {
            online: state.online ? state.online.concat(action.joined) : [action.joined]

        })

    }
    // return new state object that contains a property
    // called friendsWannabes whose value is the array we got back from the server
    return state
}
