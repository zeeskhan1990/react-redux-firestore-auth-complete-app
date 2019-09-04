import React from "react"
import Aux from "../../hoc/Auxillary"
import classes from './Layout.css'

const layout = props => (
    <Aux>
        <div>Toolbar</div>
        <div>Side Drawer</div>
        <div>Navigation</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

export default layout