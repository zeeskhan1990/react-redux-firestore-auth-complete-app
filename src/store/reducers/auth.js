import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../StoreUtils'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (currentState, action) => {
    return updateObject(currentState, {error: null, loading: true})
}

const authSuccess = (currentState, action) => {
    return updateObject(currentState, {
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    })
}

const authFail = (currentState, action) => {
    return updateObject(currentState, {
        error: action.error,
        loading: false
    })
}

const authLogout = (currentState, action) => {
    return updateObject(currentState, {
        token: null,
        userId: null
    })
}

const setAuthRedirectPath = (currentState, action) => {
    return updateObject(currentState, {
        authRedirectPath: action.path
    })
}

const reducer = (currentState=initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START:
            return authStart(currentState, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(currentState, action)
        case actionTypes.AUTH_FAIL:
            return authFail(currentState, action)
        case actionTypes.AUTH_LOGOUT:
                return authLogout(currentState, action)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(currentState, action)
        default:
            return currentState
    }
}
export default reducer