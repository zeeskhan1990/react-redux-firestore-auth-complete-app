import React from 'react';
import {Link} from "react-router-dom"

const NotFound = (props) => {
    return ( 
        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <h3>
                Oops! You are lost, it seems like hunger has got the better of you.
            </h3>
            <p>
                No worries, place your order <Link to="/">here</Link> quickly
            </p>
        </div>
     );
}
 
export default NotFound;