import React, { Component } from 'react'
import { Formik } from "formik";
import { Container, Row, Col } from 'reactstrap'

// Import Images
import friends from '../../images/friends.jpg'

// Import Components
import { FormRow, Input, ErrorText, Button, Label, Textarea, Select } from "../components/Form";
import { Title } from '../components/Page.js'
import { CoverImage } from '../components/ImageFrame'
import { validate } from '../validations/ContactValidation'
import Dropzone from '../components/Dropzone'

export class InsertContent extends Component {
    render() {
        return (
            <div className='page'>
                <CoverImage>
                    <img src={friends} alt='About' />
                </CoverImage>
                <Title>
                    Inserir conteúdo
        </Title>

                <Formik
                    validate={validate}
                    onSubmit={values => {
                        this.onSubmit(values)
                    }}
                    render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <Container>
                                <Row>
                                    <Col lg="12" className="no-padding margin-auto">
                                        <Label>
                                            <FormRow offset="1">
                                                <Col lg={3}>
                                                    <Select>
                                                        <option value="news">Notícia</option>
                                                        <option value="project">Projeto</option>
                                                        <option value="membro">Membro</option>
                                                    </Select>
                                                </Col>
                                            </FormRow>
                                        </Label>
                                        <FormRow offset="1">
                                            <Label>
                                                Titulo
                                                <Input value={values.title} border={touched.title && errors.title && "1px solid red"}
                                                    type="text" name="title" placeholder="Título" max="30"/>
                                                <ErrorText color="red" error={touched.title && errors.title}>{errors.title}</ErrorText>
                                            </Label>
                                        </FormRow>

                                        <FormRow offset="1">
                                            <Label>
                                                Email *
                                                <Input onChange={handleChange} onBlur={handleBlur} value={values.email} border={touched.email && errors.email && "1px solid red"}
                                                    type="text" name="email" placeholder="Email" />
                                                <ErrorText color="red" error={touched.email && errors.email}>{errors.email}</ErrorText>
                                            </Label>
                                        </FormRow>

                                        <FormRow offset="1">
                                            <Label>
                                                Assunto *
                                                <Input onChange={handleChange} onBlur={handleBlur} value={values.subject} border={touched.subject && errors.subject && "1px solid red"}
                                                    type="text" name="subject" placeholder="Assunto" />
                                                <ErrorText color="red" error={touched.subject && errors.subject}>{errors.subject}</ErrorText>
                                            </Label>
                                        </FormRow>

                                        <FormRow offset="1">
                                            <Label>
                                                Mensagem *
                                                <Textarea onChange={handleChange} onBlur={handleBlur} value={values.message} border={touched.message && errors.message && "1px solid red"}
                                                    type="text" name="message" placeholder="Mensagem" maxLength='250' />
                                                <ErrorText color="red" error={touched.message && errors.message}>{errors.message}</ErrorText>
                                            </Label>
                                        </FormRow>
                                        <Dropzone />
                                        <FormRow offset="1">
                                            <Button right type="submit">Enviar</Button>
                                        </FormRow>
                                    </Col>
                                </Row>

                            </Container>
                        </form>
                    )}
                />
            </div>
        )
    }
}

export default InsertContent
