import React from 'react';
import classes from './Modal.css'

//Modal display hide is done in such manner to take advantage of defined transition css rule
const modal = (props) => {
    return ( 
        <div className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
     );
}
 
export default modal;