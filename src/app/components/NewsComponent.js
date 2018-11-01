import React, { Component } from 'react'
import styled from 'styled-components'

import { Quotes } from './Quotes'

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
const ImageContainer = ({ image }) => (
  <ImageWrapper>
    <NewsImage src={image.photo} alt={image.name} title={image.name}/>
    <ImageSubtitle>{image.subtitle}</ImageSubtitle>
  </ImageWrapper>
)

export class NewsComponent extends Component {

  renderNewsItem(item){
    switch(item.type){
      case 'p': 
        return <p>{item.content}</p>
      case 'q':
        return <Quotes sign={item.sign}>{item.content}</Quotes>
      case 'i':
        return <ImageContainer image={item}/>
      default: 
        return ''
    }
  }

  render() {
    const { props: { news } } = this
    return (
      <div className='page'>
        {news.map((item, index) => this.renderNewsItem(item))}
      </div>
    )
  }
  
}

export default NewsComponent