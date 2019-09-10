import React, {Component} from 'react';
import Aux from '../Auxillary';
import Modal from '../../components/UI/Modal/Modal';

/* const withErrorHandler = (WrappedComponent) => {
    return (props) => {
        return (
            <Aux>
                <Modal show={true}>
                    Something didnt work
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        )
    }
} */

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        constructor(props) {
            super(props)
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
        }

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} modalClose={() => this.setState({error: null})}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }
    }
}


export default withErrorHandler