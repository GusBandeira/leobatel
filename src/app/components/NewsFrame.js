import React from 'react'
import styled from 'styled-components'
import { Col } from 'reactstrap'

import { Link } from 'react-router-dom'

const ImageLabel = styled.div`
  width: 100%;
  min-height: 50px;
  max-height: 100px;
  padding: 10px 0;
  margin-top: 3px;
  font-size: 14px;

  span {
    margin: 0;
    display: block;
  }
  span:first-child {
    margin-top: 10px;
    margin-bottom: 20px;
  }
  a {
    text-align: right;
    width: 100%;
    display: block;
    margin-top: 5px;
    padding-right: 15px;

    :hover{
      text-decoration: none;
    }
  }
`

const ImagePhoto = styled.img`
  max-height: 200px;
  width: 100%;

  cursor: ${props => props.link ? 'pointer' : 'unset'}
`

const ImageName = styled.span`
  font-weight: 700;
  font-size: 16px;
`

const ImageDescription = styled.span`
  font-size: 14px;
  line-height: 14px;
  max-height: 43px;
  text-overflow: elipsis;
  overflow: hidden;
  position: relative; 
  text-align: justify;  
  margin-right: 0;
  padding-right: 1em;

  :before {
    content: '...';
    position: absolute;
    right: 1px;
    bottom: 1px;
  }

  :after {
    content: '';
    position: absolute;
    right: 1px;
    width: 1em;
    height: 1em;
    margin-top: 0.2em;
    background: white;
  }
`

export const NewsLink = ({ photo, photo: { link }}) => (
  <Col sm={12} md={6} lg={4} >
    <ImageContent photo={photo} />
  </Col>
)

export const NewsImage = ({ photo }) => (
  <Col sm={12} md={6} lg={4} >
    <ImageContent photo={photo} />
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
      <ImageName>{name}</ImageName>
      <ImageDescription>{description}</ImageDescription>
      <Link to={link || '/'}> Leia mais </Link>
    </ImageLabel>
  </React.Fragment>
)