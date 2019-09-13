import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders:[],
    loading: false,
    purchased: false
}

const reducer = (currentState=initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...currentState,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...currentState,
                loading: false,
                purchased: true,
                orders: currentState.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                    ...currentState,
                    loading: false
                }
        case actionTypes.PURCHASE_INIT:
                return {
                    ...currentState,
                    purchased: false
                }
        case actionTypes.FETCH_ORDERS_START:
                return {
                    ...currentState,
                    loading: true
                }
        case actionTypes.FETCH_ORDERS_SUCCESS:
                return {
                    ...currentState,
                    orders: action.orders,
                    loading: false
                }
        case actionTypes.FETCH_ORDERS_FAIL:
                return {
                    ...currentState,
                    loading: false
                }
        default:
            return currentState
    }
}

export default reducer