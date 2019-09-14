import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => {
    return ( 
        <div className={classes.BuildControls}>
            {controls.map((control) => {
                return (
                    <BuildControl added={() => props.onIngredientAdd(control.type)} 
                        removed={() => props.onIngredientRemove(control.type)}
                        key={control.type} label ={control.label}
                        disabled={props.disabled[control.type]} />
                )
            })} 
            <div className={classes.FinalOrder}>
                <p><strong>Cost: $ {props.price}</strong></p>
                <button disabled={!props.purchasable} 
                onClick={props.ordered} className={classes.OrderButton}>{props.isAuth ? 'Order Now!' : 'Login to order'}</button>
            </div>
            
        </div>
     );
}
 
export default buildControls;