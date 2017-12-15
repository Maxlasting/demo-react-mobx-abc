import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import App from './views/App'
import appStore from './store/app-store'

import { AppContainer } from 'react-hot-loader'  // eslint-disable-line

const root = document.getElementById('root')

const render = (component) => {
  const node = (
    <AppContainer>
      <Provider appStore={appStore}>
        { component }
      </Provider>
    </AppContainer>
  )
  ReactDOM.render(node, root)
}

render(<App />)

if (module.hot) {
  module.hot.accept('./views/App', () => {
    const Next = require('./views/App').default  // eslint-disable-line
    render(<Next />)
  })
}
