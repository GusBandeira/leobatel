import React, { Component } from 'react'
import { AccordionContainer, AccordionInfo, AccordionSubTitle } from './AccordionComponents'


export class Accordion extends Component {

    state = {
        open: null
    }

    setOpen = (index) => {
        const { state } = this
        this.setState({ open: state.open === index ? null : index}) 
    }

    render() {

        const { props, state } = this

        return (
            <div>
                {props.list.map((item, index) => (
                    <React.Fragment>
                        <AccordionContainer onClick={() => this.setOpen(index)} selected={state.open === index}>
                            <div>
                                {item.subject}
                            </div>
                            <div>
                                <AccordionSubTitle>
                                    <strong>{item.name}</strong> - {item.email}
                                </AccordionSubTitle>
                            </div>
                        </AccordionContainer>
                        {state.open === index &&
                            <AccordionInfo selected={state.open === index}>
                                {item.message}
                            </AccordionInfo>
                        }
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default Accordion
