import React from 'react';
import classes from './FormInput.css'

const FormInput = (props) => {
    let formInputElement = null
    debugger
    switch(props.elementType) {
        case ("input"):
            formInputElement = <input className={classes.FormInputElement}
            onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
        case ("textarea"):
            formInputElement = <textarea className={classes.FormInputElement}
            onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
        case ("select"):
            debugger
            formInputElement = (
            <select className={classes.FormInputElement} value={props.value}onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>)
            debugger
            break
        default:
            formInputElement = <input className={classes.FormInputElement}
            onChange={props.changed} {...props.elementConfig} value={props.value}/>
            break
    }
    return ( 
        <div className={classes.FormInput}>
            <label className={classes.Label}>{props.label}</label>
            {formInputElement}
        </div>
     );
}
 
export default FormInput;