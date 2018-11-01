import React, { Component } from 'react'

import { Formik } from "formik";
import { Form, Input, Text, Button, Label } from "../components/Form";

export class Contact extends Component {

    validate = values => {
        let errors = {};
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
                Email *
                {touched.email &&
                  errors.email && <Text color="red">{errors.email}</Text>}
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  border={touched.email && errors.email && "1px solid red"}
                  type="text"
                  name="email"
                  placeholder="Email"
                />
              </Label>
              <Label>
                Password *
                {touched.password &&
                  errors.password && <Text color="red">{errors.password}</Text>}
                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  border={
                    touched.password && errors.password && "1px solid red"
                  }
                  type="password"
                  name="password"
                  placeholder="Password"
                />
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
