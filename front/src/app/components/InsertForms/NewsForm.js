import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, LabelDiv, TextareaNews } from "../Form";
import DropzonePreview from '../Dropzone/DropzonePreview'
import { validateNews } from '../../validations/ContentValidation'

export class NewsForm extends Component {

    state = {
        errorImage: '',
        files: [],
        imageDetails: [],
        imageCounter: 0
    }

    
    setImage = (files, imageDetails) => {
        this.setState({ 
            files : files,
            errorImage: files.length > 0 ? "" : "Adicione uma imagem!",
            imageDetails: imageDetails
        })
    }
    
    checkValidation = () => {
        const { state } = this
        if(!state.files.length){
            this.setState({ errorImage: 'Adicione pelo menos uma imagem!' })
        }
    }
    
    submitForm = values => {
        const { state } = this
        const bodyText = this.formatBodyText(values)

        this.setState({ imageCoutner: 0 })

        console.log(bodyText)
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

        console.log(data)
        return data
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
                                        imageDetails
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
