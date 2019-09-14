import React from 'react';
import classes from './Order.css'
import Burger from "../../components/Burger/Burger"

const Order = (props) => {
    let ingredientList = []
    for (let ingredientType of Object.keys(props.ingredients)) {
        const ingredientAmount = props.ingredients[ingredientType]
        ingredientList.push({name: ingredientType, amount: ingredientAmount})
    }
    
    const ingredientOutput = ingredientList.map(ig => {
        const ingredientText = `${ig.amount} ${ig.name}`
        return <li key={ig.name}> {ingredientText}</li>
    })
    return ( 
        <div className={classes.Order}>            
            <Burger ingredients={props.ingredients}/>
            <div className={classes.OrderDetails}>
                <div className={classes.OrderIngredients}>
                    {ingredientOutput}
                </div>            
                <div>
                    Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong>
                </div>
            </div>
        </div>
     );
}
 
export default Order;