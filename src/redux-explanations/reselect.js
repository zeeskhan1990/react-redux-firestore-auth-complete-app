//Consider this scenario
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todos
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed)
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed)
    }
}

const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
    }
}

/**
 * If the state tree is large, or the calculation expensive, repeating the calculation on every update to the store may cause
 * performance problems as all mapStateToProps in an app runs on store updates. Reselect can help to avoid these.
 * Ideally, only your reducer functions and selectors should know the exact state structure, so if you change where some state lives,
 * you would only need to update those two pieces of logic.
 */

/**
 * `getVisibilityFilter` and `getTodos` are `input-selectors`. They are created as ordinary non-memoized selector functions because
 * they do not transform the data they select. `getVisibleTodos` on the other hand is `a memoized selector`.
 * It takes `getVisibilityFilter` and `getTodos` as input-selectors, and a transform function that calculates the filtered todos list.
 */
import {
    createSelector
} from 'reselect'

const getVisibilityFilter = state => state.visibilityFilter
const getTodos = state => state.todos

export const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case 'SHOW_ALL':
                return todos
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed)
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed)
        }
    }
)

//A memoized selector can itself be an input-selector to another memoized selector.
const getKeyword = state => state.keyword

const getVisibleTodosFilteredByKeyword = createSelector(
    [getVisibleTodos, getKeyword],
    (visibleTodos, keyword) =>
    visibleTodos.filter(todo => todo.text.indexOf(keyword) > -1)
)

//Usage
const mapStateToProps = state => {
    return {
        todos: getVisibleTodos(state)
    }
}

//Accessing React Props in Selectors, and using that 

const getVisibilityFilter = (state, props) =>
    state.todoLists[props.listId].visibilityFilter

const getTodos = (state, props) => state.todoLists[props.listId].todos

const getVisibleTodos = createSelector(
    [getVisibilityFilter, getTodos],
    (visibilityFilter, todos) => {
        switch (visibilityFilter) {
            case 'SHOW_COMPLETED':
                return todos.filter(todo => todo.completed)
            case 'SHOW_ACTIVE':
                return todos.filter(todo => !todo.completed)
            default:
                return todos
        }
    }
)
//props passed to the memoized selector method is available in the input selector
const mapStateToProps = (state, props) => {
    return {
        // WARNING: THE FOLLOWING SELECTOR DOES NOT CORRECTLY MEMOIZE
        todos: getVisibleTodos(state, props)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

/**
 * A selector created with createSelector `only returns the cached value when its set of arguments is the same as its previous set of arguments`.
 * If we alternate between rendering `<VisibleTodoList listId="1" />` and `<VisibleTodoList listId="2" />`, the shared selector will alternate
 * between receiving {listId: 1} and {listId: 2} as its props argument. This will cause the arguments to be different on each call,
 * so the selector will always recompute instead of returning the cached value.
 */
export default VisibleTodoList

//In order to share a selector across multiple VisibleTodoList components and retain memoization,
//each instance of the component needs its own private copy of the selector.

/**
 * We will create a function named `makeGetVisibleTodos` that `returns a new copy of the getVisibleTodos selector` each time it is called:
 */
const getVisibilityFilter = (state, props) =>
    state.todoLists[props.listId].visibilityFilter

const getTodos = (state, props) => state.todoLists[props.listId].todos

const makeGetVisibleTodos = () => {
    return createSelector(
        [getVisibilityFilter, getTodos],
        (visibilityFilter, todos) => {
            switch (visibilityFilter) {
                case 'SHOW_COMPLETED':
                    return todos.filter(todo => todo.completed)
                case 'SHOW_ACTIVE':
                    return todos.filter(todo => !todo.completed)
                default:
                    return todos
            }
        }
    )
}

/**
 * We also need a way to give `each instance of a container access to its own private selector`. If the `mapStateToProps` argument supplied to `connect`
 * returns a function instead of an object, it will be used to create an individual mapStateToProps function for each instance of the container.
 * `makeMapStateToProps` creates a new `getVisibleTodos` selector, and returns a `mapStateToProps` function that has exclusive access to the new selector
 */
const makeMapStateToProps = () => {
    const getVisibleTodos = makeGetVisibleTodos()
    const mapStateToProps = (state, props) => {
        return {
            todos: getVisibleTodos(state, props)
        }
    }
    return mapStateToProps
}

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
}

const VisibleTodoList = connect(
    makeMapStateToProps,
    mapDispatchToProps
)(TodoList)
