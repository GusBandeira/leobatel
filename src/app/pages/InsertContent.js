import React, { Component } from 'react'
import { Formik } from "formik";
import { Container, Row, Col } from 'reactstrap'

// Import Images
import friends from '../../images/friends.jpg'

// Import Components
import { FormRow, Input, ErrorText, Button, Label, Textarea, Select, LabelDiv } from "../components/Form";
import { Title } from '../components/Page.js'
import { CoverImage } from '../components/ImageFrame'
import { validate } from '../validations/ContactValidation'
import DropzonePreview from '../components/DropzonePreview'

export class InsertContent extends Component {

    state = {
        contentType: ""
    }

    onSubmit = values => {
        console.log(values)
    }

    render() {

        const { state } = this

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
                                                    <Select name="type" onChange={e => this.setState({ contentType: e.target.value })}>
                                                        <option value="news">Notícia</option>
                                                        <option value="project">Projeto</option>
                                                        <option value="member">Membro</option>
                                                    </Select>
                                                </Col>
                                            </FormRow>
                                        </Label>

                                        {state.contentType === "member" && (
                                            <React.Fragment>
                                                <FormRow>
                                                    <Label>
                                                        Nome
                                                        <Input value={values.name} border={touched.name && errors.name && "1px solid red"}
                                                            type="text" name="name" placeholder="Nome" max="30"/>
                                                        <ErrorText color="red" error={touched.name && errors.name}>{errors.name}</ErrorText>
                                                    </Label>
                                                </FormRow>
                                                <FormRow>
                                                    <Label>
                                                        Posição
                                                        <Input value={values.grade} border={touched.grade && errors.grade && "1px solid red"}
                                                            type="text" name="grade" placeholder="Posição" max="30"/>
                                                        <ErrorText color="red" error={touched.grade && errors.grade}>{errors.grade}</ErrorText>
                                                    </Label>
                                                </FormRow>
                                                <FormRow>
                                                    <LabelDiv>
                                                        Foto
                                                        <DropzonePreview 
                                                            maxSize={1 * 1024 * 1024} //1MB
                                                            accept={'image/png, image/jpg, image/jpeg'}
                                                        />
                                                    </LabelDiv>
                                                </FormRow>
                                            </React.Fragment>
                                        )}


                                        
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
