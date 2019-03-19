import React from 'react';
import { connect } from 'react-redux';

class Chat extends React.Component {
render(){
    return(
        <div> the KIEZ Chat</div>
    )
}


}
const mapStateToProps = state =>{
    return{}
};

export default connect (mapStateToProps)(Chat);