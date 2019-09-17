import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css'

const navigationItems = (props) => {
    return ( 
        <ul className={classes.NavigationItems}>
            <NavigationItem onNavItemClicked={props.clicked} link="/" exact>Burger Builder</NavigationItem>
            {props.isAuthenticated ? 
            <NavigationItem onNavItemClicked={props.clicked} link="/orders">My Orders</NavigationItem> :
             null}
            {!props.isAuthenticated ? 
            <NavigationItem onNavItemClicked={props.clicked} link="/auth">Login | Sign Up</NavigationItem> :
            <NavigationItem onNavItemClicked={props.clicked} link="/logout">Logout</NavigationItem>}
        </ul>
     );
}
 
export default navigationItems;