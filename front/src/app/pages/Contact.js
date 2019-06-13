import React, { Component } from 'react'
import { Formik } from "formik";
import { Container, Row, Col } from 'reactstrap'

// Import Components
import { FormRow, Input, ErrorText, Button, Label, Textarea } from "../components/Page/Form";
import { Title } from '../components/Page/Page.js'
import { CoverImage } from '../components/Page/ImageFrame'
import { validate } from '../validations/ContactValidation'
import { ModalSuccess, ModalError } from '../utils/constants'
import { Modal } from '../components/Modal/Modal';
import { ModalContent } from '../components/Modal/ModalContent';
import LoadingContent from '../components/Loaders/LoadingContent';


// Import Image
import friends from '../../images/friends.jpg'
import logo from '../../images/LEOBatelLogo.png'

// Import Services
import MessageService from '../services/message';

// Import translations
import { translates } from '../contexts/language/translations/translates'
import withLanguage from '../components/HOCs/withLanguage'

const FORM_INITIAL_STATE = { name: '', email: '', subject: '', message: '' }

export class Contact extends Component {

	state = {
        modalIsOpen: false,
        modal: {},
        isLoading: false
    }

	onSubmit = async (values, resetForm) => {

		this.setLoading(true)
        
        let formData = new FormData()
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('subject', values.subject)
        formData.append('message', values.message)
        
        
        let headers = {}
        headers['Content-Type'] = 'multipart/form-data'
        
        const objToSend = formData

		try {
			const result = await MessageService.postMessage(values, objToSend, headers)

			if(result.status === 200 || result.status === 201){
				this.setLoading(false)
                this.toggleModal(true, 'Mensagem enviada com sucesso!')
                resetForm(FORM_INITIAL_STATE)
			}
		} catch (e) {
			this.setLoading(false)
            this.toggleModal(false, e.message)
		}
	}

	setLoading = (bool) => {
        this.setState({ isLoading: bool })
    }

	toggleModal = (status, message) => {
        const { state } = this
        const modal = status ? 
            { ...ModalSuccess, message: message || ModalSuccess.message } 
            :
            { ...ModalError, message: message || ModalError.message }
        
        
        this.setState({ 
            modalIsOpen: !state.modalIsOpen,
            modal
        })
    }

	render() {

		const { state, props: { language } } = this
		const text = translates[`translation${language}`]

		return (
			<div className='page'>
				<CoverImage>
					<img src={friends} alt='contact' />
				</CoverImage>
				<Title>
					{text.contact.title}
				</Title>
				{state.modalIsOpen && 
                    <Modal buttonConfirm="Ok" isOpen={state.modalIsOpen} toggle={this.toggleModal} cancel={this.toggleModal} confirm={this.toggleModal} noHeader>
                        <ModalContent icon={state.modal.icon} color={state.modal.color}>
                            {state.modal.message}
                        </ModalContent>
                    </Modal>
                }
                <LoadingContent isLoading={state.isLoading}>
					<Formik
						validate={validate}
						onSubmit={(values, { resetForm }) => {
							this.onSubmit(values, resetForm)
						}}
						initialValues={FORM_INITIAL_STATE}
						render={({ touched, errors, values, handleChange, handleBlur, handleSubmit }) => (
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
								<Input onChange={handleChange} onBlur={handleBlur} value={values.name} error={touched.name && errors.name}
														type="text" name="name" placeholder="Nome" />
													<ErrorText color="red" error={touched.name && errors.name}>{errors.name}</ErrorText>
												</Label>
											</FormRow>

											<FormRow offset="1">
												<Label>
													Email *
							<Input onChange={handleChange} onBlur={handleBlur} value={values.email} error={touched.email && errors.email}
														type="text" name="email" placeholder="Email" />
													<ErrorText color="red" error={touched.email && errors.email}>{errors.email}</ErrorText>
												</Label>
											</FormRow>

											<FormRow offset="1">
												<Label>
													Assunto *
							<Input onChange={handleChange} onBlur={handleBlur} value={values.subject} error={touched.subject && errors.subject}
														type="text" name="subject" placeholder="Assunto" />
													<ErrorText color="red" error={touched.subject && errors.subject}>{errors.subject}</ErrorText>
												</Label>
											</FormRow>

											<FormRow offset="1">
												<Label>
													Mensagem *
							<Textarea onChange={handleChange} onBlur={handleBlur} value={values.message} error={touched.message && errors.message}
														type="text" name="message" placeholder="Mensagem" maxLength='250' />
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
				</LoadingContent>
			</div>
		)
	}
}

export default withLanguage(Contact)