import * as actionTypes from './actionTypes'
import axios, {convertToPostBody, convertResponse} from '../../axios-order'

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