import React, {Component} from "react"
import Aux from "../../hoc/Auxillary"
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
    state={
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    handleDrawerToggleClick = () => {
        this.setState((prevState, props) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.handleDrawerToggleClick}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <div>Navigation</div>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

export default Layout