import React, { Component } from 'react';
import classes from './ContactData.css'
import axios from "../../../axios/axios-order"
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import FormInput from '../../../components/UI/FormInput/FormInput'
import {connect} from "react-redux"
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as Actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: this.createOrderFormElement('input', {
                type:'text',
                placeholder: 'Your Name'
            }, '', {required: true}),
            street: this.createOrderFormElement('input', {
                type:'text',
                placeholder: 'Your Street'
            }, '', {required: true}),
            zipCode: this.createOrderFormElement('input', {
                type:'text',
                placeholder: 'Your Zip Code'
            }, '', {required: true}),
            country: this.createOrderFormElement('input', {
                type:'text',
                placeholder: 'Your Country of Residence'
            }, '', {required: true}),
            email: this.createOrderFormElement('input', {
                type:'email',
                placeholder: 'Your Email'
            }, '', {required: true}),
            deliveryMethod: this.createOrderFormElement('select', {
                options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}]
            }, 'fastest')
        },
        isFormValid: false
    }

    createOrderFormElement(elementType, elementConfig, value, validation={}, valid=false) {
        return { elementType, elementConfig, value, validation, 
            valid: Object.keys(validation).length === 0 ? true : valid,
            touched: false }
    }

    checkValidity(value, rules) {
        let isValid = true
        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        return isValid
    }

    orderHandler = (ev) => {
        ev.preventDefault()
        const formData = {}
        for(let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }
        //Firebase fieldValue timestamp should be used for time related fields
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId,
            createdAt: new Date().getTime()
        }

        this.props.onOrderBurger(order)
    }

    formInputChangedHandler = (ev, inputIdentifier) => {
        //Would not be a deep clone
        //const updatedOrderForm = {...this.state.orderForm}
        const updatedOrderForm =  JSON.parse(JSON.stringify(this.state.orderForm))
        updatedOrderForm[inputIdentifier].touched = true
        updatedOrderForm[inputIdentifier].value = ev.target.value
        updatedOrderForm[inputIdentifier].valid = this.checkValidity(ev.target.value, updatedOrderForm[inputIdentifier].validation)
        console.log(updatedOrderForm)
        let isFormValid = true
        for(let updateIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[updateIdentifier].valid && isFormValid
        }
        this.setState({orderForm: updatedOrderForm, isFormValid})
    }

    render() {
        let formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((formElement) => (
                    <FormInput 
                        key={formElement.id}
                        id={formElement.id}
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(ev) => this.formInputChangedHandler(ev, formElement.id)}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}/>
                ))}
                <Button btnType="Success" disabled={!this.state.isFormValid} clicked={this.orderHandler}>Order</Button>
            </form>
        ) 
        if(this.props.loading)
            form = <Spinner/>
        return ( 
            <div className={classes.ContactData}>
                <h4>
                    Enter your contact details
                </h4>
                {form}
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(Actions.purchaseBurger(orderData))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));