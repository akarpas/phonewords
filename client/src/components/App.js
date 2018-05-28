import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionsT9 from '../actions/tNine'
import Phone from '../components/molecules/Phone'
import style from './App.scss'
class App extends Component {

  componentWillReceiveProps = (nextProps) => {  }

  click = (e) => {
    e.preventDefault
    actionsT9.getWords(this.props.dispatch, 9)
  }

  render() {
    return (
      <div className={style.content}>
        <Phone />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.tNine.results
  }
}

export default connect(mapStateToProps)(App)
