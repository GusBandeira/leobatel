import React, { Component } from 'react'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'

const getColor = (props) => {
    if (props.isDragReject) {
        return '#c66';
    }
    if (props.isDragActive) {
        return '#6c6';
    }
    return '#666';
  };

const ThumbsContainer = styled.aside`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 16px;
  `;
  
  const Thumb = styled.div`
    display: inline-flex;
    border-radius: 2px;
    border: 1px solid #eaeaea;
    margin-bottom: 8px;
    margin-right: 8px;
    padding: 4px;
    box-sizing: border-box;
    margin: auto;
  `;
  
  const ThumbInner = styled.div`
    display: flex;
    overflow: hidden;
    min-width: 100px;
    max-width: 200px;
    min-height: 100px;
    max-height: 200px;
    // :hover{
  `
  
  const ThumbImg = styled.img`
    display: block;
    width: auto;
  `;

  const Container = styled.div`
    width: 100%;
    height: 200px;
    border-width: 2px;
    border-radius: 5px;
    border-color: ${props => getColor(props)};
    border-style: ${props => props.isDragReject || props.isDragActive ? 'solid' : 'dashed'};
    background-color: ${props => props.isDragReject || props.isDragActive ? '#eee' : ''};
    outline: none;
    margin-top: 5px;
    display: flex;
  `;

  const InfoMessage = styled.span`
    margin: auto;
    display: grid;
    text-align: center;
    font-size: 14px;

    span{
        font-size: 12px;
        margin-top: 10px;
    }
  `

  const ThumbClose = styled.span`
    position: absolute;
    width: 65px;
    height: 65px;
    top: 44%;
    left: 38%;
    background-color: lightgrey;
    border-radius: 50px;
    cursor: pointer;
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    :hover{
        color: red;
        background-color: darkgrey;
    }
    ::before{
        content: '\0d7';
        position: absolute;
        top: -4%;
        color: black;
        left: 0;
        right: 0;
        font-size: 65px;
        text-align: center;
        font-family: Arial,sans-serif;
    }
  `
  
  class DropzonePreview extends React.Component {
    constructor() {
      super()
      this.state = {
        files: []
      };
    }
  
    onDrop(files) {
      this.setState({
        files: files.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      });
    }
  
    componentWillUnmount() {
      // Make sure to revoke the data uris to avoid memory leaks
      const { state } = this
      state.files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  
    imageMouseEvent(value) {
        this.setState({ close: value })
    }

    removeFile = () => {
        this.setState({ files: [] })
    }

    render() {
      const { state, props: { accept, maxSize } } = this;
  
      const thumbs = state.files.map(file => (
        <Thumb key={file.name} onMouseEnter={() => this.imageMouseEvent(false)} onMouseLeave={() => this.imageMouseEvent(false)}>
            <ThumbInner>
                <ThumbImg src={file.preview} alt="imagem de perfil" onMouseOver={() => this.imageMouseEvent(true)} />
                {state.close &&
                    <ThumbClose onClick={this.removeFile}/>
                }
            </ThumbInner>
        </Thumb>
      ));
  
      return (
        <section>
          {state.files.length === 0 ? 
            <Dropzone onDrop={this.onDrop.bind(this)} accept={accept} maxSize={maxSize}>
                {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles }) => {
                    return (
                    <Container
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
                    </Container>
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