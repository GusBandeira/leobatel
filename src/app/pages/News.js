import React, { Component } from 'react'

import { NewsExpanded } from '../Models/NewsModel'
import NewsComponent from '../components/NewsComponent'


export class News extends Component {
  render() {

    const { match: { params: { id }} } = this.props

    return (
      <div>
        <NewsComponent news={NewsExpanded[id]} />
      </div>
    )
  }
}

export default News
