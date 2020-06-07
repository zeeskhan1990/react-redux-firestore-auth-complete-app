//https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e
// connect() is a function that injects Redux-related props into your component.
// You can inject data and callbacks that change that data by dispatching actions.
function connect(mapStateToProps, mapDispatchToProps) {
    // It lets us inject component as the last step so people can use it as a decorator.
    // Generally you don't need to worry about it.
    return function (WrappedComponent) {
      // It returns a component
      return class extends React.Component {
        render() {
          return (
            // that renders your component
            <WrappedComponent
              {/* with its props  */}
              {...this.props}
              {/* and additional props calculated from Redux store */}
              {...mapStateToProps(store.getState(), this.props)}
              {...mapDispatchToProps(store.dispatch, this.props)}
            />
          )
        }
        
        componentDidMount() {
          // it remembers to subscribe to the store so it doesn't miss updates
          this.unsubscribe = store.subscribe(this.handleChange.bind(this))
        }
        
        componentWillUnmount() {
          // and unsubscribe later
          this.unsubscribe()
        }
      
        handleChange() {
          // and whenever the store state changes, it re-renders.
          this.forceUpdate()
        }
      }
    }
  }
  
  // This is not the real implementation but a mental model.
  // It skips the question of where we get the "store" from (answer: <Provider> puts it in React context)
  // and it skips any performance optimizations (real connect() makes sure we don't re-render in vain).

  /**
   * Internally, React Redux uses React's `context` feature to make the Redux store accessible to deeply nested connected components.
   * As of React Redux version 6, this is normally handled by a single default context object instance generated by `React.createContext()`,
   * called `ReactReduxContext`. React Redux's <Provider> component uses `<ReactReduxContext.Provider>` to put the Redux store
   * and the current store state into context, and connect uses `<ReactReduxContext.Consumer>` to read those values and handle updates.
   */
  
  // The purpose of connect() is that you don't have to think about
  // subscribing to the store or perf optimizations yourself, and
  // instead you can specify how to get props based on Redux store state:
  
  const ConnectedCounter = connect(
    // Given Redux state, return props
    state => ({
      value: state.counter,
    }),
    // Given Redux dispatch, return callback props
    dispatch => ({
      onIncrement() {
        dispatch({ type: 'INCREMENT' })
      }
    })
  )(Counter)