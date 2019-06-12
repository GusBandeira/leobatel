import React, { Component } from 'react'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label } from "../Page/Form";
import { validateMember } from '../../validations/ContentValidation';
import { connect } from 'react-redux'

import LoadingContent from '../Loaders/LoadingContent';
import UserService from '../../services/user';

export class PasswordForm extends Component {

    state = {
        isLoading: false
    }

    submitForm = async(values, resetForm) => {
        const { props } = this

        this.setLoading(true)
     
        const objToSend = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
            userName: props.user.userName
        }
        
        try {
            const result = await UserService.postChangePassword(objToSend)
            
            if(result.status === 200) {
                this.setLoading(false)
                resetForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
                props.confirmPassword()
            }
        }
        catch(e) {
            props.cancel('Ocorreu um erro na alteração da senha')
            this.setLoading(false)
        }
    }

    setLoading = (bool) => {
        this.setState({ isLoading: bool })
    }

    render() {

        const { state, props } = this

        return (
            <React.Fragment>
                <LoadingContent isLoading={state.isLoading}>
                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            this.submitForm(values, resetForm)
                        }}
                        validate={validateMember}
                        initialValues={{ oldPassword: '', newPassword: '', confirmPassword: '' }}
                        render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <React.Fragment>
                                    <FormRow size='8' paddingLess>
                                        <Label>
                                            Senha atual
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.oldPassword} error={touched.oldPassword && errors.oldPassword}
                                                type="password" name="oldPassword" placeholder="Qual o cargo do indivíduo no grupo?" maxLength='50' />
                                            <ErrorText color="red" error={touched.oldPassword && errors.oldPassword}>{errors.oldPassword}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='8' paddingLess>
                                        <Label>
                                            Nova senha
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.newPassword} error={touched.newPassword && errors.newPassword}
                                                type="password" name="newPassword" placeholder="Qual o cargo do indivíduo no grupo?" maxLength='50' />
                                            <ErrorText color="red" error={touched.newPassword && errors.newPassword}>{errors.newPassword}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='8' paddingLess>
                                        <Label>
                                            Confirmação de nova senha
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.confirmPassword} error={touched.confirmPassword && errors.confirmPassword}
                                                type="password" name="confirmPassword" placeholder="Qual o cargo do indivíduo no grupo?" maxLength='50' />
                                            <ErrorText color="red" error={touched.confirmPassword && errors.confirmPassword}>{errors.confirmPassword}</ErrorText>
                                        </Label>
                                    </FormRow>
                                </React.Fragment>
                                <FormRow size='12' paddingLess>
                                    <Button left type="button" onClick={() => props.cancel()}>Cancelar</Button>
                                    <Button right type="button" onClick={() => this.submitForm(values)}>Alterar senha</Button>
                                </FormRow>
                            </form>
                        )}
                    />
                </LoadingContent>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({ user: state.authReducer.user })

export default connect(mapStateToProps)(PasswordForm)