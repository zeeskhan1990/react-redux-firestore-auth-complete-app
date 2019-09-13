import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    
    let ingredientList = []
    for (let ingredientType of Object.keys(props.ingredients)) {
        const ingredientAmount = props.ingredients[ingredientType]
        for (let i=0; i< ingredientAmount; i++) {
            ingredientList.push(<BurgerIngredient key={ingredientType + i} type={ingredientType}/>)
        }
    }
    if (ingredientList.length === 0)
        ingredientList = "Please add some ingredients"
    const burgerClasses = props.className ? [props.className, classes.Burger].join(' ') : classes.Burger
    return ( 
        <div className={burgerClasses}>
            <BurgerIngredient type="bread-top"/>
                {ingredientList}
            <BurgerIngredient type="bread-bottom"/>
        </div>
     );
}
 
export default burger;