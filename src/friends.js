import React from 'react';
import { connect } from 'react-redux';
import { receiveFriendsWannabes } from './actions';

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
        <div key={each.id} className='friendlist'>
            <img id='piclist' src={each.picture}></img>
            <div className='eachName'>
            <div>{each.first}</div> <div>{each.last}</div>
            </div>
        </div>
    )
        const myWannabes = wannabes && wannabes.map((each)=>
        <div key={each.id} className='friendlist'>
            <img id='piclist' src={each.picture}></img>
            <div className='eachName'>
            <div>{each.first}</div> <div>{each.last}</div>
            </div>
        </div>
        )
        return(
            <div>
                <h2>Hello, here is a list of friends and wannabes!</h2>
                <div className='friends'>
                    <h3>Your friends</h3>
                    {myFriends}
                </div>
                <div className='friends'>
                    <h3>Your friend request</h3>
                        {myWannabes}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        besties: state.friendslist && state.friendslist.filter(friendslist => friendslist.accepted == 'pending'),
        wannabes: state.friendslist && state.friendslist.filter(friendslist => friendslist.accepted == 'yes')

    }
}
export default connect(mapStateToProps)(Friends)