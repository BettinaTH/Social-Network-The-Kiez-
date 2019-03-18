import React from 'react';
import { connect } from 'react-redux';

class OnlineUsers extends React.Component {
    constructor(){
        super()
    }
componentDidMount(){

    // Disptach function from actions.js
}

    render(){
        console.log('Hello from Online Component')
        if(this.props.onlineUsers){
        const onlineUsersList = onlineUsers && onlineUsers.map((each)=>
            <div key={each.id} className='friends'>
                <img id='piclist' src={each.picture}></img>
                <div className='eachName'>
                <div>{each.first}</div> <div>{each.last}</div>
                </div>
            </div>
            )  
        return(
            <div>
                <div className='friends-container'>
                    <div className='friendslist'>
                        <h3>These users are online!</h3>
                        {onlineUsersList}
                    </div>
                </div>
            </div>
        )
        } else {
            return (
            <div> Sorry, no users are currently online. :(</div>
                )
        }
    }
}
const mapStateToProps = state =>{
    return{
        onlineUsers: state.onlineUsers

    }
}
export default connect(mapStateToProps)(OnlineUsers)