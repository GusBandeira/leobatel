import React, { Component } from 'react'
import { ModalSuccess, ModalError } from '../utils/constants'
import { Modal } from '../components/Modal/Modal';
import { ModalContent } from '../components/Modal/ModalContent';
import LoadingContent from '../components/Loaders/LoadingContent';
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, Textarea, LabelDiv } from "../components/Page/Form";
import DropzonePreview from '../components/Dropzone/DropzonePreview'
import { connect } from 'react-redux'
import { CoverImage } from '../components/Page/ImageFrame'
import friends from '../../images/friends.jpg'

import UserService from '../services/user';
import PasswordForm from '../components/InsertForms/PasswordForm';
import { PhotoContainer } from '../components/Dropzone/DropzoneComponents';

export class Profile extends Component {

    state = {
        errorImage: '',
        files: [],
        modalIsOpen: false,
        modal: {},
        removingFile: false,
        isLoading: false,
        userData: {},
        passwordModalIsOpen:  false
    }

    async componentDidMount(){
        this.getUserData()
    }
    
    getUserData = async() => { 
        const { props } = this
    
        this.setLoading(true)
        const result = await UserService.getSingleUser(props.user._id)
    
        this.setState({ userData: result.data }, () => {
            this.setLoading(false);
            if(result.data.changePassword){
                this.toggleModalPassword()
            }   
        })
    }

    submitForm = async(values, resetForm) => { 
        const { state, props } = this

        this.setLoading(true)

        let formData = new FormData()
        formData.append('name', values.name)
        formData.append('userName', values.userName)
        formData.append('leo', values.leo)
        formData.append('age', values.age)
        formData.append('email', values.email)
        formData.append('_id', props.user._id)
        
        if(state.files.length > 0){
            formData.append('user', state.files[0])
        }

        let headers = {}
        headers['Content-Type'] = 'multipart/form-data'

        const objToSend = formData

        try {
            const result = await UserService.postUser(objToSend, headers)

            if(result.status === 200) {
                this.getUserData()
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

    toggleModalPassword = (bool) => {
        const { state } = this
        this.setState({ passwordModalIsOpen: bool || !state.passwordModalIsOpen })
    }
    
    changePassword = () => {
        this.toggleModalPassword(false)
    }

    render() {

        const { state, props } = this

        return (
            <div className="page">
                <CoverImage>
                    <img src={friends} alt='About' />
                </CoverImage>
                <React.Fragment>
                    {state.modalIsOpen && 
                        <Modal buttonConfirm="Ok" isOpen={state.modalIsOpen} toggle={this.toggleModal} cancel={this.toggleModal} confirm={this.toggleModal} noHeader>
                            <ModalContent icon={state.modal.icon} color={state.modal.color}>
                                {state.modal.message}
                            </ModalContent>
                        </Modal>
                    }
                    {state.passwordModalIsOpen && 
                        <Modal isOpen={state.passwordModalIsOpen} 
                               toggle={this.toggleModalPassword} cancel={this.toggleModalPassword} confirm={this.changePassword}>
                            <ModalContent icon={state.modal.icon} color={state.modal.color}>
                                <PasswordForm confirmPassword={this.changePassword}/>
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
                                            <PhotoContainer>
                                                <DropzonePreview
                                                    maxSize={1 * 1024 * 1024} //1MB
                                                    accept={'image/png, image/jpg, image/jpeg'}
                                                    setImage={e => this.setImage(e)}
                                                    error={state.errorImage}
                                                    removeFile={state.removingFile}
                                                    profile
                                                    inputImage={state.userData.photo}
                                                />
                                                <ErrorText color="red" error={state.errorImage}>{state.errorImage}</ErrorText>
                                            </PhotoContainer>
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
                                            <Button left type="button" onClick={() => this.setState({ passwordModalIsOpen: true })}>Alterar Senha</Button>
                                            <Button right type="submit">Salvar</Button>
                                        </FormRow>
                                    </React.Fragment>
                                </form>
                            )}
                        />
                    </LoadingContent>
                </React.Fragment>
            </div>
        )
    }
}


const mapStateToProps = state => ({ user: state.authReducer.user })

export default connect(mapStateToProps)(Profile)