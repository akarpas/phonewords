import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import App from './components/App'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader'


import style from './index.scss'

import createStore from './store'

const store = createStore({})

const Application = () => {

  ReactDOM.render(
    <div className={style.appContainer}>
      <Provider store={store}>
        <App/>
      </Provider>
    </div>,
    document.getElementById('app')
  )

}

Application()

export default hot(module)(Application)