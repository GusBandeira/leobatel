import React from 'react'
import Dropzone from 'react-dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from '../Modal/Modal';
import { ModalContent } from '../Modal/ModalContent';
import { Thumb, ThumbInner, ThumbImg, ThumbClose, Remove, ThumbsContainer, InfoMessage, DropzoneContainer } from './DropzoneComponents'



class DropzonePreview extends React.Component {
	constructor() {
		super()
		this.state = {
			files: []
		};
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
		this.toggleModal();
	}

	removeFile = (index) => {
		const { state } = this
		let files = state.files
		files.splice(index, 1)
		this.setState({ files: files }, this.setImage)
	}

	imageMouseEvent(value) {
		this.setState({ close: value })
	}

	setImage = () => {
		const { state, props: { setImage } } = this
		if(setImage) {
			setImage(state.files)
		}
	}
	
	toggleModal = () => {
        const { state } = this
        this.setState({ modalError: !state.modalError })
    }

	renderModal(){

		const { state } = this

		return (
			<React.Fragment>
				{state.modalError && 
					<Modal buttonConfirm="Entendi" isOpen={state.modalError} toggle={this.toggleModal} cancel={this.toggleModal} confirm={this.toggleModal} noHeader>
						<ModalContent icon={['fas', 'exclamation-circle']} color={'red'}>
							São aceitos apenas imagens nos formatos .png, .jpg e .jpeg, com tamanho máximo de 1MB.
						</ModalContent>
					</Modal>
				}
			</React.Fragment>
		)
	}

	render() {
		const { state, props: { accept, maxSize, multi, error } } = this;

		const thumbs = state.files.map((file, index) => (
			<Thumb key={file.name} onMouseEnter={() => this.imageMouseEvent(false)} onMouseLeave={() => this.imageMouseEvent(false)}>
				<ThumbInner>
					<ThumbImg src={file.preview} alt="imagem de perfil" onMouseOver={() => this.imageMouseEvent(true)} />
					{state.close && !multi &&
						<ThumbClose onClick={() => this.removeFile(index)} />
					}
				</ThumbInner>
				<Remove >
					<span> Imagem {index + 1} </span>
				</Remove>
				<Remove onClick={() => this.removeFile(index)}>
					<FontAwesomeIcon icon={['fas', 'times']} size='lg' />
					<span>Remover</span>
				</Remove>
			</Thumb>
		));

		return (
			<section>
				{this.renderModal()}
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