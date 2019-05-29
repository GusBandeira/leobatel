import React, { Component } from 'react'

import { NewsExpanded } from '../Models/NewsModel'
import NewsComponent from '../components/NewsComponent'
import NewsService from '../../services/news'


const INITIAL_STATE = {
    news: []
}

export class News extends Component {

    state = {
        ...INITIAL_STATE
    }

    componentDidMount() {
        this.getNewsList()
    }

    getNewsList = async () => {
        const { match: { params: { id } } } = this.props

        try {
            this.setState({ news: [], loadingNews: true, error: false })
            const { data } = await NewsService.getSingleNews(id)
            this.setState({ news: data, loadingNews: false })
        }
        catch (e) {
            this.setState({ news: [], loadingNews: false, error: true })
        }
    }

    render() {

        const { state } = this

        return (
            <div>
                {state.news &&
                    <NewsComponent news={state.news} />
                }
            </div>
        )
    }
}

export default News
