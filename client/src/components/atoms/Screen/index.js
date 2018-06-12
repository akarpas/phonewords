import React, { Component } from 'react'

import style from './index.scss'

class Screen extends Component {
  render() {
    const word = this.props.currentWord.length > 10 ?
      '' : this.props.currentWord
    return (
      <div className={style.screen}>
        <div className={style.status}>
          <div className={style.inputWrapper}>
            <input disabled type="text"
              value={this.props.value}
              onChange={this.props.handleChange}
              className={style.input}
            />
          </div>
          <div className={style.current}>
            {word}
          </div>
        </div>
        <div className={style.suggestions}>
          {  
            this.props.wordsToShow.map(((item, index) => {
              return (
                <div
                  key={item}
                  className={
                    index === this.props.selection ?
                      style.suggestionOn :
                      style.suggestion
                  }  
                >
                  {item}
                </div>
                )
            }))
          }
        </div>
      </div>
    )
  }
}

export default Screen