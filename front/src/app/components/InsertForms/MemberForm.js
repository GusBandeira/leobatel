import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, LabelDiv } from "../Page/Form";
import DropzonePreview from '../Dropzone/DropzonePreview'
import { validateMember } from '../../validations/ContentValidation';
import MembersService from '../../services/members'
import { ModalSuccess, ModalError } from '../../utils/constants'

import { Modal } from '../Modal/Modal';
import { ModalContent } from '../Modal/ModalContent';
import LoadingContent from '../Loaders/LoadingContent';

export class MemberForm extends Component {

    state = {
        errorImage: '',
        files: [],
        modalIsOpen: false,
        modal: {},
        removingFile: false,
        isLoading: false
    }

    submitForm = async(values, resetForm) => {
        const { state } = this

        this.setLoading(true)
        
        let formData = new FormData()
        formData.append('member', state.files[0])
        formData.append('name', values.name)
        formData.append('description', values.grade)
        
        
        let headers = {}
        headers['Content-Type'] = 'multipart/form-data'
        
        const objToSend = formData
        
        try {
            const result = await MembersService.postMember(objToSend, headers)
            
            if(result.status === 200) {
                this.setLoading(false)
                this.toggleModal(true, result.data.message)
                resetForm({ name: '', grade: '' })
                this.resetImage()
            }
        }
        catch(e) {
            this.setLoading(false)
            this.toggleModal(false, e.message)
        }
    }

    setImage = files => {
        this.setState({ files : files, errorImage: files.length > 0 ? "" : "Adicione uma imagem!" })
    }
    
    resetImage = () => {
        this.setState({ removingFile: true }, () => this.setState({ removingFile: false, errorImage: "" }))
    }

    checkValidation = () => {
        const { state } = this
        if (!state.files.length) {
            this.setState({ errorImage: 'Adicione uma imagem!' })
        }
    }

    toggleModal = (status, message) => {
        const { state } = this
        const modal = status ? 
            { ...ModalSuccess, message: message || ModalSuccess.message } 
            :
            { ...ModalError, message: message || ModalError.message }
        
        
        this.setState({ 
            modalIsOpen: !state.modalIsOpen,
            modal
        })
    }

    setLoading = (bool) => {
        this.setState({ isLoading: bool })
    }

    render() {

        const { state } = this

        return (
            <React.Fragment>
                {state.modalIsOpen && 
                    <Modal buttonConfirm="Ok" isOpen={state.modalIsOpen} toggle={this.toggleModal} cancel={this.toggleModal} confirm={this.toggleModal} noHeader>
                        <ModalContent icon={state.modal.icon} color={state.modal.color}>
                            {state.modal.message}
                        </ModalContent>
                    </Modal>
                }
                <LoadingContent isLoading={state.isLoading}>
                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            this.submitForm(values, resetForm)
                        }}
                        validate={validateMember}
                        initialValues={{ name: '', grade: '' }}
                        render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <React.Fragment>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Nome
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.name} error={touched.name && errors.name}
                                                type="text" name="name" placeholder="Insira o nome do indivíduo" max="70" />
                                            <ErrorText color="red" error={touched.name && errors.name}>{errors.name}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Cargo
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.grade} error={touched.grade && errors.grade}
                                                type="text" name="grade" placeholder="Qual o cargo do indivíduo no grupo?" maxLength='50' />
                                            <ErrorText color="red" error={touched.grade && errors.grade}>{errors.grade}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <LabelDiv last>
                                            Foto
                                            <DropzonePreview
                                                maxSize={1 * 1024 * 1024} //1MB
                                                accept={'image/png, image/jpg, image/jpeg'}
                                                setImage={e => this.setImage(e)}
                                                error={state.errorImage}
                                                removeFile={state.removingFile}
                                            />
                                            <ErrorText color="red" error={state.errorImage}>{state.errorImage}</ErrorText>
                                        </LabelDiv>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Button right type="submit" onClick={() => this.checkValidation()}>Adicionar Membro</Button>
                                    </FormRow>
                                </React.Fragment>
                            </form>
                        )}
                    />
                </LoadingContent>
            </React.Fragment>
        )
    }
}

export default MemberForm
