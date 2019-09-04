import React from 'react';
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const toolbar = (props) => {
    return ( 
        <header className={classes.Toolbar}>
            <div>Side-Menu</div>
            <Logo/>
            <nav className={classes.nav}>
                <NavigationItems/>
            </nav>
        </header>
     );
}
 
export default toolbar;