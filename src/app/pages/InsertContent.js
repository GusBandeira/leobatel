import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'

// Import Images
import friends from '../../images/friends.jpg'

// Import Components
import { FormRow, Label, Select } from "../components/Form";
import { Title } from '../components/Page.js'
import { CoverImage } from '../components/ImageFrame'
import MemberForm from '../components/InsertForms/MemberForm'
import ProjectForm from '../components/InsertForms/ProjectForm'
import NewsForm from '../components/InsertForms/NewsForm'

export class InsertContent extends Component {

    state = {
        contentType: "Selecione",
    }

    onSubmit = values => {
        console.log(values)
    }

    formatImage = (sp) => {
        let params = sp.substring(6, sp.length)
        params = params.split(',')
        const image = {
            type: "i",
            photo: Number(params[0].trim()),
            name: params[1].trim(),
            subtitle: params[2].trim()
        }
        return image
    }

    formatTextType = (sp, type) => {
        const paragraph = {
            type: type,
            content: sp.trim()
        }
        return paragraph
    }

    makeJSON(values){
        const split = values.body.split("\n")
        let data = []
        split.forEach(sp => {
            if(sp.trim().substring(0,6).includes('/image')){
                data.push(this.formatImage(sp))
            }
            else if(sp.trim()) {
                data.push(this.formatTextType(sp, 'p'))
            }
        })

        data.unshift(this.formatTextType(values.subtitle, 's'))
        data.unshift(this.formatTextType(values.title, 't'))

        console.log(data)
    }

    render() {

        const { state } = this

        return (
            <div className='page'>
                <CoverImage>
                    <img src={friends} alt='About' />
                </CoverImage>
                <Title>
                    Inserir conteúdo
                </Title>

                <Container>
                    <Row>
                        <Col lg="12" className="no-padding margin-auto">
                            <Label>
                                <FormRow offset="1">
                                    <Col lg={3}>
                                        <Select name="type" onChange={e => this.setState({ contentType: e.target.value })} 
                                                readOnly={false}>
                                            <option default hidden>Selecione</option>
                                            <option value="project">Projeto</option>
                                            <option value="news">Notícia</option>
                                            <option value="member">Membro</option>
                                        </Select>
                                    </Col>
                                </FormRow>
                            </Label>
                            {state.contentType === "member" && (
                                <MemberForm />
                            )}
                            {state.contentType === "project" && (
                                <ProjectForm />
                            )}
                            {state.contentType === "news" && (
                                <NewsForm />
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default InsertContent
