import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col } from 'reactstrap'
import styled from 'styled-components'

const IconDetail = styled.span`
    text-align: center;
    width: 100%;
    display: block;

    svg {
        color: ${props => props.color}
    }

    @media screen and (max-width: 768px){
      margin-bottom: 25px;
    }
    `
const ContentRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    text-align: left;
    
    div {
      margin: auto;
    }
    @media screen and (max-width: 576px){
      text-align: center;
    }
`

export class ModalContent extends Component {
  render() {

    const { props: { children, icon, color } } = this;

    return (
      <ContentRow>
        <Col sm="12" md="4">
            <IconDetail color={color}>
                <FontAwesomeIcon icon={icon} size='3x'/>
            </IconDetail>
        </Col>
        <Col sm="12" md="8">
            {children}
        </Col>
      </ContentRow>
    )
  }
}

export default ModalContent
