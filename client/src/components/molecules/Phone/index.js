import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actionsT9 from '../../../actions/tNine'
import _ from 'lodash'

import style from './index.scss'

class Phone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      max: 10,
      number: '',
      value: '',
      start: '',
      elapsed: 0,
      go: false,
      combos: [],
      words: [],
      results: false,
      selection: 0 ,
      clickCount: 0   
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.results.combos) {
      this.setState({
        combos: nextProps.results.combos,
        words: nextProps.results.words,
        results: true
      })
    }
  }

  tick = () => {
    const stop = this.state.elapsed > 1500
    if (stop) {
      actionsT9.getWords(
        this.props.dispatch,
        this.state.value.slice(0,this.state.max)
      )
      clearInterval(this.state.timer)
      this.setState({elapsed: 0, go: false, selection: 0 })      
    } else {
      this.setState({elapsed: Date.now() - this.state.start})
    }
  }
  startCount = (e) => {
      this.setState({start: Date.now(), go: true})
  }

  click = (e, number) => {
    this.setState({
      clickCount: this.state.clickCount === 8
        ? 0 : this.state.clickCount + 1
      })
    if (this.state.go) {
      clearInterval(this.state.timer)
    }
    this.setState({
      value: this.state.clickCount === 8 ?
        this.state.value :
        this.state.value + number
      })
    const timer = setInterval(this.tick, 1)
    this.setState({ timer })  
    this.startCount(e)
  }

  handleChange = (event) => {
    event.preventDefault()
    this.setState({ value: this.state.value + event.target.value })
  }

  loop = (event) => {
    event.preventDefault()
    if (this.state.combos.length - 1 === this.state.selection) {
      this.setState({ selection: 0 })

    } else {
      this.setState({ selection: this.state.selection + 1 })
    }
  }

  render() {
    const { combos, words, results, value } = this.state

    return (
      <div className={style.phone}>
        <div className={style.screen}>
          <div className={style.status}>
            <input
              type="text"
              value={value.slice(0,this.state.max)}
              onChange={this.handleChange}
              className={style.input}
            />
            <div className={style.current}> {combos[this.state.selection]}</div>
            <div className={style.reload} onClick={this.loop}>
              <i className="material-icons">
                loop
              </i>
            </div>  
          </div>
          <div className={style.suggestions}>
            {  
              combos.map(((item, index) => {
                return (
                  <div  
                    className={
                      index === this.state.selection ? 
                      style.suggestionOn : 
                      style.suggestion
                    }
                    key={item}>
                      {item}
                    </div>
                  )
              }))
            }
          </div>
        </div>
        <div className={style.buttons}>
          <div className={style.row}>
            <div className={style.button}>
              1
            </div>
            <div className={style.button} onClick={(e) => this.click(e, 2)}>
              2
            </div>
            <div className={style.button} onClick={(e) => this.click(e, 3)}>
              3
            </div>
          </div>
          <div className={style.row}>
            <div className={style.button} onClick={(e) => this.click(e, 4)}>
              4
            </div>
            <div className={style.button} onClick={(e) => this.click(e, 5)}>
              5
            </div>
            <div className={style.button} onClick={(e) => this.click(e, 6)}>
              6
            </div>
          </div>
          <div className={style.row}>
            <div className={style.button} onClick={(e) => this.click(e, 7)}>
              7
            </div>
            <div className={style.button} onClick={(e) => this.click(e, 8)}>
              8
            </div>
            <div className={style.button} onClick={(e) => this.click(e, 9)}>
              9
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    results: state.tNine.results,
    resultsPending: state.tNine.resultsPending
  }
}

export default connect(mapStateToProps)(Phone)