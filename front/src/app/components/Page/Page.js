import React from 'react'
import styled from 'styled-components'
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

export const AuthorName = styled.div`
  font-weight: 400;
`
export const PostDate = styled.div`
  opacity: 0.6;
  font-size: 12px;
`
export const CreditsContainer = styled.div`
  display: inline-flex;
  margin-bottom: 20px;
  width: 100%;
  justify-content: flex-end;
`
export const AuthorImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  margin-right: 5px;
`
export const AuthorContainer = styled.div`
  margin: auto 0;
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