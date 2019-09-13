import React, { Component } from 'react';

import Order from '../../components/Order/Order'
import axios, {convertResponse} from '../../axios/axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as Actions from '../../store/actions/index'
import {connect} from "react-redux"
import Spinner from "../../components/UI/Spinner/Spinner"

class Orders extends Component {
    componentDidMount() {
        /* axios.get('/documents/orders').then((res) => {
            console.log(res)
            let allOrders = []
            res.data.documents.forEach(item => {
                const orderId = item.name.split(/[/ ]+/).pop()
                allOrders.push({...convertResponse(item), id: orderId})
            });
            console.log('All Orders -- ')
            console.log(allOrders)
            this.setState({orders: allOrders, loading: false})
        }).catch((err) => {
            console.log(err)
            this.setState({loading: false})
        }) */
        this.props.onFetchOrders()
    }
    render() {
        let orders = <Spinner/>
        if(!this.props.loading)
            orders = ( 
                <div>
                    {this.props.orders.map((order) => {
                        return (
                            <div key={order.id}>
                                <Order key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}/>
                            </div>
                            
                        )
                    })}
                </div>
             )
        return orders
    }
}

export const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(Actions.fetchOrders())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))