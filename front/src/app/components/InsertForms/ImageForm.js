import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label } from "../Page/Form";
import { validateProject } from '../../validations/ContentValidation';

export class ProjectForm extends Component {

    state = { }

    submitForm = values => { 
        const { props: { confirm } } = this
        confirm(values)
    }
    
    render() {
        const { props: { values } } = this
        return (
            <Formik
                onSubmit={() => {}}
                validate={validateProject}
                initialValues={{ title: values ? values.title : "" /*, description: values ? values.description : ""*/ }}
                render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <React.Fragment>
                            <FormRow size='10' offset='1'> 
                                <Label>
                                    Título
                                    <Input onChange={handleChange} onBlur={handleBlur} value={values.title} error={touched.title && errors.title}
                                        type="text" name="title" placeholder="Título da imagem" maxLength="40" />
                                    <ErrorText color="red" error={touched.title && errors.title}>{errors.title}</ErrorText>
                                </Label>
                            </FormRow>
                            {/* <FormRow size='10' offset='1'> 
                                <Label>
                                    Descrição
                                    <Textarea onChange={handleChange} onBlur={handleBlur} value={values.description} error={touched.description && errors.description}
                                        type="text" name="description" placeholder="Descrição da imagem" maxLength='144' />
                                    <ErrorText color="red" error={touched.description && errors.description}>{errors.description}</ErrorText>
                                </Label>
                            </FormRow> */}
                            <FormRow size='10' offset='1'> 
                                <Button right type="button" onClick={() => this.submitForm(values)}>Adicionar Imagem</Button>
                            </FormRow>
                        </React.Fragment>
                    </form>
                )}
            />
        )
    }
}

export default ProjectForm
