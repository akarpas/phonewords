import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

import style from './index.scss'

ReactDOM.render(
  <div className={style.appContainer}>
    <App/>
  </div>,
  document.getElementById('app')
)