import React, { Component } from 'react';
import classes from './ContactData.css'
import axios, {convertToPostBody, convertResponse} from "../../../axios-order"
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import FormInput from '../../../components/UI/FormInput/FormInput'

class ContactData extends Component {
    state = {
        orderForm: {
                name: this.createOrderFormElement('input', {
                    type:'text',
                    placeholder: 'Your Name'
                }, ''),
                street: this.createOrderFormElement('input', {
                    type:'text',
                    placeholder: 'Your Street'
                }, ''),
                zipCode: this.createOrderFormElement('input', {
                    type:'text',
                    placeholder: 'Your Zip Code'
                }, ''),
                country: this.createOrderFormElement('input', {
                    type:'text',
                    placeholder: 'Your Country of Residence'
                }, ''),
                email: this.createOrderFormElement('input', {
                    type:'email',
                    placeholder: 'Your Email'
                }, ''),
                deliveryMethod: this.createOrderFormElement('select', {
                    options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'cheapest', displayValue: 'Cheapest'}]
                }, '')
        },        
        loading: false
    }

    createOrderFormElement(elementType, elementConfig, value) {
        return { elementType, elementConfig, value }
    }

    orderHandler = (ev) => {
        ev.preventDefault()
        this.setState({loading: true})
        const formData = {}
        for(let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
        const postBody = convertToPostBody(order)
        axios.post('documents/orders',
        postBody,
        {
            "headers":{
                "post": {
                    "Content-Type": "application/json"
                }
            }
        }
    ).then(res => {
        console.log(res)
        this.setState({loading: false})
        this.props.history.push('/')
    })
    .catch(err => {
        console.log(err)
        this.setState({loading: false})
    })
    .finally(() => null)
    }

    formInputChangedHandler = (ev, inputIdentifier) => {
        //Would not be a deep clone
        //const updatedOrderForm = {...this.state.orderForm}
        const updatedOrderForm =  JSON.parse(JSON.stringify(this.state.orderForm))
        updatedOrderForm[inputIdentifier].value = ev.target.value
        this.setState({orderForm: updatedOrderForm})
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
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(ev) => this.formInputChangedHandler(ev, formElement.id)}/>
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        ) 
        if(this.state.loading)
            form = <Spinner/>
        return ( 
            <div className={classes.ContactData}>
                <h4>
                    Enter your contact Data
                </h4>
                {form}
            </div>
         );
    }
}
 
export default ContactData;