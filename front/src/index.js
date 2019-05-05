import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

// Import service workers
import * as serviceWorker from 'serviceWorker'

// Import context provider
import { MyProvider } from 'context'

// Import Main component
import Main from './app/Main'

// Import CSS
import 'app/styles/base.scss'
import 'app/styles/layout.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-block-ui/style.css';

// Create App component
const App = () => {
  return (
    <MyProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </MyProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.register()