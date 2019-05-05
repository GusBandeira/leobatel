import React, { Component } from 'react'
import styled from 'styled-components'

const IconDetail = styled.span`
    text-align: center;
    width: 100%;
    display: block;

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
    form{
      width: 100%;
    }
`

export class ModalImageContent extends Component {
  render() {

    const { props: { children, thumb } } = this;

    return (
      <React.Fragment>
        <ContentRow>
              <IconDetail >
                {thumb}
              </IconDetail>
        </ContentRow>
        <ContentRow>
              {children}
        </ContentRow>
      </React.Fragment>
    )
  }
}

export default ModalImageContent
