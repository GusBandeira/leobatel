import React from 'react'
import styled from 'styled-components';
import withCounter from '../components/withCounter'
import { Row, Col } from 'reactstrap'

export const FormRow = (props) => (
  <Row>
    <Col lg={{ offset: props.offset, size: props.size }} sm="12">
      {props.children}
    </Col>
  </Row>
)


export const SelectSpan = styled.span`

  select {
    border-radius: 5px;
    padding: 3px 5px;
    height: 30px;
    -webkit-appearance: custom;
    width: 100%;
    font-size: 14px;
    cursor: pointer;
    outline: none;
  }

  ::after {
    content: "";
    position: absolute;
    width: 30px;
    height: 100%;
    border-radius: 0 5px 5px 0;
    background-color: darkcyan;
    right: 15px;
    pointer-events: none;
  }

  ::before{
    content: "";
    position: absolute;
    width: 0; 
    height: 0; 
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-top: 7px solid white;
    right: 23px;
    TOP: 12px;
    z-index: 1;
    pointer-events: none;
  }
`

export const Select = props => (
  <SelectSpan>
    <select name={props.name} onChange={props.onChange}>
      {props.children}
    </select>
  </SelectSpan>
)

export const Input = styled.input`
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 0 10px;
  border-radius: 5px;
  height: 30px;
`;
  
export const Textarea = styled.textarea`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  height: 100px;
  min-height: 100px;
  max-height: 200px;
  resize: vertical;
  outline: none;
`
export const TextareaNews = styled.textarea`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
  height: 500px;
  min-height: 400px;
  max-height: 8000px;
  resize: vertical;
  outline: none;
`
export const TextareaCounter = withCounter(props => <Textarea {...props} />)

export const Button = styled.button`
  height: 35px;
  background-color: hsl(140, 100%, 30%);
  color: #fff;
  border-radius: 3px;
  border: none;
  width: 100px;
  float: ${props => props.right ? 'right' : "none"};
  cursor: pointer;

  :hover{
    background-color: hsl(120, 60%, 50%);
  }

  @media screen and (max-width: 768px){
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-weight: 600;
  color: #4d4d4d;
  font-size: 2.2em;
`;

export const Title2 = styled.h2`
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`;

export const ErrorText = styled.p`
    font-size: 12px;
    font-size: .85714rem;
    margin: 0;
    color: ${props => props.color || "#ff4031"};
    height: ${props => props.error ? "15px" : 0};
    opacity: ${props => props.error ? 1 : 0};
    visibility: ${props => props.error ? "visible" : "hidden"};
    -webkit-transform: ${props => props.error ? "translateX(0)" : "translateX(2%)"};
    -ms-transform: ${props => props.error ? "translateX(0)" : "translateX(2%)"};
    transform: ${props => props.error ? "translateX(0)" : "translateX(2%)"};
    overflow: hidden;
    -webkit-transition: opacity .2s ease .2s,visibility .2s ease .2s,height .2s ease-in,-webkit-transform .2s ease-in .2s;
    transition: opacity .2s ease .2s,visibility .2s ease .2s,height .2s ease-in,-webkit-transform .2s ease-in .2s;
    -o-transition: opacity .2s ease .2s,visibility .2s ease .2s,transform .2s ease-in .2s,height .2s ease-in;
    transition: opacity .2s ease .2s,visibility .2s ease .2s,transform .2s ease-in .2s,height .2s ease-in;
    transition: opacity .2s ease .2s,visibility .2s ease .2s,transform .2s ease-in .2s,height .2s ease-in,-webkit-transform .2s ease-in .2s;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-size: 0.8em;
  position: relative;
`;

export const LabelDiv = styled.div`
  display: flex;
  flex-direction: column;
  color: #777;
  font-size: 0.8em;
  position: relative;
`;