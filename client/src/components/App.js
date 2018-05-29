import React, { Component } from 'react'
import { connect } from 'react-redux'
import Phone from '../components/molecules/Phone'
import style from './App.scss'
class App extends Component {
  render() {
    return (
      <div className={style.content}>
        <Phone />
      </div>
    )
  }
}

export default App
