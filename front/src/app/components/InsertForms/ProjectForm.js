import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, Textarea, LabelDiv } from "../Form";
import DropzonePreview from '../Dropzone/DropzonePreview'
import { validateProject } from '../../validations/ContentValidation';
import ProjectsService from '../../../services/projects';
import { ModalSuccess, ModalError } from '../../../utils/constants'
import { Modal } from '../Modal/Modal';
import { ModalContent } from '../Modal/ModalContent';

export class ProjectForm extends Component {

    state = {
        errorImage: '',
        files: [],
        modalIsOpen: false,
        modal: {},
        removingFile: false
    }

    submitForm = async(values, resetForm) => { 
        const { state } = this

        let formData = new FormData()
        formData.append('project', state.files[0])
        formData.append('title', values.title)
        formData.append('description', values.description)
        

        let headers = {}
        headers['Content-Type'] = 'multipart/form-data'

        const objToSend = formData

        try {
            const result = await ProjectsService.postProject(objToSend, headers)

            if(result.status === 200) {
                this.toggleModal(true, result.data.message)
                resetForm({ title: '', description: '' })
                this.resetImage()
            }
        }
        catch(e) {
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
        if(!state.files.length){
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
                <Formik
                    onSubmit={(values, { resetForm }) => {
                        this.submitForm(values, resetForm)
                    }}
                    validate={validateProject}
                    initialValues={{ title: '', description: '' }}
                    render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <React.Fragment>
                                <FormRow size='10' offset='1'> 
                                    <Label>
                                        Título
                                        <Input onChange={handleChange} onBlur={handleBlur} value={values.title} error={touched.title && errors.title}
                                            type="text" name="title" placeholder="Insira o nome do projeto" max="70" />
                                        <ErrorText color="red" error={touched.title && errors.title}>{errors.title}</ErrorText>
                                    </Label>
                                </FormRow>
                                <FormRow size='10' offset='1'> 
                                    <Label>
                                        Descrição
                                        <Textarea onChange={handleChange} onBlur={handleBlur} value={values.description} error={touched.description && errors.description}
                                            type="text" name="description" placeholder="Comente um pouco sobre o pojeto" maxLength='500' />
                                        <ErrorText color="red" error={touched.description && errors.description}>{errors.description}</ErrorText>
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
                                    <Button right type="submit" onClick={() => this.checkValidation()}>Adicionar Projeto</Button>
                                </FormRow>
                            </React.Fragment>
                        </form>
                    )}
                />
            </React.Fragment>
        )
    }
}

export default ProjectForm
