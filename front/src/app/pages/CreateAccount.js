import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, signup } from '../redux/authReducer/authActions'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label } from "../components/Page/Form";

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: true }
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    onSubmit(values, resetForm) { 
        const { signup } = this.props

        values = { ...values, password: 'BAnd1988!!', confirm_password: 'BAnd1988!!' }

        try {
            const result = signup(values)

            if(result) {
                resetForm()
            }
        }
        catch {
            console.log('Erro')
        }
    }

    render() {
        const { loginMode } = this.state
        return (
            
            <div className="page">
                <div className="login-logo"><b> My</b> Money</div>
                <div className="login-box-body">
                    <p className="login-box-msg">Bem vindo!</p>

                    <Formik
                        onSubmit={(values, { resetForm }) => {
                            this.onSubmit(values, resetForm)
                        }}
                        //validate={validateMember}
                        initialValues={{ name: '', email: '', userName: '' }}
                        render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <React.Fragment>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Nome
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.name} error={touched.name && errors.name}
                                                type="text" name="name" placeholder="Nome" max="70" />
                                            <ErrorText color="red" error={touched.name && errors.name}>{errors.name}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Email
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.email} error={touched.email && errors.email}
                                                type="text" name="email" placeholder="E-mail" maxLength='50' />
                                            <ErrorText color="red" error={touched.email && errors.email}>{errors.email}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Nome de Usuário
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.userName} error={touched.userName && errors.userName}
                                                type="text" name="userName" placeholder="Nome de Usuário" maxLength='50' />
                                            <ErrorText color="red" error={touched.userName && errors.userName}>{errors.userName}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Button right type="submit">{'Criar'}</Button>
                                    </FormRow>
                                </React.Fragment>
                            </form>
                        )}
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)