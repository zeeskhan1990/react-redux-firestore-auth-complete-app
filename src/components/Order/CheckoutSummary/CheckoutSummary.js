import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    const test = () => {}
    return (
        <div className={classes.CheckoutSummary}>
            <h1>That's some lip-smacking Burger!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>Cancel</Button>
            {props.showContinue ? <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>Continue</Button> : null}
        </div>
    );
}

export default checkoutSummary;

