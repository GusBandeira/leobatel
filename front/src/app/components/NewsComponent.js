import React, { Component } from 'react'
import styled from 'styled-components'

import { Title, SubTitle, ImageWrapper, ImageSubtitle } from '../components/Page.js'
import { Quotes } from './Quotes'
import { CoverImage } from './ImageFrame'

const NewsImage = styled.img`
  margin: auto;
  max-height: 500px;
  text-align: center;
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