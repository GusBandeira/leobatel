import React, { Component } from 'react';
import { Col } from 'reactstrap';
import styled from 'styled-components'
import { Modal } from './Modal/Modal';
import { ModalContent } from './Modal/ModalContent';
import { LoadingImage } from './Loaders';
import LEOBatelLogo from '../../images/LEOBatelLogoPB.png'

const LoadingRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0;
    padding: 30px 0;
    margin: auto;
`

class LoadingContent extends Component {
    state = {
        isLoading: false,
        modalError: false
    }

    componentDidUpdate(prevProps){
        const { props: { error, isLoading } } = this
        if(error && prevProps.isLoading !== isLoading && !isLoading){
            this.toggleModal()
        }
    }

    toggleModal = () => {
        const { state } = this
        this.setState({ modalError: !state.modalError })
    }

    render() {
        const { state, props: { isLoading } } = this
        return (
            <React.Fragment>
                {state.modalError && 
                    <Modal buttonConfirm="Entendi" isOpen={state.modalError} toggle={this.toggleModal} cancel={this.toggleModal} confirm={this.toggleModal} noHeader>
                        <ModalContent icon={['fas', 'exclamation-circle']} color={'red'}>
                            Ocorreu um erro, mas nossos programadores de prontidão já estão trabalhando arduamente para resolvê-lo. Recarregue a página ou tente mais tarde.
                        </ModalContent>
                    </Modal>
                }
                {isLoading ? 
                    <LoadingRow>
                        <Col xs="12" className="">
                            {/* <span className="custom-loader loading g margin-auto" /> */}
                            <LoadingImage src={LEOBatelLogo} alt="Logo Leo Batel"/>
                        </Col>
                    </LoadingRow>
                    :
                    this.props.children                    
                }
            </React.Fragment>
        )
    }
}

export default LoadingContent;