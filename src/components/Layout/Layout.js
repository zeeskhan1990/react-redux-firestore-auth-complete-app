import React from "react"

const layout = (props) => (
    <React.Fragment>
        <div toolbar></div>
        <div sideDrawer></div>
        <div backdrop></div>
        <main>
            {props.children}
        </main>
    </React.Fragment>
)

export default layout