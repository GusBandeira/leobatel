import React from 'react'

import { translates }  from 'translations/translates'
import withLanguage from '../withLanguage'

//Import Components
import { Quotes } from '../components/Quotes'

// Import CSS
import 'app/styles/grid.css'
import 'app/styles/components/links.css'
import 'app/styles/pages/about.css'

class About extends React.Component {

  render() {

    const { props: { language } } = this
    const text = translates[`translation${language}`]
    
    return (
      <div className="page page-about">
        <div className="container">
          <h1 className="page-heading-h2">{text.about.h1}</h1>
          <p className="page-text">{text.about.p}</p>
        </div>
        <Quotes > Lorem ipsum aenean curabitur elit potenti morbi eleifend, netus elit tristique donec blandit lectus, tincidunt cubilia donec nulla taciti vivamus. dictum venenatis sodales nostra lobortis netus ornare facilisis viverra aliquam id nisi. </Quotes>
      </div>
    )
  }
}

export default withLanguage(About)