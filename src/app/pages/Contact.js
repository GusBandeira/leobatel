import React, { Component } from 'react'
import { Formik } from "formik";
import { Container } from 'reactstrap'

// Import Components
import { FormRow, Input, ErrorText, Button, Label, TextareaCounter } from "../components/Form";
import { CoverImage } from '../components/ImageFrame'
import { validate } from '../validations/ContactValidation'

// Import Image
import friends from '../../images/friends.jpg'

export class Contact extends Component {

  render() {
      return (
        <div className='page'>
          <CoverImage>
            <img src={friends} alt='contact' />
          </CoverImage>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={validate}
            onSubmit={values => {
              console.log(values);
            }}
            render={({
              touched,
              errors,
              values,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Container>
                  <FormRow size="6" offset="2">
                      <Label>
                        Nome *
                        <Input onChange={handleChange} onBlur={handleBlur} value={values.name} border={touched.name && errors.name && "1px solid red"}
                              type="text" name="name" placeholder="Nome" />
                        <ErrorText color="red" error={touched.name && errors.name}>{errors.name}</ErrorText>
                      </Label>
                  </FormRow>
                   
                  <FormRow size="6" offset="2">
                    <Label>
                      Email *
                      <Input onChange={handleChange} onBlur={handleBlur} value={values.email} border={touched.email && errors.email && "1px solid red"}
                            type="text" name="email" placeholder="Email" />
                      <ErrorText color="red" error={touched.email && errors.email}>{errors.email}</ErrorText>
                    </Label>
                  </FormRow>

                  <FormRow size="6" offset="2">
                    <Label>
                      Assunto *
                      <Input onChange={handleChange} onBlur={handleBlur} value={values.subject} border={touched.subject && errors.subject && "1px solid red"}
                            type="text" name="subject" placeholder="Assunto" />
                      <ErrorText color="red" error={touched.subject && errors.subject}>{errors.subject}</ErrorText>
                    </Label>
                  </FormRow>

                  <FormRow size="6" offset="2">
                    <Label>
                      Mensagem *
                      <TextareaCounter onChange={handleChange} onBlur={handleBlur} value={values.message} border={touched.message && errors.message && "1px solid red"}
                            type="text" name="message" placeholder="Mensagem" maxLength='250'/>
                      <ErrorText color="red" error={touched.message && errors.message}>{errors.message}</ErrorText>
                    </Label>
                  </FormRow>

                  <Button type="submit">Submit</Button>
                </Container>
              </form>
            )}
          />
        </div>
      )
    }
}

export default Contact
