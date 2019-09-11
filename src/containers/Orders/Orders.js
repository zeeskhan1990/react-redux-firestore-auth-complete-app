import React, { Component } from 'react';

import Order from '../../components/Order/Order'
import axios, {convertResponse} from '../../axios-order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
    state = { 
        orders: [],
        loading: true
     }
    componentDidMount() {
        axios.get('/documents/orders').then((res) => {
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
        })
    }
    render() { 
        return ( 
            <div>
                {this.state.orders.map((order) => {
                    return (
                        <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}/>
                    )
                })}
            </div>
         );
    }
}
 
export default withErrorHandler(Orders, axios);