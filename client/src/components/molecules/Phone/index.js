import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../atoms/Button'
import Controls from '../../atoms/Controls'
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
      selection: 0,
      clickCount: 0,
      wordType: 'COMBOS'
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

  handleControls = (e) => {
    e.preventDefault()
    const { combos, words, wordType } = this.state
    const type = e.target.id

    switch (type) {
      case 'loop':
        const currentList = wordType === 'COMBOS' ? combos : words
        if (currentList.length - 1 === this.state.selection) {
          this.setState({ selection: 0 })
        } else {
          this.setState({ selection: this.state.selection + 1 })
        }
        break
      case 'words':
        this.setState({
          wordType: this.state.wordType === 'COMBOS' ? 'WORDS' : 'COMBOS'
        })
        break
      case 'clear':
        this.setState({
          number: '',
          value: '',
          combos: [],
          words: [],
          results: false,
          selection: 0,
          clickCount: 0,
          wordType: 'COMBOS'
        })
        break
      default:
        break;
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
    e.preventDefault()
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

  }

  render() {
    const { combos, words, results, value } = this.state

    const wordsToShow = this.state.wordType === 'COMBOS' ? combos : words

    return (
      <div className={style.phone}>
        <div className={style.screen}>
          <div className={style.status}>
            <div className={style.inputWrapper}>
              <input
                disabled
                type="text"
                value={value.slice(0,this.state.max)}
                onChange={this.handleChange}
                className={style.input}
              />
            </div>
            <div className={style.current}> {combos[this.state.selection]}</div>
          </div>
          <div className={style.suggestions}>
            {  
              wordsToShow.map(((item, index) => {
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
              <Controls
                clickHandler={(e) => this.handleControls(e)}
                type={this.state.wordType}
              />
            </div>            
            <div className={style.row}>          
              <Button label={1} />
              <Button label={2} sub={'abc'} click={(e) => this.click(e, 2)}/>
              <Button label={3} sub={'def'} click={(e) => this.click(e, 3)}/>
            </div>
            <div className={style.row}>                      
              <Button label={4} sub={'ghi'} click={(e) => this.click(e, 4)}/>
              <Button label={5} sub={'jkl'} click={(e) => this.click(e, 5)}/>
              <Button label={6} sub={'mno'} click={(e) => this.click(e, 6)}/>
            </div>
            <div className={style.row}>
              <Button label={7} sub={'pqrs'} click={(e) => this.click(e, 7)}/>
              <Button label={8} sub={'tuv'} click={(e) => this.click(e, 8)}/>
              <Button label={9} sub={'wxyz'} click={(e) => this.click(e, 9)}/>
            </div>
            <div className={style.row}>            
              <Button label={'*'} />
              <Button label={0} />
              <Button label={'#'} />
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