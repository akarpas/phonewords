import React from 'react'

import style from './index.scss'

class PhoneButton extends React.Component {
  getContent = () => {
    switch (this.props.label) {
      case 1:
        return 'backspace'
      case '*':
        return 'loop'
      case '#':
        return 'delete_forever'
      default:
        return 'other'
    }
  }

  getId = () => {
    switch (this.props.label) {
      case 1:
        return 'backspace'
      case '*':
        return 'loop'
      case '#':
        return 'clear'
      default:
        return 'other'
    }
  }

  render() {
    const hasIcon = this.props.sub === 'icon'
    const id = this.getId()
    const content = this.getContent()
    const icon = hasIcon && (
        <i
          className="material-icons"
          id={id}
          style={{
            fontSize: '12px',
            height: '12px',
          }}>
          {content}
        </i>
    )

    return (
      <div className={style.button} onClick={this.props.click} id={id}>
        <div className={style.label} id={id}>{this.props.label}</div>
        <div className={style.sub} id={id}>
          {hasIcon ? icon : this.props.sub}
        </div>
      </div>
    )
  }
}

export default PhoneButton