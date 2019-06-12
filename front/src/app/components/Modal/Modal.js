import React, { Component } from 'react'
import { Button } from '../Page/Form'
import { Modal as Model, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Modal extends Component {
  render() {
      const { props: { isOpen, toggle, confirm, cancel, modalTitle, children, buttonConfirm, buttonCancel, disabled, noHeader, noFooter } } = this
    return (
       <Model isOpen={isOpen} toggle={() => { toggle(false) }} backdrop>
        <span
          onClick={() => {
            cancel ? this.props.cancel(false) : this.props.confirm(false);
          }}
          className="close-modal"
        />
        {!noHeader && 
            <ModalHeader>
                {modalTitle}
            </ModalHeader>
        }

        <ModalBody>
            {children}
        </ModalBody>

        {!noFooter &&
          <ModalFooter>
            {buttonConfirm &&
              <Button color="primary" onClick={() => confirm() } disabled={disabled}> {buttonConfirm} </Button>
            }
            {buttonCancel &&
                <Button color="secondary" onClick={() => cancel(false) }> {buttonCancel} </Button>
            }
          </ModalFooter>
        }
      </Model>
    )
  }
}

export default Modal
