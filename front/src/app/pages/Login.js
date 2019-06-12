import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, signup } from '../redux/authReducer/authActions'
import { Formik } from "formik";
import { FormRow, Input, ErrorText, Button, Label } from "../components/Page/Form";
import { CoverImage } from '../components/Page/ImageFrame'
import friends from '../../images/friends.jpg'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: true }
    }

    componentDidMount(){
        const { props } = this
        if(props.user) {
            props.history.push('/')
        }
    }
    
    componentDidUpdate(prevProps) {
        const { props } = this
        if(JSON.stringify(prevProps.user) !== JSON.stringify(props.user) && props.user){
            props.history.push('/')
        }
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    onSubmit = (values, resetForm) => { 
        const { props } = this

        try {
            props.login(values)
        }
        catch(e) {

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
                        initialValues={{ userName: '', grade: '', password: '', confirm_password: '' }}
                        render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <React.Fragment>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Nome de Usuário
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.userName} error={touched.userName && errors.userName}
                                                type="text" name="userName" placeholder="Nome" max="70" />
                                            <ErrorText color="red" error={touched.userName && errors.userName}>{errors.userName}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Label>
                                            Password
                                            <Input onChange={handleChange} onBlur={handleBlur} value={values.password} error={touched.password && errors.password}
                                                type="password" name="password" placeholder="Password" maxLength='50' />
                                            <ErrorText color="red" error={touched.password && errors.password}>{errors.password}</ErrorText>
                                        </Label>
                                    </FormRow>
                                    <FormRow size='10' offset='1'>
                                        <Button right type="submit">{'Entrar'}</Button>
                                    </FormRow>
                                </React.Fragment>
                            </form>
                        )}
                    />
            </div>
        )
    }
}

const mapStateToProps = state => ({ user: state.authReducer.user })
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Auth)