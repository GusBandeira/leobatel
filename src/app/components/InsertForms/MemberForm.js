import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, LabelDiv } from "../Form";
import DropzonePreview from '../Dropzone/DropzonePreview'
import { validateMember } from '../../validations/ContentValidation';

export class MemberForm extends Component {

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
        if (!state.files.length) {
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
        )
    }
}

export default MemberForm
