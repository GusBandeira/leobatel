import React, { Component } from 'react'

//Import Components
import { ImageLink } from './ImageFrame'

// Import News
import { NewsListModel } from '../Models/NewsListModel'

export class NewsList extends Component {
  render() {
    const { state } = this;
    return (
      <div className="page page-portfolio page-static">
        <div className="container">
          <div className="row">
            {NewsListModel.map((photo, index) => <ImageLink photo={photo} key={index}/>)}
          </div>
        </div>
      </div>
    )
  }
}

export default NewsList
