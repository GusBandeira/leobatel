import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, signup } from '../redux/authReducer/authActions'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label, Select } from "../components/Page/Form";
import { CoverImage } from '../components/Page/ImageFrame'
import friends from '../../images/friends.jpg'
import { Col } from 'reactstrap'

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
        return (
            
            <div className="page">
                    <CoverImage>
                        <img src={friends} alt='About' />
                    </CoverImage>
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
                                        <Label>
                                            Cargo
                                            <Col sm={{ size: 4 }} className="no-padding-left">
                                                <Select name="type" onChange={e => this.setState({ contentType: e.target.value })} 
                                                        readOnly={false}>
                                                    <option default hidden>Selecione</option>
                                                    <option value={1} title="Membros normais">Membro</option>
                                                    <option value={2}>Editor</option>
                                                    <option value={3}>Administrador</option>
                                                    <option value={5}>Master</option>
                                                </Select>
                                            </Col>
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
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)