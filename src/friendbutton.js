import React from 'react';
import axios from 'axios';

export default class FriendButton extends React.Component{
constructor(){
    super();
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
}

componentDidMount(){
    // ajax request to server to figure out INITIAL status of friendship
    axios.get('/get-initial-status').then(resp =>{
        this.setState({
            buttonText: 'Send Friend Request'
        });
        })
    
}

    handleClick(){ // update the database and 2nd job is update button text
        console.log('handle Click running');
        this.state({
            buttonText: 'Friend Request is sent'
        });
        //IF the button said ' friend request when the button was clicked _--POST
        // request to server and server should run ann INSERT query into friendships
        // OR 'END FRIENDSHIP' POST request to server and server should run a DELETE query

        // IF the button said 'accepted friend request' run a update query to accepted column
        // from false to true
    }
}
 render(){
     return(
         <div>
             <button onClick = {this.handleClick}> {this.state.buttonText}</button>
         </div>
     )

 }


}