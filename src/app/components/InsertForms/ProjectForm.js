import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, Textarea, LabelDiv } from "../Form";
import DropzonePreview from '../Dropzone/DropzonePreview'
import { validateProject } from '../../validations/ContentValidation';

export class ProjectForm extends Component {

    state = {
        errorImage: '',
        files: []
    }

    submitForm = values => { 
        const { state } = this
        console.log(values)
        console.log(state)
    }
    
    setImage = files => {
        this.setState({ files : files, errorImage: files.length > 0 ? "" : "Adicione uma imagem!" })
    }
    
    checkValidation = () => {
        const { state } = this
        if(!state.files.length){
            this.setState({ errorImage: 'Adicione uma imagem!' })
        }
    }

    render() {

        const { state } = this

        return (
            <Formik
                onSubmit={values => {
                    this.submitForm(values)
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
        )
    }
}

export default ProjectForm
