import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxillary'

const sideDrawer = (props) => {
    const attachClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Close]
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems clicked={props.closed} isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>        
     );
}
 
export default sideDrawer;