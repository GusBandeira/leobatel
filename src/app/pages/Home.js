import React from 'react'

// Import translations
import { translates } from 'translations/translates'
import withLanguage from '../withLanguage'

class Home extends React.Component {
  
  render() {

    const { props: { language } } = this
    const text = translates[`translation${language.toUpperCase()}`]

    return (
          <div className="page page-home">
            {
              (() => {
                return <div className="page-header">
                  <h1 className="page-heading-h1">
                    {text.home.h1}
                  </h1>
                  <h2 className="page-heading-h2">
                    {text.home.h2}
                  </h2>
                </div>
              })()
            }
          </div>
    )
  }
}

export default withLanguage(Home)