import React from 'react'
import styled from 'styled-components'

const CharNumber = styled.span`
    text-align: right;
    padding: 5px 5px 0;
    font-style: italic;
`

const withCounter = (Component) => {
    return class extends React.Component {

        state = {
            wordCount: this.props.maxLength + ' caracteres'
        }

        countWords = (value) => {
            let wordCount = ''
            const { maxLength } = this.props
    
            wordCount = maxLength - value.length + ' caracteres'
    
            this.setState({
                wordCount: wordCount,
            })
    
        }

        render() {

            const { state } = this

            return (
                <React.Fragment>
                    <Component {...this.props} onChange={e => this.countWords(e.target.value)} />  
                    <CharNumber>{state.wordCount}</CharNumber>
                </React.Fragment>
            )
        }
    }
}

export default withCounter