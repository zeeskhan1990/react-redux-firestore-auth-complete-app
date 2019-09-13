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
        authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
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
            return dispatch(authSuccess(response.data))
        })
        .catch(err => {
            return dispatch(authFail(err))
        })
    }
}