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
        // if(!data.data.accepted === 'yes'){
        //     this.setState({buttonText: 'END FRIENDSHIP'})
        // } else if(data.data.accepted === 'pending' && data.data.receiver === this.props.otherUserId) {
        //     this.setState({
        //         buttonText: 'ACCEPT REQUEST'})
        // }else if(data.data.accepted === 'pedning' && data.data.sender === this.props.ohterUserÍd){
        //     this.setState({buttonText: 'CANCEL REQUEST'})
        // }else{
        //     this.setState({buttonText: 'SEND FRIENDSHIP REQUEST'})
        // }
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
                .then(data =>{
                    console.log('Status in ChangeStatus: ', data)
                    this.setState({
                        buttonText: 'CANCEL REQUEST'
                    });
                    })
                
            }
            //         console.log('text button3: ', data)
            //         if(data === 'pending'){
            //             console.log(this.FriendsButton)
            //             console.log(this.setState)
            //             this.setState({
            //                 buttonText: 'Cancel Request'
            //             })
            //         }
            //     }).catch( err =>{
            //         console.log('err in send request')
            //     })
            // }
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