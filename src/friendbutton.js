import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component{
constructor(){
    super();
    this.state = {};
    this.changeStatus = this.changeStatus.bind(this);
    //this.FriendsButton = this.FriendsButton.bind(this);
}

// FriendsButton(text){
//     this.setState({
//         buttonText: text
//     })
// }

componentDidMount(){
    // ajax request to server to figure out INITIAL status of friendship
    axios.get('/get-initial-status/' + this.props.otherUserId).then(data =>{
        console.log('othersUserId: ', this.props.otherUserId)
        console.log('Mount in friendbutton')
        console.log('data in Moundt friendbutton: ', data)
        console.log('data receiver id: ', data.data.receiver)
        console.log('data status: ', data.data.accepted)
        if(!data.data.accepted === 'yes'){
            this.setState({buttonText: 'END FRIENDSHIP'})
        } else if(data.data.accepted === 'pending' && data.data.receiver == this.props.otherUserId) {
            this.setState({
                buttonText: 'CANCEL REQUEST'})
        }else if(data.data.accepted === 'pedning' && data.data.sender == this.props.ohterUserÍd){
            this.setState({buttonText: 'ACCEPT REQUEST'})
        }else{
            this.setState({buttonText: 'SEND FRIENDSHIP REQUEST'})
        }
         })
    
}

    changeStatus(){ // update the database and 2nd job is update button text
        console.log('change Status running');
        console.log('myId in change status: ', this.props.myId);
        console.log('otherId in change status: ', this.props.otherUserId);
            if(this.state.buttonText == 'Send Friend Request'){
                axios.post('/get-friend/', {id: this.props.otherUserId, status:'pending'})
                .then(data =>{
                    console.log('Status in ChangeStatus: ', data)
                    this.setState({
                        buttonText: 'CANCEL REQUEST'
                    });
                    })
                
            } else if (this.state.buttonText == 'CANCEL REQUEST'){
                axios.post('/lost-friend/', {id: this.props.otherUserId})
                .then(data =>{
                    this.setState({
                        buttonText: 'SEND FREIND REQUEST'
                    })
                })
            }
    
        
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