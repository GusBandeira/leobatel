import React from 'react'
import { Col } from 'reactstrap'
import styled from 'styled-components'
import { BASE_URL } from '../../utils/constants'

const LineRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 15px 0;
    padding: 30px 0;
    
    // box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.19);
    // -webkit-box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.19);
    // -moz-box-shadow: 0 4px 2px -2px rgba(0, 0, 0, 0.19);
    `
const Title = styled.span`
    display: flex;
    flex-wrap: wrap;
    font-weight: 700;
    color: #4d4d4d;
    margin: 15px 0;
`
const ProjectImage = styled.img`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -moz-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    width: 100%;
    height: 250px;
`
const DescriptionSpan = styled.span`
    display: block;
    margin-bottom: 10px;
`

export const Project = props => (
    <LineRow data-aos={(props.index % 2 === 1) ? 'fade-right' : 'fade-left'}>
        {(props.index % 2 === 0) &&
            <Col lg="5">
                <ProjectImage src={`${BASE_URL}${props.project.photo.replace('\\', '/')}`} alt={props.project.alt} />
            </Col>
        }
        <Col lg="7">
            <Title>
                {props.project.title}
            </Title>
            <DescriptionSpan>
                {props.project.description}
            </DescriptionSpan>
        </Col>
        {(props.index % 2 === 1) &&
            <Col lg="5">
                <ProjectImage src={`${BASE_URL}${props.project.photo.replace('\\', '/')}`} alt={props.project.alt} />
            </Col>
        }
    </LineRow>
)