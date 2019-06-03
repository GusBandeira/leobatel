import React from 'react'
import { MyContext } from '../../contexts/language/languageContext'
import Cookies from 'universal-cookie'


const withLanguage = (Component) => {
    return class extends React.Component {
        render() {
            const cookie = new Cookies()
            const language = cookie.get("language")
            return (
                <MyContext.Consumer>
                    {context => (
                        <Component {...this.props} withLanguage={context} language={context.language.toUpperCase() || language || 'EN'} />  
                    )}
                </MyContext.Consumer>
            )
        }
    }
}

export default withLanguage