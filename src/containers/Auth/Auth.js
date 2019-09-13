import React, { Component } from 'react';
import classes from './Auth.css'
import {connect} from "react-redux"
import FormInput from '../../components/UI/FormInput/FormInput'
import Button from '../../components/UI/Button/Button'
import * as Actions from '../../store/actions/index'

class Auth extends Component {
    state = {
        controls: {
            email: this.createAuthFormElement('input', {
                type:'email',
                placeholder: 'Your Email'
            }, '', {required: true, isEmail: true}),
            password: this.createAuthFormElement('input', {
                type:'password',
                placeholder: 'Password'
            }, '', {required: true, minLength: 6})
        },
        isSignup: true,
        isFormValid: false
    }

    switchModeHandler = () => {
        this.setState((prevState) => {
            return {isSignup: !prevState.isSignup}
        })
    }
    
    createAuthFormElement(elementType, elementConfig, value, validation={}, valid=false) {
        return { elementType, elementConfig, value, validation, 
            valid: Object.keys(validation).length === 0 ? true : valid,
            touched: false }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    formInputChangedHandler = (ev, inputIdentifier) => {
        //Would not be a deep clone
        //const updatedOrderForm = {...this.state.orderForm}
        const updatedOrderForm =  JSON.parse(JSON.stringify(this.state.controls))
        updatedOrderForm[inputIdentifier].touched = true
        updatedOrderForm[inputIdentifier].value = ev.target.value
        updatedOrderForm[inputIdentifier].valid = this.checkValidity(ev.target.value, updatedOrderForm[inputIdentifier].validation)
        console.log(updatedOrderForm)
        /* let isFormValid = true
        for(let updateIdentifier in updatedOrderForm) {
            isFormValid = updatedOrderForm[updateIdentifier].valid && isFormValid
        } */
        this.setState({controls: updatedOrderForm/* , isFormValid */})
    }

    submitHandler = (ev) => {
        ev.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
    }

    render() {        
        let formElementsArray = []
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        const form = formElementsArray.map(formElement => (
            <FormInput 
                key={formElement.id}
                id={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(ev) => this.formInputChangedHandler(ev, formElement.id)}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}/>
        )) 
        return ( 
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" /* disabled={!this.state.isFormValid} */>
                        {this.state.isSignup ? "Sign Up" : "Log In"}
                    </Button>
                </form>
                <div>
                    <Button btnType="Danger" clicked={this.switchModeHandler}>
                        {this.state.isSignup ? "Already have an account? Log in" : "Create a new account"}
                    </Button>
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(Actions.auth(email, password, isSignup))
    }
}
 
export default connect(null, mapDispatchToProps)(Auth);