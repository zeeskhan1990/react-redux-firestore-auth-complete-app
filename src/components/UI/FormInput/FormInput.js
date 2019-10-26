import React from 'react';
import classes from './FormInput.css'

const FormInput = (props) => {
    let formInputElement = null
    let formInputClasses = [classes.FormInputElement]
    let validationError = null
    if(props.invalid && props.touched) {
        formInputClasses.push(classes.Invalid)
        validationError = <p>Please enter a valid {props.id}!</p>;
    }
        
    switch(props.elementType) {
        case ("input"):
            formInputElement = <input className={formInputClasses.join(' ')}
            onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
        case ("textarea"):
            formInputElement = <textarea className={formInputClasses.join(' ')}
            onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
        case ("select"):
            formInputElement = (
            <select className={formInputClasses.join(' ')} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>)
            break
        default:
            formInputElement = <input className={formInputClasses.join(' ')}
            onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
    }
    return ( 
        <div className={classes.FormInput}>
            <label className={classes.Label}>{props.label}</label>
            {formInputElement}
            {validationError}
        </div>
     );
}
 
export default FormInput;