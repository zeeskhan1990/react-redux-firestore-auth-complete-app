import * as actionTypes from './actionTypes'
import axios, {convertToPostBody, convertResponse} from '../../axios/axios-order'

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId,
        orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
}


export const purchaseBurgerStart = () => {
    return {type: actionTypes.PURCHASE_BURGER_START}
}

export const purchaseBurger = (orderData) => {
    return (dispatch) => {
        dispatch(purchaseBurgerStart())
        return axios.post('documents/orders',
            convertToPostBody(orderData),
            {
                "headers":{
                    "post": {
                        "Content-Type": "application/json"
                    }
                }
            }
        ).then(res => {
            console.log(res)
            const orderId = res.data.name.split(/[/ ]+/).pop()
            debugger
            const response = convertResponse(res)
            dispatch(purchaseBurgerSuccess(orderId, orderData))
        })
        .catch(err => {
            console.log(err)
            dispatch(purchaseBurgerFail(err))
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return (dispatch) => {
        dispatch(fetchOrdersStart())
        axios.get('/documents/orders').then((res) => {
            console.log(res)
            let allOrders = []
            res.data.documents.forEach(item => {
                const orderId = item.name.split(/[/ ]+/).pop()
                allOrders.push({...convertResponse(item), id: orderId})
            });
            console.log('All Orders -- ')
            console.log(allOrders)
            dispatch(fetchOrdersSuccess(allOrders))
        }).catch((err) => {
            console.log(err)
            dispatch(fetchOrdersFail(err))
        })
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}