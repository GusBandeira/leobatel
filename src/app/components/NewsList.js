import React, { Component } from 'react'

//Import Components
import { NewsLink } from './NewsFrame'

// Import Service
import NewsService from '../../services/news'


export class NewsList extends Component {

  state = {
    newsList: []
  }

  componentDidMount(){
    this.getNewsList()
  }

  getNewsList = async() => {
    try {
      const { data } = await NewsService.getNewsList()
      this.setState({ newsList: data })
    }
    catch(e){
      console.log('falha ao gerar lista de notícias')
    }
  }

  render() {

    const { state } = this;

    return (
      <div className="page page-portfolio page-static">
          <div className="row">
            {state.newsList && state.newsList.map((photo, index) => <NewsLink photo={photo} key={index}/>)}
          </div>
      </div>
    )
  }
}

export default NewsList
