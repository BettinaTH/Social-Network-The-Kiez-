import React from 'react';
import { connect } from 'react-redux';
import{ Link } from 'react-router-dom';

class OnlineUsers extends React.Component {
    constructor(){
        super()
    }


    render(){
        if(this.props.state){
        const onlineUsers = this.props.state.online
        
        const onlineUsersList = onlineUsers && onlineUsers.map((each)=>
            <div key={each.id} className='friends'>
                <Link to={`/user/${each.id}`}>
                    <img id='piclist' src={each.picture}></img>
                </Link>
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
    console.log('state in online.js:', state);
    return{
        state
    }
}
export default connect(mapStateToProps)(OnlineUsers)