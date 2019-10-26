/**
 * React Redux does shallow comparisons to see if the mapStateToProps results have changed. 
 * If you return new object or array references every time your component would re-render even if the data is actually the same.
 * Creating new arrays with someArray.map() or someArray.filter(). Copying values with the spread operator { ...oldState, ...newData }\
 * Put these operations in `memoized selector functions` to ensure that they only run if the input values have changed.
 */

/**
 * Wrapping the fields of `mapDispatchToProps` functions with the `dispatch` method passed in as paramter
 * by hand is tedious, so Redux provides a function to simplify that, and that is `bindActionCreators`.
 * It accepts two params: A `function (an action creator)` or `an object (each field an action creator)`, and `dispatch`
 */

import {
    bindActionCreators
} from 'redux'

const increment = () => ({
    type: 'INCREMENT'
})
const decrement = () => ({
    type: 'DECREMENT'
})
const reset = () => ({
    type: 'RESET'
})

// binding an action creator
// returns (...args) => dispatch(increment(...args))
const boundIncrement = bindActionCreators(increment, dispatch)

// binding an object full of action creators
const boundActionCreators = bindActionCreators({
        increment,
        decrement,
        reset
    },
    dispatch
)
// returns
// {
//   increment: (...args) => dispatch(increment(...args)),
//   decrement: (...args) => dispatch(decrement(...args)),
//   reset: (...args) => dispatch(reset(...args)),
// }

//Usage
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        increment,
        decrement,
        reset
    }, dispatch)
}

// component receives props.increment, props.decrement, props.reset
connect(
    null,
    mapDispatchToProps
)(Counter)

/**
 * connect supports an “object shorthand” form for the mapDispatchToProps argument:
 * If you pass an object full of action creators instead of a function, connect will automatically call bindActionCreators for you.
 */
const mapDispatchToProps = {
    increment,
    decrement,
    reset
}
// React Redux does this for you automatically:
dispatch => bindActionCreators(mapDispatchToProps, dispatch)