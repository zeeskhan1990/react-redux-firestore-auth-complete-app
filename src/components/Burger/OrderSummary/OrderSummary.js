import React from 'react';
import Aux from '../../../hoc/Auxillary'
import Button from '../../UI/Button/Button'
import classes from './OrderSummary.css'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .filter(igKey => (props.ingredients[igKey]) > 0)
    .map(igKey => {
        return <li key={igKey}>
                    <strong>{props.ingredients[igKey]}</strong> portion of <span style={{textTransform: 'capitalize'}}>{igKey}</span>
                </li>
    })
    return ( 
        <Aux>
            <p>Your delicious burger would be having: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <div className={classes.OrderSummary}>                
                <div><strong>Cost: $ {props.price}</strong></div>
                <div>
                    <Button btnType='Danger' clicked={props.purchaseCancelled}>Cancel</Button>
                    <Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
                </div>
            </div>
        </Aux>
     );
}
 
export default orderSummary;