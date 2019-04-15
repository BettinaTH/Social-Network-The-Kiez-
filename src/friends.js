import React from 'react';
import { connect } from 'react-redux';
import{ Link } from 'react-router-dom';
import { receiveFriendsWannabes, deleteFriendship, newFriend } from './actions';

class Friends extends React.Component {
    constructor(){
        super()
    }
componentDidMount(){
    this.props.dispatch(receiveFriendsWannabes());
}

    render(){
        const besties = this.props.besties;
        const wannabes = this.props.wannabes;
        const myFriends = besties && besties.map((each)=>
        <div><h3>Your friends</h3>
            <div key={each.id} className="friends">
                    <Link to={`/user/${each.id}`}>
                        <img id="piclist" src={each.picture}></img>
                    </Link>
                <div className="eachName">
                    <div>{each.first}</div> <div>{each.last}</div>
                    <button onClick={() => this.props.dispatch(deleteFriendship(each.id))}>END FRIENDSHIP</button>
                </div>
            </div>
        </div>
            )
        const myWannabes = wannabes && wannabes.map((aspirant)=>
        <div><h3>Your friend requests</h3>
            <div key={aspirant.id} className="friends">
                <Link to={`/user/${aspirant.id}`}>
                    <img id="piclist" src={aspirant.picture}></img>
                </Link>
                    <div className="eachName">
                        <div>{aspirant.first}</div> <div>{aspirant.last}</div>
                        <button onClick={() => this.props.dispatch(newFriend(aspirant.id))}>ACCEPT FRIEND REQUEST</button>
                    </div>
            </div>
        </div>
        )
        return(
            <div>
                <div className="friends-container">
                    <div className="friendslist">
                        {myFriends}
                    </div>
                    <div className="friendslist">
                        {myWannabes}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        besties: state.friendslist && state.friendslist.filter(friendslist => friendslist.accepted == 'yes'),
        wannabes: state.friendslist && state.friendslist.filter(friendslist => friendslist.accepted == 'pending')

    }
}
export default connect(mapStateToProps)(Friends)