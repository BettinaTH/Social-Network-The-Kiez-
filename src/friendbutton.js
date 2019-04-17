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
        if(data.data.length === 0){
            this.setState({buttonText: 'SEND FRIENDSHIP REQUEST'})
        } if (data.data.length >= 1){ 

            if(data.data[0].accepted == 'yes'){
                this.setState({buttonText: 'END FRIENDSHIP'})
                }
            if(data.data[0].accepted === 'pending' && data.data[0].receiver == this.props.otherUserId) {
                    this.setState({
                        buttonText: 'CANCEL REQUEST'})
                }
            if(data.data[0].accepted === 'pending' && data.data[0].receiver == this.props.myId){
                    this.setState({buttonText: 'ACCEPT FRIEND REQUEST'})
                }
            }
        }
    )}

    changeStatus(){ 
            if(this.state.buttonText == 'SEND FRIENDSHIP REQUEST'){
                axios.post('/get-friend/', {id: this.props.otherUserId, status:'pending'})
                .then(data =>{
                    console.log('Status in ChangeStatus: ', data)
                    this.setState({
                        buttonText: 'CANCEL REQUEST'
                        });
                    }).catch ( err =>
                        console.log('err in  change Status to get-route: ', err))
            } else if (this.state.buttonText == 'CANCEL REQUEST'){
                axios.post('/lost-friend/', {id: this.props.otherUserId})
                .then(data =>{
                    console.log('data in cancel: ', data);
                    this.setState({
                        buttonText: 'SEND FRIENDSHIP REQUEST'
                    })
                })
            } else if (this.state.buttonText == 'END FRIENDSHIP'){
                axios.post('/lost-friend/', {id: this.props.otherUserId})
                .then(data =>{
                    this.setState({
                        buttonText: 'SEND FRIENDSHIP REQUEST'
                    })
                })
             } else if(this.state.buttonText == 'ACCEPT FRIEND REQUEST'){
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