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
            <p>Current Price: <strong>{props.price}</strong></p>
            {controls.map((control) => {
                return (
                    <BuildControl added={() => props.onIngredientAdd(control.type)} 
                        removed={() => props.onIngredientRemove(control.type)}
                        key={control.type} label ={control.label}
                        disabled={props.disabled[control.type]} />
                )
            })}
            <button disabled={!props.purchasable} 
                onClick={props.ordered} className={classes.OrderButton}>Order Now!</button>
        </div>
     );
}
 
export default buildControls;