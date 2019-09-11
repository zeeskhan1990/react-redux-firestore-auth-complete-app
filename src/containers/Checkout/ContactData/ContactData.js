import React, { Component } from 'react';
import classes from './ContactData.css'
import axios, {convertToPostBody, convertResponse} from "../../../axios-order"
import Spinner from '../../../components/UI/Spinner/Spinner'
import Button from '../../../components/UI/Button/Button'
import FormInput from '../../../components/UI/FormInput/FormInput'

class ContactData extends Component {
    state = {
        name: 'default',
        email: 'default',
        address: {
            street: 'default',
            postalCode: 'default'
        },
        loading: false
    }

    orderHandler = (ev) => {
        ev.preventDefault()
        //this.props.ingredients
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: this.state.name,
                address: this.state.address,
                email: this.state.email
            },
            deliveryMethod: 'fastest'
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

    render() {
        let form = (
            <form>
                    <FormInput inputtype="input" type="text" name="name" placeholder="Your Name" />
                    <FormInput inputtype="input" type="email" name="email" placeholder="Your Email" />
                    <FormInput inputtype="input" type="text" name="street" placeholder="Street" />
                    <FormInput inputtype="input" type="text" name="postal" placeholder="Postal Code" />
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