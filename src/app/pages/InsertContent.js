import React, { Component } from 'react'
import { Formik } from "formik";
import { Container, Row, Col } from 'reactstrap'

// Import Images
import friends from '../../images/friends.jpg'

// Import Components
import { FormRow, Input, ErrorText, Button, Label, Textarea, Select, LabelDiv, TextareaNews } from "../components/Form";
import { Title } from '../components/Page.js'
import { CoverImage } from '../components/ImageFrame'
import { validate } from '../validations/ContactValidation'
import DropzonePreview from '../components/DropzonePreview'

export class InsertContent extends Component {

    state = {
        contentType: "",
        scriptString: " "
    }

    onSubmit = values => {
        console.log(values)
    }

    formatImage = (sp) => {
        let params = sp.substring(6, sp.length)
        params = params.split(',')
        const image = {
            type: "i",
            photo: Number(params[0].trim()),
            name: params[1].trim(),
            subtitle: params[2].trim()
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

    makeJSON(values){
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
                    onSubmit={values => {
                        this.makeJSON(values)
                    }}
                    initialValues={{ title: '', subtitle: '', body: '' }}
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
                                                            type="text" name="name" placeholder="Nome do indivíduo" max="70"/>
                                                        <ErrorText color="red" error={touched.name && errors.name}>{errors.name}</ErrorText>
                                                    </Label>
                                                </FormRow>
                                                <FormRow>
                                                    <Label>
                                                        Posição
                                                        <Input value={values.grade} border={touched.grade && errors.grade && "1px solid red"}
                                                            type="text" name="grade" placeholder="Posição que o indivíduo se encontra dentro do LEO" max="30"/>
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
                                        {state.contentType === "project" && (
                                            <React.Fragment>
                                                <FormRow>
                                                    <Label>
                                                        Título
                                                        <Input value={values.title} border={touched.title && errors.title && "1px solid red"}
                                                            type="text" name="title" placeholder="Insira o nome do projeto" max="70"/>
                                                        <ErrorText color="red" error={touched.title && errors.title}>{errors.title}</ErrorText>
                                                    </Label>
                                                </FormRow>
                                                <FormRow>
                                                    <Label>
                                                        Descrição
                                                        <Textarea onChange={handleChange} onBlur={handleBlur} value={values.description} border={touched.description && errors.description && "1px solid red"}
                                                                type="text" name="description" placeholder="Comente um pouco sobre o pojeto" maxLength='500'/>
                                                        <ErrorText color="red" error={touched.description && errors.description}>{errors.description}</ErrorText>
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
                                        {state.contentType === "news" && (
                                            <React.Fragment>
                                                <FormRow>
                                                    <Label>
                                                        Título
                                                        <Input onChange={handleChange} value={values.title} border={touched.title && errors.title && "1px solid red"}
                                                            type="text" name="title" placeholder="Qual a manchete de hoje?" max="100"/>
                                                        <ErrorText color="red" error={touched.title && errors.title}>{errors.title}</ErrorText>
                                                    </Label>
                                                </FormRow>
                                                <FormRow>
                                                    <Label>
                                                        Subtítulo
                                                        <Input onChange={handleChange} value={values.subtitle} border={touched.subtitle && errors.subtitle && "1px solid red"}
                                                            type="text" name="subtitle" placeholder="Faça uma breve descrição do ocorrido" max="140"/>
                                                        <ErrorText color="red" error={touched.subtitle && errors.subtitle}>{errors.subtitle}</ErrorText>
                                                    </Label>
                                                </FormRow>
                                                <FormRow>
                                                    <Label>
                                                        Corpo do texto
                                                        <TextareaNews onChange={handleChange} onBlur={handleBlur} value={values.body} border={touched.body && errors.body && "1px solid red"}
                                                                type="text" name="body" placeholder="Mensagem" />
                                                        <ErrorText color="red" error={touched.body && errors.body}>{errors.body}</ErrorText>
                                                    </Label>
                                                </FormRow>
                                                <FormRow>
                                                    <LabelDiv>
                                                        Foto
                                                        <DropzonePreview 
                                                            maxSize={1 * 1024 * 1024} //1MB
                                                            accept={'image/png, image/jpg, image/jpeg'}
                                                            multi
                                                        />
                                                    </LabelDiv>
                                                </FormRow>
                                                <Button type="submit">Preview</Button>
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
