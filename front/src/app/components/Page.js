import React from 'react'
import styled from 'styled-components'
import { Col, Row } from 'reactstrap'
import { BASE_URL } from '../../utils/constants'

export const ImageSubtitle = styled.span`
  width: 100%;
  margin: auto;
  font-weight: 700;
  text-align: center;
  display: block;
  padding: 20px 0;
`
export const ImageWrapper = styled.div`
  text-align: center;
`
export const Title = styled.h1`
  text-align: center;
  margin-bottom: 15px;
`
export const SubTitle = styled.h4`
  text-align: center;
  opacity: 0.6;
  margin-bottom: 50px;
`

const AuthorName = styled.div`
  font-weight: 400;
`
const PostDate = styled.div`
  opacity: 0.6;
  font-size: 12px;
`
const CreditsContainer = styled.div`
  display: inline-flex;
  margin-bottom: 20px;
`
const AuthorImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50px;
`
const AuthorContainer = styled.div`
  margin: auto;
`


export const Author = props => (
  <CreditsContainer>
    <AuthorImage src={`${BASE_URL}${props.author.url.replace('\\', '/')}`} alt={props.author.author} />
    <AuthorContainer>
      <AuthorName>{props.author.author}</AuthorName>
      <PostDate>{props.author.date}</PostDate>
    </AuthorContainer>
  </CreditsContainer>
)