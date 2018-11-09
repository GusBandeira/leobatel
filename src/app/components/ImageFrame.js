import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

const ImageLabel = styled.div`
  width: 100%;
  min-height: 50px;
  background-color: ${props => props.color || 'green'};
  color: white;
  padding: 10px;
  cursor: ${props => props.link ? 'pointer' : 'unset'}
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


export const ImageLink = ({ photo, photo: { link }}) => (
  <div className="col-sm-12 col-md-6 col-lg-4 content">
    <Link to={link || '/'}>
      <ImageContent photo={photo} />
    </Link>
  </div>
)

export const Image = ({ photo }) => (
  <div className="col-sm-12 col-md-6 col-lg-4 content">
    <ImageContent photo={photo} />
  </div>
)

const ImageContent = ({ photo: { photo, name, description, link }}) => (
  <React.Fragment>
    <ImagePhoto
      src={photo}
      width="100%"
      height="390"
      alt={name}
      title={name}
      link={link}
    />
    <ImageLabel link={link}>
      <div className='row' style={{ margin: 0 }}>
        <ImageName>{name}</ImageName>
      </div>
      <div className='row' style={{ margin: 0 }}>
        <ImageDescription>{description}</ImageDescription>
      </div>
    </ImageLabel>
  </React.Fragment>
)