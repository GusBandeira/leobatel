import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, LabelDiv, TextareaNews } from "../Form";
import DropzonePreview from '../Dropzone/DropzonePreview'
import { validateNews } from '../../validations/ContentValidation'

export class NewsForm extends Component {

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
            this.setState({ errorImage: 'Adicione pelo menos uma imagem!' })
        }
    }

    render() {

        const { state } = this

        return (
            <Formik
                onSubmit={values => {
                    this.submitForm(values)
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
                                        maxSize={1 * 1024 * 1024} //1MB
                                        accept={'image/png, image/jpg, image/jpeg'}
                                        setImage={e => this.setImage(e)}
                                        error={state.errorImage}
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
        )
    }
}

export default NewsForm
