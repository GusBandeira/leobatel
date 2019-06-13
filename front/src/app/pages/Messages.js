import React, { Component } from 'react'
import AOS from 'aos'

//Import Components
import { CoverImage } from '../components/Page/ImageFrame'
import LoadingContent from '../components/Loaders/LoadingContent'
import Accordion from '../components/Accordion/Accordion';

// Import Service
import MessageService from '../services/message';

// Import images
import group from '../../images/Group.png'

class Members extends Component {

    state = {
        messages: [],
        isLoading: false
    }

    componentDidMount() {
        AOS.init({ once: true });
        this.getMessageList();
    }

    getMessageList = async () => {
        try {
            this.setLoading(true)
            const result = await MessageService.getMessageList()
            
            if(result.status === 200){
                this.setState({ messages: result.data })
                this.setLoading(false)
            }
        }
        catch (e) {
            console.log('falha ao carregar lista de mensagens')
        }
    }

    setLoading(bool) {
        this.setState({ isLoading: bool })
    }

    render() {

        const { state } = this

        return (
            <div className="page page-portfolio page-static">
                <CoverImage>
                    <img src={group} alt={'Imagem do grupo'} />
                </CoverImage>
                <LoadingContent isLoading={state.isLoading}>
                    <Accordion list={state.messages} />
                </LoadingContent>
            </div>
        )
    }
}

export default Members