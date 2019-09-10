import React, {Component} from "react"
import Aux from "../../hoc/Auxillary";
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios, {convertToPostBody, convertResponse} from "../../axios-order"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 3,
    bacon: 4
};

const BASE_PRICE = 4

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: BASE_PRICE, //base price
        purchasable:false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('documents/ingredients/all')
        .then(res => {
            console.log('fetching ingredients')
            console.log(res)
            console.log("Converted")
            console.log(convertResponse(res))
            this.setState({ingredients: convertResponse(res)})
        })
        .catch(err => {
            console.log(err)
            this.setState({error: true})
        })
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
        /* this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'ZK',
                address: {
                    street: 'teststreet',
                    zipcode: 12345,
                    country: 'India'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }
        const postBody = convertToPostBody(order)
        axios.post('documents/orders.json',
        postBody,
        {
            "headers":{
                "post": {
                    "Content-Type": "application/json"
                }
            }
        }
    ).then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => this.setState({loading: false, purchasing: false})) */
    this.props.history.push('/checkout');
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
        const disabledInfo = {
            ...this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.state.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        onIngredientAdd={this.addIngredientHandler}
                        onIngredientRemove={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios)