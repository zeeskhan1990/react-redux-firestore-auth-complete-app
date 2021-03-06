import React, {Component} from "react"
import Aux from "../../hoc/Auxillary";
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from "../../axios/axios-order"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import classes from './BurgerBuilder.css'
import {connect} from "react-redux"

//index is implicit
import * as Actions from "../../store/actions/index"

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        /* axios.get('documents/ingredients/all')
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
        }) */
        if(this.props.match.url === "/edit-order") {
            if(!this.props.ings)
                this.props.history.replace('/')
        } else {
            this.props.initIngredients();
        }            
    }

    purchaseHandler = () => {
        //To open show order summary model
        if(this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath('/checkout')
            this.props.history.push("/auth")
        }
        
    }

    updatePurchaseState = (ingredients) => {
        const totalIngredients = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((newSum, ingredientAmount) => {
            return newSum + ingredientAmount
        }, 0)
        return totalIngredients > 0
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    
    purchaseContinueHandler = () => {
    /* const queryParams = []
    for (let i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    }
    //Should be done in the server
    queryParams.push('price=' + this.props.price)
    const queryString = queryParams.join('&') 
    this.props.history.push({
        pathname: '/checkout',
        search: `?${queryString}`
    });*/
    this.props.onInitPurchase()
    this.props.history.push({pathname: '/checkout'});
}
    
    /* addIngredientHandler = (type) => {
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
    } */

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = <Spinner />;
        if(this.props.error)
            burger = <p>Ingredients can't be loaded!</p>
        if ( this.props.ings && !this.props.loadingIngredients) {
            burger = (
                <Aux>
                    <div className={classes.BurgerBuilder}>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            onIngredientAdd={this.props.onIngredientAdded}
                            onIngredientRemove={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            ordered={this.purchaseHandler}
                            price={this.props.price} 
                            isAuth={this.props.isAuthenticated}/>
                    </div>
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} modalHeader="Your Order">
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null,
        loadingIngredients: state.burgerBuilder.loadingIngredients
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => dispatch(Actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(Actions.removeIngredient(ingredientName)),
        initIngredients: () => dispatch(Actions.initIngredients()),
        onInitPurchase: () => dispatch(Actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(Actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))