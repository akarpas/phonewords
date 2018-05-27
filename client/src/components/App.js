import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionsT9 from '../actions/tNine'
import style from './App.scss'
class App extends Component {

  componentWillReceiveProps = (nextProps) => {  }

  click = (e) => {
    e.preventDefault
    actionsT9.getWords(this.props.dispatch, 9)
  }

  render() {
    return (
      <div>
        <h2 className={style.title} onClick={(e) => this.click(e)}> Phone Words </h2>
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
