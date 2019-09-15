import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import NotFound from './containers/Auth/NotFound/NotFound'
import {connect} from "react-redux"
import * as Actions from "./store/actions/index"

class App extends Component {
  constructor(props) {
    super(props)
    //Logged in status has to be set before any other actions
    this.props.onLoggedInStatusCheck()
  }

  render() {
    let allRoutes = [     
      {
        path: "/auth",
        component: Auth
      },
      {
        path: "/",
        component: BurgerBuilder,
        exact: true
      }
    ]

    if(this.props.isAuthenticated) {
      const authOnlyRoutes = [   
        {
          path: "/edit-order",
          component: BurgerBuilder,
          exact: true
        },
        {
          path: "/checkout",
          component: Checkout
        },   
        {
          path: "/orders",
          component: Orders
        },   
        {
          path: "/logout",
          component: Logout
        } 
      ]

      allRoutes = authOnlyRoutes.concat(allRoutes)
    }

    const routes = allRoutes.map((currentRoute) => <Route key={currentRoute.path}
    path={currentRoute.path} exact={!!currentRoute.exact} component={currentRoute.component} />)
    return (
      <div>
        <Layout>
          <Switch>
            {routes}
            <Route component={NotFound} />
            {/* <Redirect to="/" /> */}
          </Switch>
            {/* <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/logout" component={Logout}/> */}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoggedInStatusCheck: () => dispatch(Actions.checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
