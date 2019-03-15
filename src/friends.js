import React from 'react';
import { connect } from 'react-redux';
import { receiveFriendsWannabes} from './actions';

class Friends extends React.Component {
    constructor(){
        super()
    }
componentDidMount(){
    this.props.dispatch(receiveFriendsWannabes());
    // Disptach function from actions.js
}

    render(){
        console.log(this.props); // test show two object
        return(
            <div>
                Hello, here is a list of friends!
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        //wannabes: // filter mehtod might come in
        //friends: //

    }
}
export default connect(mapStateToProps)(Friends)