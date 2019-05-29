import React from 'react'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '../Modal/Modal';
import { ModalContent } from '../Modal/ModalContent';
import { Thumb, ThumbInner, ThumbImg, ThumbClose, Remove, ThumbsContainer, InfoMessage, DropzoneContainer, ImageTitle } from './DropzoneComponents'
import ImageForm from '../InsertForms/ImageForm'
import ModalImageContent from '../Modal/ModalImageContent';



class DropzonePreview extends React.Component {
	constructor() {
		super()
		this.state = {
			files: [],
			imageDetails: [],
			editting: false
		};
	}

	componentDidUpdate(prevProps){
		const { props, state } = this

		if(props.removeFile !== prevProps.removeFile && props.removeFile){
			if(props.multi){
				const files = [...state.files]
				this.setState({ files: [], imageDetails: [] })
			}
			else {
				this.removeFile(0)
			}
		}
	}

	componentWillUnmount() {
		// Make sure to revoke the data uris to avoid memory leaks
		const { state } = this
		state.files.forEach(file => URL.revokeObjectURL(file.preview))
	}

	onDrop(files) {
		const { state } = this
		this.setState({
			files: state.files.concat(files.map(file => Object.assign(file, {
				preview: URL.createObjectURL(file)
			})))
		}, this.setImage);
	}

	onDropRejected = () => {
		this.toggleModalError();
	}

	removeFile = (index) => {
		const { state } = this
		let files = state.files
		files.splice(index, 1)
		let imageDetails = state.imageDetails
		imageDetails.splice(index, 1)
		this.setState({ files: files, imageDetails: imageDetails }, this.setImage(true))
	}

	cancelUpload = () =>{
		const { state } = this
		this.removeFile(state.files.length-1)
		this.toggleModalDetails()
	}

	imageMouseEvent = (value) => {
		this.setState({ close: value })
	}

	setImage = (remove) => {
		const { state, props: { setImage, imageDetails } } = this

		if(imageDetails && !remove){
			this.setState({ detailIndex: state.files.length })
			this.toggleModalDetails()
		}

		if(setImage) {
			setImage(state.files, state.imageDetails)
		}
	}
	getImageDetailsData = (values, index) => {

		const { state } = this
		let { imageDetails } = state

		imageDetails[index] = {
			title: values.title,
			description: values.description || ''
		}

		this.setState({ imageDetails: imageDetails, editting: false })

		this.toggleModalDetails()	
	}
	
	toggleModalError = () => {
        const { state } = this
        this.setState({ modalError: !state.modalError })
    }
	
	renderModalError(){
		
		const { state } = this
		
		return (
			<React.Fragment>
				{state.modalError && 
					<Modal buttonConfirm="Entendi" isOpen={state.modalError} toggle={this.toggleModalError} cancel={this.toggleModalError} confirm={this.toggleModalError} noHeader>
						<ModalContent icon={['fas', 'exclamation-circle']} color={'red'}>
							São aceitos apenas imagens nos formatos .png, .jpg e .jpeg, com tamanho máximo de 1MB.
						</ModalContent>
					</Modal>
				}
			</React.Fragment>
		)
	}


	toggleModalDetails = () => {
		const { state } = this
		this.setState({ modalDetails: !state.modalDetails })
	}

	renderModalDetails(){


		const { state } = this
		const file = state.files[state.detailIndex-1]

		if(file) {
			const thumb = (
				<Thumb onMouseEnter={() => this.imageMouseEvent(false)} onMouseLeave={() => this.imageMouseEvent(false)} noBorder>
					<ThumbInner>
						<ThumbImg src={file.preview} alt="imagem de perfil" onMouseOver={() => this.imageMouseEvent(true)} />
					</ThumbInner>
				</Thumb>
			);
	
			return (
				<React.Fragment>
					{state.modalDetails && 
						<Modal isOpen={state.modalDetails} 
							toggle={state.editting ? this.toggleModalDetails : this.cancelUpload} 
							cancel={state.editting ? this.toggleModalDetails : this.cancelUpload} 
							noHeader
						>
							<ModalImageContent thumb={thumb}>
								<ImageForm confirm={values => this.getImageDetailsData(values, state.detailIndex-1)} values={state.imageDetails[state.detailIndex-1]}/>
							</ModalImageContent>
						</Modal>
					}
				</React.Fragment>
			)
		}
		return
	}

	editImage = (index) => {
		this.setState({ detailIndex: index, editting: true })
		this.toggleModalDetails()
	}

	render() {
		const { state, props: { accept, maxSize, multi, error } } = this;

		const thumbs = state.files.map((file, index) => (
			<Thumb key={index} onMouseEnter={() => this.imageMouseEvent(false)} onMouseLeave={() => this.imageMouseEvent(false)}>
				<ThumbInner>
					<ThumbImg src={file.preview} alt="imagem de perfil" onMouseOver={() => this.imageMouseEvent(true)} />
					{state.close && !multi &&
						<ThumbClose onClick={() => this.removeFile(index)} />
					}
				</ThumbInner>
				{state.imageDetails[index] && state.imageDetails[index].title &&
					<React.Fragment>
						<ImageTitle>
							<span> {state.imageDetails[index].title} </span>
						</ImageTitle>
						<Remove onClick={() => this.editImage(index + 1)}>
							<FontAwesomeIcon icon={['fas', 'pen']}  className="green"/>
							<span>Editar</span>
						</Remove>
					</React.Fragment>
				}
				<Remove onClick={() => this.removeFile(index)}>
					<FontAwesomeIcon icon={['fas', 'times']} size='lg' className="red"/>
					<span>Remover</span>
				</Remove>
			</Thumb>
		));

		return (
			<section>
				{this.renderModalError()}
				{this.renderModalDetails()}
				{multi && state.files.length > 0 &&
					<ThumbsContainer >
						{thumbs}
					</ThumbsContainer>
				}
				{state.files.length === 0 || multi ?
					<Dropzone onDrop={this.onDrop.bind(this)} onDropRejected={this.onDropRejected.bind(this)} accept={accept} maxSize={maxSize} >
						{({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles }) => {
							return (
								<DropzoneContainer
									style={{ borderColor: error ? '#ff0000' : '#666' }}
									isDragActive={isDragActive}
									isDragReject={isDragReject}
									{...getRootProps()}
								>
									<input {...getInputProps()} />
									<InfoMessage>
										Clique ou arraste sua imagem
                              			<span>
											Tamanho máximo 1MB.
                              			</span>
									</InfoMessage>
								</DropzoneContainer>
							)
						}}
					</Dropzone>
					:
					<ThumbsContainer >
						{thumbs}
					</ThumbsContainer>
				}
			</section>
		);
	}
}

export default DropzonePreview