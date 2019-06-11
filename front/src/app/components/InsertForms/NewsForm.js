import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, LabelDiv, TextareaNews } from "../Page/Form";
import DropzonePreview from '../Dropzone/DropzonePreview'
import { validateNews } from '../../validations/ContentValidation'
import { ModalSuccess, ModalError } from '../../utils/constants'
import { Modal } from '../Modal/Modal';
import { ModalContent } from '../Modal/ModalContent';
import { connect } from 'react-redux'

import NewsService from '../../services/news';
import LoadingContent from '../Loaders/LoadingContent';
export class NewsForm extends Component {

    state = {
        errorImage: '',
        files: [],
        imageDetails: [],
        imageCounter: 0,
        modalIsOpen: false,
        modal: {},
        removingFile: false,
        isLoading: false
    }

    
    setImage = (files, imageDetails) => {
        this.setState({ 
            files : files,
            errorImage: files.length > 0 ? "" : "Adicione uma imagem!",
            imageDetails: imageDetails
        })
    }

    setLoading = (bool) => {
        this.setState({ isLoading: bool })
    }

    resetImage = () => {
        this.setState({ removingFile: true }, () => this.setState({ removingFile: false, errorImage: "" }))
    }
    
    checkValidation = () => {
        const { state } = this
        if(!state.files.length){
            this.setState({ errorImage: 'Adicione pelo menos uma imagem!' })
        }
    }
    
    submitForm = async(values, resetForm) => {
        const { state, props } = this

        this.setLoading(true)

        let formData = new FormData()
        formData.append('title', values.title)
        formData.append('subtitle', values.subtitle)
        formData.append('body', values.body)
        formData.append(`date`, new Date())
        formData.append(`author`, props.user._id)
        state.files.forEach((file, index) => formData.append(`news`, file));
        state.imageDetails.forEach((file, index) => formData.append(`detail`, file.title));
        
        let headers = {}
        headers['Content-Type'] = 'multipart/form-data'

        const objToSend = formData

        try {
            const result = await NewsService.postNews(objToSend, headers)

            if(result.status === 200) {
                this.setLoading(false)
                this.toggleModal(true, result.data.message)
                resetForm({ title: '', subtitle: '', body: '' })
                this.resetImage()
            }
        }
        catch(e) {
            this.setLoading(false)
            this.toggleModal(false, e.message)
        }
    }

    formatImage = (sp) => {

        const { state } = this

        const image = {
            type: "i",
            photo: Number(state.imageCounter),
            name: state.imageDetails[state.imageCounter].title,
            subtitle: state.imageDetails[state.imageCounter].description
        }
        return image
    }

    formatTextType = (sp, type) => {
        const paragraph = {
            type: type,
            content: sp.trim()
        }
        return paragraph
    }

    formatBodyText(values){
        const split = values.body.split("\n")
        let data = []
        split.forEach(sp => {
            if(sp.trim().substring(0,6).includes('/image')){
                data.push(this.formatImage(sp))
            }
            else if(sp.trim()) {
                data.push(this.formatTextType(sp, 'p'))
            }
        })

        data.unshift(this.formatTextType(values.subtitle, 's'))
        data.unshift(this.formatTextType(values.title, 't'))

        return data
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
                <LoadingContent isLoading={state.isLoading}>
                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            this.submitForm(values, resetForm)
                        }}
                        validate={validateNews}
                        initialValues={{ title: '', subtitle: '', body: '' }}
                        render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <React.Fragment>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Título
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.title} error={touched.title && errors.title}
                                                type="text" name="title" placeholder="Qual a manchete de hoje?" max="100" />
                                            <ErrorText color="red" error={touched.title && errors.title}>{errors.title}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'> 
                                        <Label>
                                            Subtítulo
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.subtitle} error={touched.subtitle && errors.subtitle}
                                                type="text" name="subtitle" placeholder="Faça uma breve descrição do ocorrido" max="140" />
                                            <ErrorText color="red" error={touched.subtitle && errors.subtitle}>{errors.subtitle}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Corpo do texto
                                            <TextareaNews onChange={handleChange} onBlur={handleBlur} value={values.body} error={touched.body && errors.body}
                                                type="text" name="body" placeholder="Mensagem" />
                                            <ErrorText color="red" error={touched.body && errors.body}>{errors.body}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <LabelDiv last>
                                            Fotos
                                            <DropzonePreview
                                                multi
                                                imageDetails
                                                maxSize={1 * 1024 * 1024} //1MB
                                                accept={'image/png, image/jpg, image/jpeg'}
                                                setImage={(e, k) => this.setImage(e, k)}
                                                error={state.errorImage}
                                                removeFile={state.removingFile}
                                            />
                                            <ErrorText color="red" error={state.errorImage}>{state.errorImage}</ErrorText>
                                        </LabelDiv>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Button right type="submit" onClick={() => this.checkValidation()}>Adicionar Notícia</Button>
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

const mapStateToProps = state => ({ user: state.authReducer.user })

export default connect(mapStateToProps)(NewsForm)
