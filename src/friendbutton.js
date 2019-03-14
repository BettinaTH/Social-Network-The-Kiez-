import React from 'react';
import axios from './axios';

export default class FriendButton extends React.Component{
constructor(){
    super();
    this.state = {};
    this.changeStatus = this.changeStatus.bind(this);
}


componentDidMount(){
    axios.get('/get-initial-status/' + this.props.otherUserId).then(data =>{
        console.log('othersUserId: ', this.props.otherUserId)
        console.log('data receiver id: ', data.data.receiver)
        console.log('data status: ', data.data.accepted)
        if(data.data.accepted == 'yes'){
            this.setState({buttonText: 'END FRIENDSHIP'})
        } else if(data.data.accepted === 'pending' && data.data.receiver == this.props.otherUserId) {
            this.setState({
                buttonText: 'CANCEL REQUEST'})
        }else if(data.data.accepted === 'pending' && data.data.sender !== this.props.ohterUserÍd){
            this.setState({buttonText: 'ACCEPT FRIEND REQUEST'})
        }else {
            this.setState({buttonText: 'SEND FRIENDSHIP REQUEST'})
        }
         })
    
}

    changeStatus(){ 
        console.log('change Status running');
        console.log('myId in change status: ', this.props.myId);
        console.log('otherId in change status: ', this.props.otherUserId);
            if(this.state.buttonText == 'SEND FRIENDSHIP REQUEST'){
                axios.post('/get-friend/', {id: this.props.otherUserId, status:'pending'})
                .then(data =>{
                    console.log('Status in ChangeStatus: ', data)
                    this.setState({
                        buttonText: 'CANCEL REQUEST'
                    });
                    })
                
            } else if (this.state.buttonText == 'CANCEL REQUEST' || 'END FRIENDSHIP'){
                axios.post('/lost-friend/', {id: this.props.otherUserId})
                .then(data =>{
                    this.setState({
                        buttonText: 'SEND FRIENDSHIP REQUEST'
                    })
                })
            } else if(this.state.buttonText == 'ACCEPT FRIEND REQUEST'){
                console.log('accept fried request axios post')
                axios.post('/add-friend/', {id: this.props.otherUserId, status:'yes'})
                .then(data =>{
                    console.log('data in change add Friend: ', data);
                    this.setState({
                        buttonText: 'END FRIENDSHIP'
                    })
                })
            }
    };

 render(){
     return(
         <div>
             <button onClick = {this.changeStatus}> {this.state.buttonText}</button>
         </div>
     )

 }
}