import React, { Component } from 'react'
import { Button } from '../Form'
import { Modal as Model, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class Modal extends Component {
  render() {
      const { props: { isOpen, toggle, confirm, cancel, modalTitle, children, buttonConfirm, buttonCancel, disabled, noHeader } } = this
    return (
       <Model isOpen={isOpen} toggle={() => { toggle(false) }} backdrop>
        {!noHeader && 
            <ModalHeader>
                {modalTitle}
                <span onClick={() => cancel(false) } className="close-modal"> </span>
            </ModalHeader>
        }

        <ModalBody>
            {children}
        </ModalBody>

        <ModalFooter>
        <Button color="primary" onClick={() => confirm() } disabled={disabled}> {buttonConfirm} </Button>{' '}
        {buttonCancel &&
            <Button color="secondary" onClick={() => cancel(false) }> {buttonCancel} </Button>
        }
        </ModalFooter>
      </Model>
    )
  }
}

export default Modal
