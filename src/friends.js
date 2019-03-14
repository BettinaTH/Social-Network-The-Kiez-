import React from 'react';
import { connect } from 'react-redux'

class Friends extends React.Component {
    constructor(){
        super()
    }
componentDidMount(){
    // Disptach function from actions.js
}

    render(){
        console.log(this.props); // test show two object
        return(
            <div>
                <Friends/>
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