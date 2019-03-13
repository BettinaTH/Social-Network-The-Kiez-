import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component{
constructor(){
    super();
    this.state = {};
    this.changeStatus = this.changeStatus.bind(this);
}

componentDidMount(){
    // ajax request to server to figure out INITIAL status of friendship
    axios.get('/get-initial-status/' + this.props.otherUserId).then(resp =>{
        console.log('othersUserId: ', this.props.otherUserId)
        console.log('Mount in friendbutton')
        this.setState({
            buttonText: 'Send Friend Request'
        });
        })
    
}

    changeStatus(){ // update the database and 2nd job is update button text
        console.log('change Status running');
        if(this.state.buttonText == 'Send Friend Request')
        axios.post('/get-friend')
        this.setState({
            buttonText: 'Friend Request is sent'
        });
        //IF the button said ' friend request when the button was clicked _--POST
        // request to server and server should run ann INSERT query into friendships
        // OR 'END FRIENDSHIP' POST request to server and server should run a DELETE query

        // IF the button said 'accepted friend request' run a update query to accepted column
        // from false to true
    }

 render(){
     return(
         <div>
             <button onClick = {this.changeStatus}> {this.state.buttonText}</button>
         </div>
     )

 }
}