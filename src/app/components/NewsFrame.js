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

  span {
    margin: 0;
    display: block;
    opacity: .6;
  }
  span:first-child {
    margin-top: 10px;
    margin-bottom: 20px;
    opacity: 1;
  }
  a {
    opacity: 0.9;

    :hover{
      text-decoration: none;
      opacity: 1;
    }
  }
`

const ImagePhoto = styled.img`
  max-height: 200px;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

const ImageName = styled.span`
  font-weight: 700;
  font-size: 18px;
`

const ImageDescription = styled.span`
  line-height: 16px;
  text-overflow: elipsis;
  overflow: hidden;
  position: relative;   
  margin-right: 0;
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

const ImageContent = ({ photo: { photo, name, subtitle, link }}) => (
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
      <ImageDescription>{subtitle}&nbsp;<Link to={link || '/'}> Leia mais... </Link></ImageDescription>
      
    </ImageLabel>
  </React.Fragment>
)