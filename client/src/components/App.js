import React from 'react'
import { connect } from 'react-redux'
import Phone from '../components/molecules/Phone'
import style from './App.scss'
class App extends React.Component {
  render() {
    return (
      <div className={style.content}>
        <Phone />
      </div>
    )
  }
}

export default App
