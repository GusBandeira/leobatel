import styled from 'styled-components'

export const AccordionContainer = styled.div`
    transition: all .4s ease-in-out;
    border: 1px solid lightgrey;
    border-radius: 5px;
    background-color: ${props => props.selected ? 'green' : 'white'};
    color: ${props => props.selected ? 'white' : 'black'};
    padding: 5px 15px;

    :hover{
        background-color: 'dark-green';
        cursor: pointer;
    }
`

export const AccordionInfo = styled.div`
    transition: all .3s ease-in-out;
    height: ${props => props.selected ? 'auto' : 0};
    opacity: ${props => props.selected ? '1' : '0'};
    padding: 25px;
    margin: 0 15px 15px;
    background-color: lightgrey;

    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`

export const AccordionSubTitle = styled.div`
    font-size: 12px;
`