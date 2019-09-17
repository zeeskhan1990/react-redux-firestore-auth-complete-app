import React from 'react';
import classes from './Logo.css'
import Logo from '../../assets/images/burger-logo.png'

const logo = (props) => {
    return ( 
        <div className={classes.Logo} style={{height: props.height}}>
            <img src={Logo} alt="sample"/>
        </div>
     );
}



export default logo;