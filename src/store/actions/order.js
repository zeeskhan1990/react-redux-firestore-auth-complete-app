import * as actionTypes from './actionTypes'
import axios, {convertToPostBody, convertResponse} from '../../axios/axios-order'
import * as creds from "../../credentials.json"

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
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart())
        return axios.post('documents/orders',
            convertToPostBody(orderData),
            {
                "headers":{
                    "post": {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${getState().auth.token}`
                    }
                }
            }
        ).then(res => {
            console.log(res)
            const orderId = res.data.name.split(/[/ ]+/).pop()
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
    return (dispatch, getState) => {
        dispatch(fetchOrdersStart())
        debugger
        /* axios.get('/documents/orders', {
            "headers":{
                "get": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.token}`
                }
            }
        }) */
        axios.post(`/documents:runQuery?key=${creds.apiKey}`, {
            "structuredQuery": {
                "where" : {
                    "fieldFilter" : { 
                    "field": {"fieldPath": "userId"}, 
                    "op":"EQUAL", 
                    "value": {"stringValue": `${getState().auth.userId}`}
                    }
                },
                "from": [{"collectionId": "orders"}],                
                "orderBy": [
                    {
                        "direction": "DESCENDING",
                        "field": {
                            "fieldPath": "createdAt"
                        }
                    }
                ]
                }
        }, {
            "headers":{
                "post": {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getState().auth.token}`
                }
            }
        })
        .then((res) => {
            console.log(res)
            let allOrders = []
            if(res.data[0].document) {
                res.data.forEach(item => {
                    const currentDocument = item.document
                    const orderId = currentDocument.name.split(/[/ ]+/).pop()
                    allOrders.push({...convertResponse(currentDocument), id: orderId})
                });
            }
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