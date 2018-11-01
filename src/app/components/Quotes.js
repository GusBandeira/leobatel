import React from 'react'
import styled from 'styled-components'

const QuoteStyle = styled.div`
  padding: 3px;
  background-color: green;
  color: red;
`
const QuoteContainer = styled.div`
  display: flex;
  padding: 10px;
  margin: 40px 0;
  margin-left: 50%;
`
const QuoteText = styled.span`
  word-break: break-word;
  padding: 15px;
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
const QuoteSign = styled.div`
  padding-top: 20px;
  font-style: italic;
  text-align: right;
  opacity: .6;
`

export const Quotes = props => (
  <QuoteContainer className="col-md-offset-6 col-sm-12 col-md-6" position={props.position}>
    <QuoteStyle />
    <QuoteText>
      <QuoteSymbol>""</QuoteSymbol>
      {props.children}
      <QuoteSign>
        {props.sign}
      </QuoteSign>
    </QuoteText>
  </QuoteContainer>
)