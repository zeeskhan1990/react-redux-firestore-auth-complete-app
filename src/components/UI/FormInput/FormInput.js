import React from 'react';
import classes from './FormInput.css'

const FormInput = (props) => {
    let formInputElement = null
    switch(props.inputtype) {
        case ("input"):
            formInputElement = <input className={classes.FormInputElement} {...props}/>
            break
        case ("textarea"):
            formInputElement = <textarea className={classes.FormInputElement} {...props}/>
            break
        default:
            formInputElement = <input className={classes.FormInputElement} {...props}/>
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