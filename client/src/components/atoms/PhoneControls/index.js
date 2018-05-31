import React from 'react'

import style from './index.scss'

class PhoneControls extends React.Component {
  render() {
    return (
      <div className={style.controls}>
        <div
          className={style.reload}
          onClick={this.props.clickHandler}
        >
          <i className="material-icons" id='loop'>
            loop
          </i>
        </div>
        <div
          id='words'
          className={this.props.type === 'COMBOS' ? style.combos : style.words}
          onClick={this.props.clickHandler}
        >
          {this.props.type}
        </div>
        <div
          className={style.clear}
          onClick={this.props.clickHandler}
        >
          <i className="material-icons" id='clear'>
            delete_forever
          </i>
        </div>
      </div>
    )
  }
}

export default PhoneControls