import React, { Component } from 'react';
import {Route, Redirect} from "react-router-dom"
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
import {connect} from "react-redux"
import * as Actions from '../../store/actions/index'

class Checkout extends Component {

    componentDidMount() {
        /* const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0
        for(let param of query.entries()) {
            if(param[0]==="price") {
                price = param[1]
            } else {
                ingredients[param[0]] = param[1]

            }
        }
        this.setState({ingredients: ingredients, price: price}) */
        
        //this.props.onInitPurchase()
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        console.log("Checkout page")
        console.log(this.props)
        let summary = ( <Redirect to="/" />)
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.url + '/contact-data'}
                        component={ContactData}/>
                </div>
                
            )
        }
            
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);