import * as actionTypes from './actionTypes';
import axios, {convertToPostBody, convertResponse} from '../../axios/axios-order';

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = ( ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const fetchIngredientsStart = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_START
    };
};

export const fetchIngredientsSuccess = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_SUCCESS
    };
};

export const initIngredients = () => {
    return dispatch => {
        dispatch(fetchIngredientsStart())
        axios.get( 'documents/ingredients/all' )
            .then( response => { 
               dispatch(setIngredients(convertResponse(response)));
               dispatch(fetchIngredientsSuccess())
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    };
};