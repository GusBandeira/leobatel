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
                                <FormRow>
                                    <Col sm={{ size: 4, offset: 4 }} >
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
