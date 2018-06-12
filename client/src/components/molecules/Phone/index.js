import React from 'react'
import { connect } from 'react-redux'
import Screen from '../../atoms/Screen'
import PhoneButton from '../../atoms/PhoneButton'
import PhoneControls from '../../atoms/PhoneControls'
import * as actionsT9 from '../../../actions/tNine'
import _ from 'lodash'

import style from './index.scss'

class Phone extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      max: 8,
      value: '',
      start: '',
      elapsed: 0,
      go: false,
      combos: ['Type A Number up to 9 digits. Use Combos Button to check for Words. Try for words bad, cat, dear etc.'],
      words: [],
      results: false,
      selection: 0,
      wordType: 'COMBOS'
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({ results: false })
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
          wordType: this.state.wordType === 'COMBOS' ? 'WORDS' : 'COMBOS',
          selection: 0
        })
        break
      case 'clear':
        this.setState({
          value: '',
          combos: [],
          words: [],
          results: false,
          selection: 0,
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

  startCount = () => {
    this.setState({start: Date.now(), go: true})
  }

  click = (e, number) => {
    e.preventDefault()
    if (this.state.go) {
      clearInterval(this.state.timer)
    }
    this.setState({ value: this.state.value + number })
    const timer = setInterval(this.tick, 1)
    this.setState({ timer })  
    this.startCount(e)
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ value: this.state.value + event.target.value })
  }

  backSpace = (e) => {
    e.preventDefault()
    
    const length = this.state.value.length
    if (length >= 2) {
      const current = this.state.value
      const timer = setInterval(this.tick, 1)
      this.startCount(e)
      this.setState({
        timer,
        value: current.substring(0, current.length - 1),
        selection: 0,
      })
    } else {
      clearInterval(this.state.timer)
      this.setState({
        words: [],
        combos: [],
        value: '',
      })
    }
  }

  render() {
    const { selection, combos, words, results, value } = this.state
    const wordsToShow = this.state.wordType === 'COMBOS' ? combos : words

    return (
      <div className={style.phone}>
        <Screen
          value={value.slice(0,this.state.max)}
          handleChange={(e) => this.handleChange(e)}
          wordsToShow={wordsToShow}
          currentWord={wordsToShow[this.state.selection]}
          selection={selection}
        />
        <div className={style.buttons}>
            <div className={style.row}>         
              <PhoneControls
                clickHandler={(e) => this.handleControls(e)}
                type={this.state.wordType}
              />
            </div>            
            <div className={style.row}>          
              <PhoneButton label={1} sub={'icon'} click={(e) => this.backSpace(e)}/>
              <PhoneButton label={2} sub={'abc'} click={(e) => this.click(e, 2)}/>
              <PhoneButton label={3} sub={'def'} click={(e) => this.click(e, 3)}/>
            </div>
            <div className={style.row}>                      
              <PhoneButton label={4} sub={'ghi'} click={(e) => this.click(e, 4)}/>
              <PhoneButton label={5} sub={'jkl'} click={(e) => this.click(e, 5)}/>
              <PhoneButton label={6} sub={'mno'} click={(e) => this.click(e, 6)}/>
            </div>
            <div className={style.row}>
              <PhoneButton label={7} sub={'pqrs'} click={(e) => this.click(e, 7)}/>
              <PhoneButton label={8} sub={'tuv'} click={(e) => this.click(e, 8)}/>
              <PhoneButton label={9} sub={'wxyz'} click={(e) => this.click(e, 9)}/>
            </div>
            <div className={style.row}>            
              <PhoneButton label={'*'} sub={'icon'} click={(e) => this.handleControls(e)} />
              <PhoneButton label={0} />
              <PhoneButton label={'#'} sub={'icon'} click={(e) => this.handleControls(e)}/>
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