import React from 'react'

import withLanguage from '../withLanguage'

//Import Components
import NewsList from '../components/NewsList'

// Import CSS
import 'app/styles/grid.css'
import 'app/styles/components/links.css'
import 'app/styles/pages/about.css'

class About extends React.Component {
  render() {    
    return (
      <div className="page page-about">
        <NewsList />
      </div>
    )
  }
}

export default withLanguage(About)