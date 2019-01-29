import React, { Component } from 'react'
import { Formik } from "formik";
import { Container, Row, Col } from 'reactstrap'

// Import Components
import { FormRow, Input, ErrorText, Button, Label, Textarea } from "../components/Form";
import { Title } from '../components/Page.js'
import { CoverImage } from '../components/ImageFrame'
import { validate } from '../validations/ContactValidation'

// Import Image
import friends from '../../images/friends.jpg'
import logo from '../../images/LEOBatelLogo.png'

// Import Services
import ContactService from '../../services/contact'

// Import translations
import { translates }  from 'translations/translates'
import withLanguage from '../withLanguage'
export class Contact extends Component {

  onSubmit = async(values) => {
    try {
      await ContactService.postContact(values)
    } catch (e){  
      console.log("falhou")
    }
  }

  render() {

    const { props: { language } } = this
    const text = translates[`translation${language}`]

      return (
        <div className='page'>
          <CoverImage>
            <img src={friends} alt='contact' />
          </CoverImage>
          <Title>
            {text.contact.title}
          </Title>
          <Row>
            <Col>

            </Col>
          </Row>
          <Formik
            validate={validate}
            onSubmit={values => {
              this.onSubmit(values)
            }}
            render={({touched, errors, values, handleChange, handleBlur, handleSubmit}) => (
              <form onSubmit={handleSubmit}>
                <Container>
                  <Row>
                    <Col lg="4" className="no-padding">
                      <img src={logo} alt="logo" />
                    </Col>
                    <Col lg="6" className="no-padding margin-auto">
                      <FormRow offset="1">
                          <Label>
                            Nome *
                            <Input onChange={handleChange} onBlur={handleBlur} value={values.name} border={touched.name && errors.name && "1px solid red"}
                                  type="text" name="name" placeholder="Nome" />
                            <ErrorText color="red" error={touched.name && errors.name}>{errors.name}</ErrorText>
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
                                type="text" name="message" placeholder="Mensagem" maxLength='250'/>
                          <ErrorText color="red" error={touched.message && errors.message}>{errors.message}</ErrorText>
                        </Label>
                      </FormRow>
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

export default withLanguage(Contact)