import React, { Component } from 'react'
import styled from 'styled-components'

import { Quotes } from './Quotes'
import { CoverImage } from './ImageFrame'

const NewsImage = styled.img`
  margin: auto;
  max-height: 500px;
  text-align: center;
`
const ImageSubtitle = styled.span`
  width: 100%;
  margin: auto;
  font-weight: 700;
  text-align: center;
  display: block;
  padding: 20px 0;
`
const ImageWrapper = styled.div`
  text-align: center;
`
const Title = styled.h2`
  text-align: center;
`
const SubTitle = styled.h5`
  text-align: center;
  opacity: 0.8;
  margin-bottom: 30px;
`

const ImageContainer = ({ image, link }) => (
  <ImageWrapper>
    <NewsImage src={image.photo} alt={image.name} title={image.name}/>
    <ImageSubtitle>{image.subtitle}</ImageSubtitle>
  </ImageWrapper>
)


export class NewsComponent extends Component {

  renderNewsItem(item, index){
    switch(item.type){
      case 'p': 
        return <p key={index}>{item.content}</p>
      case 'q':
        return <Quotes sign={item.sign} key={index}>{item.content}</Quotes>
      case 'i':
        return <ImageContainer image={item} key={index}/>
      case 'c':
        return (
          <CoverImage key={index} cover={item.cover}>
            <img src={item.content} alt={item.name}/>
          </CoverImage>
        )
      case 't':
        return <Title key={index}>{item.content}</Title>
      case 's':
        return <SubTitle key={index}>{item.content}</SubTitle>
      default: 
        return ''
    }
  }

  render() {
    const { props: { news } } = this
    return (
      <div className='page'>
        
        {news.map((item, index) => this.renderNewsItem(item, index))}
      </div>
    )
  }
  
}

export default NewsComponent