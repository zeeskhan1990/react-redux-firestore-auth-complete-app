import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../StoreUtils'

const BASE_PRICE = 4
const initialState = {
    ingredients: null,
    totalPrice: BASE_PRICE,
    error: false,
    building: false,
    loadingIngredients: false
};

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    meat: 3,
    bacon: 4
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 }
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            }
            return updateObject(state, updatedState)
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: BASE_PRICE,
                error: false,
                building: false
            };
        case actionTypes.FETCH_INGREDIENTS_START:
            return {
                ...state,
                loadingIngredients: true
            };
        case actionTypes.FETCH_INGREDIENTS_SUCCESS:
            return {
                ...state,
                loadingIngredients: false
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
                loadingIngredients: false
            };
        default:
            return state;
    }
};

export default reducer;