import styled from 'styled-components';
import withCounter from '../components/withCounter'

// Forms, inputs, buttons

export const Form = styled.form`
  padding: 20px 0;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
`;

export const Input = styled.input`
  width: 300px;
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
  width: 300px;
  height: 100px;
  min-height: 100px;
  max-height: 200px;
  resize: vertical;
  outline: none;
`
export const TextareaCounter = withCounter(Textarea)

export const Button = styled.button`
  width: 300px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
`;

// Text

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
  margin: 8px 5px 0px 5px;
  color: ${props => props.color || '#4d4d4d'}
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: #777;
  font-size: 0.8em;
  margin: 0.5em 0;
  position: relative;
`;