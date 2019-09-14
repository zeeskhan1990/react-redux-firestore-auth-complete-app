import * as actionTypes from './actionTypes'
import axios, {convertToPostBody, convertResponse} from '../../axios/axios-auth';
import * as creds from "../../credentials.json"

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    debugger
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, parseInt(expTime))
    }
}


export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

//Re-hydration
export const checkAuthState = () => {
    return dispatch => {
        debugger
        const token = localStorage.getItem('token')
        if(!token)
            dispatch(logout())
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            const userId = localStorage.getItem('userId')
            if(expirationDate > new Date() ) {
                dispatch(authSuccess({token, userId}))
                dispatch(checkAuthTimeout(expirationDate.getTime() - new Date().getTime()))
            } else {
                dispatch(logout())
            }
                
        }
    }
}

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart())
        const baseUrl = isSignup ? 
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${creds.apiKey}` : 
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${creds.apiKey}`

        axios.post(baseUrl, {email, password, returnSecureToken:true})
        .then((response) => {
            console.log(response)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('userId', response.data.localId)
            localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000))
            dispatch(authSuccess(response.data))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err => {
            return dispatch(authFail(err.response.data.error))
        })
    }
}