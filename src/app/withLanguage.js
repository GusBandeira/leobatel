import React from 'react'
import { MyContext } from '../context'


const withLanguage = (Component) => {
    return class extends React.Component {
        render() {
            return (
                <MyContext.Consumer>
                    {context => (
                        <Component {...this.props} withLanguage={context} language={context.language.toUpperCase() || 'DE'} />  
                    )}
                </MyContext.Consumer>
            )
        }
    }
}

export default withLanguage