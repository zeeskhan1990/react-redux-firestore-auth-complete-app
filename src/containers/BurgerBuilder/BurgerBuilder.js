import React, {Component} from "react"
import Aux from "../../hoc/Auxillary";
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 3,
    bacon: 4
};

const BASE_PRICE = 4

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            'salad': 0,
            'bacon': 0,
            'cheese':0,
            'meat':0
        },
        totalPrice: BASE_PRICE, //base price
        purchasable:false,
        purchasing: false
    }

    purchaseHandler = () => {
        //To open show order summary model
        this.setState({purchasing: true})
    }

    updatePurchaseState = (ingredients) => {
        const totalIngredients = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((newSum, ingredientAmount) => {
            return newSum + ingredientAmount
        }, 0)
        this.setState({purchasable : totalIngredients > 0})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    
    purchaseContinueHandler = () => {
        //
    }
    
    addIngredientHandler = (type) => {
        let currentCount = this.state.ingredients[type]
        const updatedCount = ++currentCount
        const updatedIngredients = {
            ...this.state.ingredients,
            [type]: updatedCount
        }
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
        this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        let currentCount = this.state.ingredients[type]
        if (currentCount > 0) {
            const updatedCount = --currentCount
            const updatedIngredients = {
                ...this.state.ingredients,
                [type]: updatedCount
            }
            const updatedPrice = Math.max(this.state.totalPrice - INGREDIENT_PRICES[type], BASE_PRICE)
            this.setState({ingredients: updatedIngredients, totalPrice: updatedPrice})
            this.updatePurchaseState(updatedIngredients)
        }
    }

    render() {
        const disabledInfo = {...this.state.ingredients}
        for (let key in disabledInfo)
            disabledInfo[key] = disabledInfo[key] <= 0
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls onIngredientAdd={this.addIngredientHandler}
                    onIngredientRemove={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}/>
            </Aux>
        )
    }
}

export default BurgerBuilder