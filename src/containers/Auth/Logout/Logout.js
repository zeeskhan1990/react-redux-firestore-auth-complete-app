import React, { Component } from 'react';
import * as Actions from "../../../store/actions/index"
import {Redirect} from "react-router-dom"
import {connect} from "react-redux"

class Logout extends Component {
    
    constructor(props) {
        super(props)
        this.props.onLogout()
    }

    render() { 
        return ( 
            <Redirect to="/" />
         );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(Actions.logout())
    }
}
 
export default connect(null, mapDispatchToProps)(Logout);