import React, { Component } from 'react'
import { ModalSuccess, ModalError } from '../utils/constants'
import { Modal } from '../components/Modal/Modal';
import { ModalContent } from '../components/Modal/ModalContent';
import LoadingContent from '../components/Loaders/LoadingContent';
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, Textarea, LabelDiv } from "../components/Page/Form";
import DropzonePreview from '../components/Dropzone/DropzonePreview'
import { connect } from 'react-redux'

import ProjectsService from '../services/projects';
import UserService from '../services/user';

export class Profile extends Component {

    state = {
        errorImage: '',
        files: [],
        modalIsOpen: false,
        modal: {},
        removingFile: false,
        isLoading: false,
        userData: {}
    }

    async componentDidMount(){
        this.getUserData()
    }
    
    getUserData = async() => { 
        const { props } = this
    
        this.setLoading(true)
        const result = await UserService.getSingleUser(props.user._id)
    
        this.setState({ userData: result.data}, () => this.setLoading(false))
    }

    submitForm = async(values, resetForm) => { 
        const { state, props } = this

        this.setLoading(true)

        let formData = new FormData()
        formData.append('user', state.files[0])
        formData.append('name', values.name)
        formData.append('userName', values.userName)
        formData.append('leo', values.leo)
        formData.append('age', values.age)
        formData.append('email', values.email)
        formData.append('_id', props.user._id)
        

        let headers = {}
        headers['Content-Type'] = 'multipart/form-data'

        const objToSend = formData

        try {
            const result = await UserService.postUser(objToSend, headers)

            if(result.status === 200) {
                this.setLoading(false)
                this.toggleModal(true, result.data.message)
            }
        }
        catch(e) {
            this.setLoading(false)
            this.toggleModal(false, e.message)
        }
    }
    
    setLoading = (bool) => {
        this.setState({ isLoading: bool })
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

        const { state, props } = this

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
                    // validate={validateProject}
                    initialValues={state.userData}
                    render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <React.Fragment>
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
                                    <Label>
                                        Nome de Usuário
                                        <Input onChange={handleChange} onBlur={handleBlur} value={values.userName} error={touched.userName && errors.userName}
                                            type="text" name="userName" placeholder="Insira o nome do projeto" max="70" readOnly/>
                                        <ErrorText color="red" error={touched.userName && errors.userName}>{errors.userName}</ErrorText>
                                    </Label>
                                </FormRow>
                                <FormRow size='10' offset='1'> 
                                    <Label>
                                        Nome
                                        <Input onChange={handleChange} onBlur={handleBlur} value={values.name} error={touched.name && errors.name}
                                            type="text" name="name" placeholder="Insira o nome do projeto" max="70"/>
                                        <ErrorText color="red" error={touched.name && errors.name}>{errors.name}</ErrorText>
                                    </Label>
                                </FormRow>
                                <FormRow size='10' offset='1'> 
                                    <Label>
                                        E-mail
                                        <Input onChange={handleChange} onBlur={handleBlur} value={values.email} error={touched.email && errors.email}
                                            type="text" name="email" placeholder="Insira o nome do projeto" max="70"/>
                                        <ErrorText color="red" error={touched.email && errors.email}>{errors.email}</ErrorText>
                                    </Label>
                                </FormRow>
                                <FormRow size='10' offset='1'> 
                                    <Label>
                                        Leo Club
                                        <Input onChange={handleChange} onBlur={handleBlur} value={values.leo} error={touched.leo && errors.leo}
                                            type="text" name="leo" placeholder="Insira o nome do projeto" max="70"/>
                                        <ErrorText color="red" error={touched.leo && errors.leo}>{errors.leo}</ErrorText>
                                    </Label>
                                </FormRow>
                                <FormRow size='10' offset='1'> 
                                    <Label>
                                        Idade
                                        <Input onChange={handleChange} onBlur={handleBlur} value={values.age} error={touched.age && errors.age}
                                            type="text" name="age" placeholder="Insira o nome do projeto" max="70"/>
                                        <ErrorText color="red" error={touched.age && errors.age}>{errors.age}</ErrorText>
                                    </Label>
                                </FormRow>
                                <FormRow size='10' offset='1'> 
                                    <Button right type="submit">Salvar</Button>
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

export default connect(mapStateToProps)(Profile)