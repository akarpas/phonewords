import React, { Component } from 'react'
import { StyleSheet, Text, View, Input } from 'react-native';
import PhoneButton from '../../atoms/PhoneButton'
import PhoneControls from '../../atoms/PhoneControls'
import _ from 'lodash'

class Phone extends Component {
  state = {
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

  handleControls = (e, type) => {
    e.preventDefault()
    const { combos, words, wordType } = this.state
    switch (type) {
      case '*':
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
      case '#':
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
        break
    }
  }

  tick = () => {
    const stop = this.state.elapsed > 1000
    if (stop) {
      const options = {
        method: 'POST',
        body: JSON.stringify({ number: Number(this.state.value.slice(0,this.state.max)) }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
      clearInterval(this.state.timer)
      fetch('https://t9phonewords.herokuapp.com/api/t9/', options)
        .then(res => res.json())
        .then(results => {
          const { combos, words } = results
          this.setState({ results: false })
          this.setState({
            combos,
            words,
            results: true
          })
        this.setState({elapsed: 0, go: false, selection: 0 })          
        })
    } else {
      this.setState({elapsed: Date.now() - this.state.start})
    }
  }

  startCount = (e) => {
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
      <View style={styles.phone}>
        <View style={styles.screen}>
          <View style={styles.status}>
            <View style={styles.inputWrapper}>
              <Text style={styles.input}>
                {this.state.value || 'Type a Number'}
              </Text>
            </View>
            <Text style={styles.current}>
              {this.state.combos.length === 1 ? '' : wordsToShow[this.state.selection]}
            </Text>
          </View>
          <View style={styles.suggestions}>
            {  
              wordsToShow.map(((item, index) => {
                return (
                  <Text key={item} style={
                      index === selection ? styles.suggestionOn : styles.suggestion
                  }>{item}</Text>
                )
              }))
            }
          </View>
        </View>
        <View style={styles.buttons}>
            <View style={styles.row}>
              <View style={styles.controls} >
                <PhoneControls type='loop' click={(e) => this.handleControls(e, '*')}/>
                <PhoneControls type={this.state.wordType} click={(e) => this.handleControls(e, 'words')}/>
                <PhoneControls type='clear' click={(e) => this.handleControls(e, '#')}/>
              </View>
            </View>
            <View style={styles.row}>
              <PhoneButton label={1} sub={'icon'} click={(e) => this.backSpace(e)}/>
              <PhoneButton label={2} sub={'abc'} click={(e) => this.click(e, 2)}/>
              <PhoneButton label={3} sub={'def'} click={(e) => this.click(e, 3)}/>
            </View>
            <View style={styles.row}>
              <PhoneButton label={4} sub={'ghi'} click={(e) => this.click(e, 4)}/>
              <PhoneButton label={5} sub={'jkl'} click={(e) => this.click(e, 5)}/>
              <PhoneButton label={6} sub={'mno'} click={(e) => this.click(e, 6)}/>
            </View>
            <View style={styles.row}>
              <PhoneButton label={7} sub={'pqrs'} click={(e) => this.click(e, 7)}/>
              <PhoneButton label={8} sub={'tuv'} click={(e) => this.click(e, 8)}/>
              <PhoneButton label={9} sub={'wxyz'} click={(e) => this.click(e, 9)}/>
            </View>
            <View style={styles.row}>
              <PhoneButton label={'*'} sub={'icon'} click={(e) => this.handleControls(e, '*')} />
              <PhoneButton label={0} sub={'_'} />
              <PhoneButton label={'#'} sub={'icon'} click={(e) => this.handleControls(e, '#')}/>
            </View>
          </View>
      </View>
    )
  }
}

export default Phone

const styles = StyleSheet.create({
  html: {
    overflow: "scroll",
  },
  // DOUBLE CHECK SCROLLBAR STYLING
  webkitScrollbar: {
    width: "0px",
    backgroundColor: "transparent"
  },
  phone: {
    flex: 1,
    flexDirection: 'column',
    minHeight: 590,
    maxHeight: 700,
    backgroundColor: "gray",
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  screen: {
    marginTop: 15,
    width: 300,
    height: 200,
    backgroundColor: "rgb(165, 198, 165)",
    borderRadius: 10,
    paddingBottom: 10
  },
  status: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  current: {
    minWidth: 150,
    maxWidth: 200,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 5,
    height: 30,
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.8)",
    borderStyle: "solid",
    fontSize: 18,
    textAlign: 'center'
  },
  input: {
    color: 'black',
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 0,
    backgroundColor: "transparent",
  },
  inputWrapper: {
    width: 200,
    margin: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginBottom: 10
  },
  suggestions: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    minWidth: '90%'
  },
  suggestion: {
    height: "auto",
    margin: 3
  },
  suggestionOn: {
    height: "auto",
    backgroundColor: "rgba(230, 232, 183, 0.7)",
    margin: 3
  },
  icon: {
    height: "10px"
  },
  controls: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttons: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 15
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
})