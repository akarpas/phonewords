import React, { Component } from 'react'
import { connect } from 'react-redux'

import style from './index.scss'

class Button extends Component {
  state = {}

  render() {
    console.warn(this.props)
    return (
      <div className={style.button} onClick={this.props.click}>
        <div className={style.label}>{this.props.label}</div>
        <div className={style.sub}>{this.props.sub}</div>
      </div>
    )
  }
}

export default Button