import React from 'react'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '../Modal/Modal';
import { ModalContent } from '../Modal/ModalContent';
import { Thumb, ThumbInner, ThumbImg, ThumbClose, Remove, ThumbsContainer, InfoMessage, DropzoneContainer, ImageTitle } from './DropzoneComponents'
import ImageForm from '../InsertForms/ImageForm'
import ModalImageContent from '../Modal/ModalImageContent';
import { Button } from '../Page/Form'
import { BASE_URL } from '../../utils/constants'



class DropzonePreview extends React.Component {
	constructor() {
		super()
		this.state = {
			files: [],
			imageDetails: [],
			editting: false,
			stashFile: null
		};
	}

	componentDidMount() {
		const { props } = this
		if(props.inputImage){
			this.inputImage(props.inputImage)
		}

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

	inputImage = (inputImage) => {
		this.setState({ files: [{ preview: `${BASE_URL}${inputImage.replace('\\', '/')}` }] })
	}

	onDropAccepted(files) {
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
			this.setState({ detailIndex: state.files.length }, () => this.toggleModalDetails())
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

	stashImage = () => {
		const { state } = this
		this.setState({ stashImage: state.files, files: [] })
	}
	unstashImage = () => {
		const { state } = this
		this.setState({ files: state.stashImage, stashImage: null })
	}

	renderProfileThumbs() {
		const { state, props } = this;
	
		// Normal thumbs
		return state.files.map((file, index) => (
			<Thumb key={index} onMouseEnter={() => this.imageMouseEvent(false)} onMouseLeave={() => this.imageMouseEvent(false)} multi={props.multi} noBorder>
				<ThumbInner>
					<ThumbImg src={file.preview} alt="imagem de perfil" onMouseOver={() => this.imageMouseEvent(true)} profile/>
				</ThumbInner>
				<Remove onClick={() => this.stashImage()}>
					<FontAwesomeIcon icon={['fas', 'pen']} className="green"/>
					<span>Alterar</span>
				</Remove>
				
			</Thumb>
		));
	}

	renderNormalThumbs() {
		const { state, props } = this;
	
		// Normal thumbs
		return state.files.map((file, index) => (
			<Thumb key={index} onMouseEnter={() => this.imageMouseEvent(false)} onMouseLeave={() => this.imageMouseEvent(false)} multi={props.multi}>
				<ThumbInner>
					<ThumbImg src={file.preview} alt="imagem de perfil" onMouseOver={() => this.imageMouseEvent(true)} />
					{state.close && !props.multi &&
						<ThumbClose onClick={() => this.removeFile(index)} />
					}
				</ThumbInner>
				{state.imageDetails[index] && state.imageDetails[index].title &&
					<React.Fragment>
						<ImageTitle>
							{state.imageDetails[index].title} 
						</ImageTitle>
						<Remove onClick={() => this.editImage(index + 1)}>
							<FontAwesomeIcon icon={['fas', 'pen']} className="green"/>
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
	}

	render() {
		const { state, props: { accept, maxSize, multi, error, profile } } = this;

		return (
			<section>
				{this.renderModalError()}
				{this.renderModalDetails()}
				{state.files.length === 0 || multi ?
					<React.Fragment>

						{!profile &&
							<Dropzone onDropAccepted={this.onDropAccepted.bind(this)} onDropRejected={this.onDropRejected.bind(this)} 
									accept={accept} maxSize={maxSize}>
								{({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles }) => {
									return (
										<div isDragActive={isDragActive}
												isDragReject={isDragReject}
												{...getRootProps()}>
											<input {...getInputProps()} />
												<Button type="button">
													Inserir Anexo
												</Button>
										</div>
									)
								}}
							</Dropzone>
						}
						<Dropzone onDropAccepted={this.onDropAccepted.bind(this)} onDropRejected={this.onDropRejected.bind(this)} 
								accept={accept} maxSize={maxSize} disableClick={profile ? false : true} profile={profile}>
							{({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles }) => {
								return (
									<DropzoneContainer
										style={{ borderColor: error ? '#ff0000' : '#666', 
												 height: state.files.length > 0 ? '100%' : '200px',
												 margin: 'auto',
												 marginBottom: state.files.length > 0 ? '20px' : '0',
												 borderRadius: profile ? '100px' : 0,
												 width: profile ? '200px' : 'auto', 
												}}
										isDragActive={isDragActive}
										isDragReject={isDragReject}
										{...getRootProps()}
									>
										<input {...getInputProps()} />
										<InfoMessage>
											{multi && state.files.length > 0 ?
												<ThumbsContainer >
													{profile ? 
														this.renderProfileThumbs() 
														:
														this.renderNormalThumbs()
													}
												</ThumbsContainer>
												:
												<React.Fragment>
													Arraste sua imagem {profile && ' ou clique aqui'}
													<span>
														Tamanho máximo 1MB.
													</span>
												</React.Fragment>
											}
										</InfoMessage>
									</DropzoneContainer>
								)
							}}
						</Dropzone>
					</React.Fragment>
					:
					<ThumbsContainer >
						{profile ? 
							this.renderProfileThumbs() 
							:
							this.renderNormalThumbs()
						}	
					</ThumbsContainer>
				}
				{state.stashImage &&
					<Remove onClick={() => this.unstashImage()}>
						<FontAwesomeIcon icon={['fas', 'undo']} className="green"/>
						<span>Retornar Imagem</span>
					</Remove>
				}
			</section>
		);
	}
}

export default DropzonePreview