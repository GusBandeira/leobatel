import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'

import { Link } from 'react-router-dom'


export const CoverImage = styled.div`
  height: 400px;
  margin -10px 0 30px;;

  img {
    object-fit: cover;
    object-position: ${props => props.cover || '20% 20%'};
    height: 400px;
    width: 100vw;
    position: absolute;
    left: 0;
  }
`
const ImageLabel = styled.div`
  width: 100%;
  min-height: 50px;
  background-color: ${props => props.color || 'rgb(249, 249, 249)' };
  padding: 10px;
  cursor: ${props => props.link ? 'pointer' : 'unset'}
  margin: auto;
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
  margin: 20px auto;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  @media only screen and (min-width: 1200px){
    width: 80%;
  }
`

export const ImageLink = ({ photo, photo: { link }}) => (
    <Col sm={12} md={6} lg={4} data-aos="fade-down">
      <CardCol>
        <Link to={link || '/'}>
          <ImageContent photo={photo} />
        </Link>
      </CardCol>
    </Col>
)

export const Image = ({ photo }) => (
  <Col sm={12} md={6} lg={4} data-aos="fade-down">
    <CardCol>
      <ImageContent photo={photo} />
    </CardCol>
  </Col>
)

const ImageContent = ({ photo: { photo, name, description, link }}) => (
  <React.Fragment>
    <ImagePhoto
      src={`data:image/png;base64, ${photo}`}
      width="100%"
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