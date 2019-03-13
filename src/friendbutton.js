import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component{
constructor(){
    super();
    this.state = {};
    this.changeStatus = this.changeStatus.bind(this);
    this.friendsButton = this.FriendsButton.bind(this);
}

FriendsButton(text){
    this.setState({
        buttonText: text
    })
}

componentDidMount(){
    // ajax request to server to figure out INITIAL status of friendship
    axios.get('/get-initial-status/' + this.props.otherUserId).then(resp =>{
        console.log('othersUserId: ', this.props.otherUserId)
        console.log('Mount in friendbutton')
        //if(!resp.data.accepted) button text: Send friendship

        // else if (resp.data.accepted == 'pending')
                //if (resp.data.accepted.receiver == this.props.otherUserId)
                //button text Cancel request

                // else button text Accept FRIEND REQUEST

        // else if (resp.data.accepted == YES)
            // SET BUTTON to END FRIENDSHIP

        this.setState({
            buttonText: 'Send Friend Request'
        });
        })
    
}

    changeStatus(){ // update the database and 2nd job is update button text
        console.log('change Status running');
            if(this.state.buttonText == 'Send Friend Request'){
                console.log('myId in change status: ', this.props.myId);
                console.log('otherId in change status: ', this.props.otherUserId);
                axios.post('/get-friend', {id: this.props.otherUserId, status:'pending'})
                .then(resp =>{
                    this.friendsButton('Cancel Request')
                })
            }
        // change the button to CANCEL REQUEST
        //
        // else if
            // button Text == 'CANCEL REQUEST'
            // axios post to delete the rows
            // set Button to SEND FRIEND REQUEST
        
        // else if == 'ACCEPT FRIEND REQUEST
            // axios post to get FRIEND and INSERT accpted to YES
            // set button to END FRIENDSHIP
        
        // else if == 'END FRIENDSHIP'
            // axios post to DELETE row
            // SET BUTTON to Send request


        //IF the button said ' friend request when the button was clicked _--POST
        // request to server and server should run ann INSERT query into friendships
        // OR 'END FRIENDSHIP' POST request to server and server should run a DELETE query

        // IF the button said 'accepted friend request' run a update query to accepted column
        // from false to true
    };

 render(){
     return(
         <div>
             <button onClick = {this.changeStatus}> {this.state.buttonText}</button>
         </div>
     )

 }
}