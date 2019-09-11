import React from 'react';
import classes from './Order.css'

const Order = (props) => {
    let ingredientList = []
    for (let ingredientType of Object.keys(props.ingredients)) {
        const ingredientAmount = props.ingredients[ingredientType]
        ingredientList.push({name: ingredientType, amount: ingredientAmount})
    }
    debugger
    const ingredientOutput = ingredientList.map(ig => {
        return <span 
        style={{textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        key={ig.name}> {ig.name} ({ig.amount})</span>
    })
    return ( 
        <div className={classes.Order}>
            <p>
                {ingredientOutput}
            </p>
            <p>
                Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
     );
}
 
export default Order;