import React from 'react'
import styled from 'styled-components'

const ImageLabel = styled.div`
  width: 100%;
  min-height: 50px;
  background-color: ${props => props.color || 'green'};
  color: white;
  padding: 10px;
`
const ImagePhoto = styled.img`
  opacity: 0.8;

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

export const Image = ({ photo: { photo, name, description }}) => (
  <div className="col-sm-12 col-md-6 col-lg-4">
    <ImagePhoto
      src={photo}
      width="100%"
      height="390"
      alt={name}
      title={name}
    />
    <ImageLabel>
      <div className='row' style={{ margin: 0 }}>
        <ImageName>{name}</ImageName>
      </div>
      <div className='row' style={{ margin: 0 }}>
        <ImageDescription>{description}</ImageDescription>
      </div>
    </ImageLabel>
  </div>
)
