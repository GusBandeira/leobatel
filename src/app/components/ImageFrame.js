import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'

import { Link } from 'react-router-dom'

const ImageLabel = styled.div`
  width: 80%;
  min-height: 50px;
  background-color: ${props => props.color || 'rgb(239, 239, 239)' };
  padding: 10px;
  cursor: ${props => props.link ? 'pointer' : 'unset'}
  margin: auto;
  margin-top: 3px;
`
const ImagePhoto = styled.img`
  opacity: 0.8;
  cursor: ${props => props.link ? 'pointer' : 'unset'}

  :hover {
    opacity: 1;
  }
`
const ImageName = styled.span`
  font-weight: 700;
  margin: auto;
  `
const ImageDescription = styled.span`
  margin: auto;
  font-size: 14px;
  `
    
  const CardCol = styled.div`
    text-align: center;
    margin: 10px 0;
  `

export const ImageLink = ({ photo, photo: { link }}) => (
  <Col sm={12} md={6} lg={4} >
    <CardCol>
      <Link to={link || '/'}>
        <ImageContent photo={photo} />
      </Link>
    </CardCol>
  </Col>
)

export const Image = ({ photo }) => (
  <Col sm={12} md={6} lg={4} >
    <CardCol>
      <ImageContent photo={photo} />
    </CardCol>
  </Col>
)

const ImageContent = ({ photo: { photo, name, description, link }}) => (
  <React.Fragment>
    <ImagePhoto
      src={photo}
      width="80%"
      height="300"
      alt={name}
      title={name}
      link={link}
    />
    <ImageLabel link={link}>
      <Row style={{ margin: 0, marginBottom: '10px' }}>
        <ImageName>{name}</ImageName>
      </Row>
      <Row style={{ margin: 0, marginBottom: '10px' }}>
        <ImageDescription>{description}</ImageDescription>
      </Row>
    </ImageLabel>
  </React.Fragment>
)