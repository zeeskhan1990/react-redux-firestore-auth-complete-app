/**
 * All `combineReducers()` does is generate a function that calls your reducers `with the slices of state selected`
 * `according to their keys`, and combines their results into a single object again. And like other reducers,
 * combineReducers() does not create a new object if all of the reducers provided to it do not change state.
 * For example, combineReducers just invokes `burgerBuilderReducer(state.burgerBuilder, action)` internally
 */

//This is also technically a reducer enhancer(higher order reducer) which takes in reducer(s) and returns another reducer
function combineReducers(reducers) {
    return function (state = {}, action) {
        return Object.keys(reducers).reduce((nextState, key) => {
            // Call every reducer with the part of the state it manages
            nextState[key] = reducers[key](state[key], action)
            return nextState
        }, {})
    }
}

function undoable(reducer) {
    const initialState = {
        past: [],
        present: reducer(undefined, {}),
        future: []
    }
    return function(state=initialState, action) {
        const {past, present, future} = state

        switch(action.type) {
            case 'UNDO':
                const previous = past[past.length - 1]
                const newPast = past.slice(0, past.length - 1)
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                }
                break
            case 'REDO':
                const next = future[0]
                const newFuture = future.slice(1)
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                }
                break;
            default:
                const newPresent = reducer(present, action)
                if(present === newPresent)
                    return state
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                }
        }
    }
}