/**
 * React Redux internally implements the `shouldComponentUpdate` method such that the wrapper component re-renders
 * precisely when the data your component needs has changed. By default, React Redux decides whether the contents
 * of the object returned from mapStateToProps are different using === comparison (a "shallow equality" check) on
 * each fields of the returned object. If any of the fields have changed, then your component will be re-rendered
 * so it can receive the updated values as props. Note that returning a mutated object of the same reference is a
 * common mistake that can result in your component not re-rendering when expected. * 
 */

/**
 * It is called every time the store state changes
 * It receives the entire store state, and should return an object of data this component needs which would be passed as props to this
 */
/**
 * Consider a `mapStateToProps` defined as (state) => stateProps. [stateProps = {stateProp1, stateProp2, ...}]
 * `mapStateToProps` runs when there's any change in the store, i.e, `state` changes
 * Component re-renders when any field of `stateProps` is different, i.e, stateProp1 OR stateProp2 OR ... are different
 */
const mapStateToProps = (state, /**Optional */ownProps) => ({
  // ... computed data from state and optionally ownProps
})

/**
 * React Redux gives you two ways to let components dispatch actions:
 * By default, a connected component receives props.dispatch and can dispatch actions itself.
 * connect can accept an argument called `mapDispatchToProps`, which lets you create functions that dispatch when called,
 * and pass those functions as props to your component. If you don't specify the second argument to connect(),
 * your component will receive dispatch by default. For example, with `mapDispatchToProps` from inside the component,
 * instead of calling props.dispatch(() => increment()), you may call props.increment() directly.
 */
/**
 * This can either be a function, or an object. If it’s a function, it will be called once on component creation.
 * It will receive dispatch as an argument, and should return an object full of functions that use dispatch to dispatch actions.
 * If it’s an object full of action creators, each action creator will be turned into a prop function
 * that automatically dispatches its action when called. Note: This “object shorthand” form is the recommended one.
 */
const mapDispatchToProps = (dispatch, /**Optional */ownProps) => ({
  // ...dispatch func to be used for dispatching actions, and optionally ownProps
})
const mapDispatchToProps = {
  // ... normally is an object full of action creators
}

// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
)
// and that function returns the connected, wrapper component:
const ConnectedComponent = connectToStore(Component)

// We normally do both in one step, like this:
connect(
  mapStateToProps,
  mapDispatchToProps
)(Component)