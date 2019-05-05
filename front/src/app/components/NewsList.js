import React, { Component } from 'react'

//Import Components
import { NewsLink } from './NewsFrame'

// Import Service
import NewsService from '../../services/news'
import LoadingContent from './LoadingContent';


export class NewsList extends Component {

  state = {
    newsList: [],
    modalErrorIsOpen: false
  }

  componentDidMount(){
    this.getNewsList()
  }

  getNewsList = async() => {
    try {
      this.setState({ newsList: [], loadingNews: true, error: false })
      const { data } = await NewsService.getNewsList()
      this.setState({ newsList: data, loadingNews: false })
    }
    catch(e){
      this.setState({ newsList: [], loadingNews: false, error: true })
    }
  }


  render() {

    const { state } = this;

    return (
      <LoadingContent isLoading={state.loadingNews} error={state.error}>
        <div className="page page-portfolio page-static">
            <div className="row">
              {state.newsList && state.newsList.map((photo, index) => <NewsLink photo={photo} key={index}/>)}
            </div>
        </div>
      </LoadingContent>
    )
  }
}

export default NewsList
