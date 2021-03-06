import React, {Component} from 'react';
import classes from './Modal.css'
import Aux from '../../../hoc/Auxillary'
import Backdrop from '../Backdrop/Backdrop'

//Modal display hide is done in such manner to take advantage of defined transition css rule
class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    render() {
        return (            
        <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClose}/>
            <div className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}>
                <div className={classes.ModalHeader}>
                    <h3>{this.props.modalHeader || 'Confirm'}</h3>
                </div>
                <div className={classes.ModalBody}>
                    {this.props.children}
                </div>
                
            </div>
        </Aux>
        )
    }
}
 
export default Modal;