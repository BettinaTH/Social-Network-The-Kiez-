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
        console.log('props of besties in render: ', this.props.besties);
        console.log('const besties in render: ', besties);
        const myFriends = besties && besties.map((each)=>
        <li key={each.id}>
            <img id='piclist' src={each.picture}></img>
            <p>{each.first} {each.last}</p>
        </li>
    )
        return(
            <div className= 'friendlist'>
                <h2>Hello, here is a list of friends and wannabes!</h2>
                <div className='friends'>
                <p>your friends</p>
                {myFriends}
                </div>
                <div className='wannabes'></div>
                <p> Your friends request</p>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        besties: state.friendslist && state.friendslist.filter(friendslist => friendslist.accepted == 'pending'),
        wannabes: state.friendslist && state.friendslist.filter(friendslist => friendslist.accepted == 'yes')
        //wannabes: // filter mehtod might come in
        //friends: //

    }
}
export default connect(mapStateToProps)(Friends)