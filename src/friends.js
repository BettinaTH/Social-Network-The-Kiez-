import React from 'react';
import { connect } from 'react-redux';
import { receiveFriendsWannabes, deleteFriendship } from './actions';

class Friends extends React.Component {
    constructor(){
        super()
    }
componentDidMount(){
    this.props.dispatch(receiveFriendsWannabes());
    // Disptach function from actions.js
}

    render(){
        console.log('props in  render Friendscomponent: ', this.props); // test show two object
        const besties = this.props.besties;
        const wannabes = this.props.wannabes;
        console.log('const in render wannabes: ', wannabes);
        console.log('const besties in render: ', besties);
        const myFriends = besties && besties.map((each)=>
        <div key={each.id} className='friends'>
            <img id='piclist' src={each.picture}></img>
            <div className='eachName'>
            <div>{each.first}</div> <div>{each.last}</div>
            <button onClick={() => this.props.dispatch(deleteFriendship(each.id))}>END FRIENDSHIP</button>
            </div>
        </div>
    )
        const myWannabes = wannabes && wannabes.map((each)=>
        <div key={each.id} className='friends'>
            <img id='piclist' src={each.picture}></img>
            <div className='eachName'>
            <div>{each.first}</div> <div>{each.last}</div>
            <button onClick={() => this.props.dispatch(makeFriends(each.id))}>GET FRIENDS</button>
            </div>
        </div>
        )
        return(
            <div>
                <div className='friends-container'>
                    <div className='friendslist'>
                        <h3>Your friends</h3>
                        {myFriends}
                    </div>
                    <div className='friendslist'>
                        <h3>Your friend request</h3>
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