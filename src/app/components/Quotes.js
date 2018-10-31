import React from 'react'
import styled from 'styled-components'

const QuoteStyle = styled.div`
  padding: 3px;
  background-color: red;
  color: red;
`
const QuoteContainer = styled.div`
  display: flex;
  padding: 10px;
`
const QuoteText = styled.span`
  word-break: break-word;
  padding: 0 15px;
  padding-left: 30px;
  text-align: left;
`
const QuoteSymbol = styled.span`
  font-size: 70px;
  opacity: .4;
  float: left;
  font-family: Helvetica;
  padding-right: 20px;
  height: 40px;
`

export const Quotes = props => (
  <QuoteContainer className="col-sm-12 col-md-6 col-lg-4" position={props.position}>
    <QuoteStyle />
    <QuoteText>
      <QuoteSymbol>""</QuoteSymbol>
      {props.children}
    </QuoteText>
  </QuoteContainer>
)