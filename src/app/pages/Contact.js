import React, { Component } from 'react'

import { Formik } from "formik";
import { Form, Input, ErrorText, Button, Label, TextareaCounter } from "../components/Form";


export class Contact extends Component {

    validate = values => {
        let errors = {};
        
        if (!values.name) {
            errors.name = 'Insira seu nome!';
        } 
        if (!values.subject) {
            errors.subject = 'Insira seu nome!';
        } 
        if (!values.message) {
            errors.message = 'Insira seu nome!';
        } 

        if (!values.email) {
            errors.email = 'Insira seu e-mail para contato!';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.email
            )
        ) {
            errors.email = 'E-mail inválido';
        }


        return errors;
    }

render() {
    return (
      <div className='page'>
      <Formik
          initialValues={{ email: "", password: "" }}
          validate={this.validate}
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
            <Form onSubmit={handleSubmit}>
              <Label>
                Nome *
                <Input onChange={handleChange} onBlur={handleBlur} value={values.name} border={touched.name && errors.name && "1px solid red"}
                       type="text" name="name" placeholder="Nome" />
                {touched.name && errors.name && <ErrorText color="red">{errors.name}</ErrorText>}
              </Label>

              <Label>
                Email *
                <Input onChange={handleChange} onBlur={handleBlur} value={values.email} border={touched.email && errors.email && "1px solid red"}
                       type="text" name="email" placeholder="Email" />
                {touched.email && errors.email && <ErrorText color="red">{errors.email}</ErrorText>}
              </Label>

              <Label>
                Assunto *
                <Input onChange={handleChange} onBlur={handleBlur} value={values.subject} border={touched.subject && errors.subject && "1px solid red"}
                       type="text" name="subject" placeholder="Assunto" />
                {touched.subject && errors.subject && <ErrorText color="red">{errors.subject}</ErrorText>}
              </Label>

              <Label>
                Mensagem *
                <TextareaCounter onChange={handleChange} onBlur={handleBlur} value={values.message} border={touched.message && errors.message && "1px solid red"}
                       type="text" name="message" placeholder="Mensagem" maxLength='250'/>
                {touched.message && errors.message && <ErrorText color="red">{errors.message}</ErrorText>}
              </Label>



              <Button type="submit">Submit</Button>
            </Form>
          )}
        />
      </div>
    )
  }
}

export default Contact
