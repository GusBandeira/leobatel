import React, { Component } from 'react'

//Import Components
import { NewsLink } from './NewsFrame'

// Import News
import { NewsListModel } from '../Models/NewsListModel'

export class NewsList extends Component {
  render() {
    return (
      <div className="page page-portfolio page-static">
          <div className="row">
            {NewsListModel.map((photo, index) => <NewsLink photo={photo} key={index}/>)}
          </div>
      </div>
    )
  }
}

export default NewsList
