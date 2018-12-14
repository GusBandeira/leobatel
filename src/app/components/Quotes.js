import React from 'react'
import styled from 'styled-components'
import { Row, Col } from 'reactstrap'

const QuoteStyle = styled.div`
  padding: 3px;
  background-color: green;
  color: red;
`
const QuoteContainer = styled.div`
  display: flex;
  padding: 10px;
  margin: 40px 0;
`
const QuoteText = styled.span`
  word-break: break-word;
  padding: 15px;
  padding-left: 30px;
  text-align: left;
`
const QuoteSymbol = styled.span`
  font-size: 70px;
  font-weight: 700;
  opacity: .4;
  float: left;
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
  <Row>
    <Col lg={{ offset: 2, size: 8 }} sm={12}>
      <QuoteContainer>
        <QuoteStyle />
        <QuoteText>
          <QuoteSymbol>""</QuoteSymbol>
          {props.children}
          <QuoteSign>
            {props.sign}
          </QuoteSign>
        </QuoteText>
      </QuoteContainer>
    </Col>
  </Row>
)