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
        
        return(
            <div>
                <div className='friends-container'>
                    <div className='friendslist'>
                        <h3>These users are online!</h3>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        // list of online users

    }
}
export default connect(mapStateToProps)(OnlineUsers)