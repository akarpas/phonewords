import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'

class PhoneControls extends Component {
  
  getButton = (type) => {
    switch (type) {
      case 'loop':
        return (
          <Button buttonStyle={styles.buttonSmall} title='LOOP' onPress={this.props.click} id='loop' />
        )
      case 'COMBOS':
      case 'WORDS':
        return (
          <Button
            buttonStyle={this.props.type === 'COMBOS' ?
              styles.buttonBigCombos : 
              styles.buttonBigWords
            }
            title={this.props.type === 'COMBOS' ? 'COMBOS' : 'WORDS'}
            onPress={this.props.click}
            id='words'
          />
        )
      case 'clear':
        return (
          <Button buttonStyle={styles.buttonSmall} title='CLEAR' onPress={(e) => this.props.click(e, 'x')} id='clear' />
        )
      default:
        break;
    }
  }

  render() {
    const type = this.props.type
    const button = this.getButton(type)
    return (
      button
    )
  }
}

export default PhoneControls

const styles = StyleSheet.create({
  icon: {
    justifyContent: 'center',
    minWidth: 40,
  },
  reload: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 28,
    backgroundColor: "lightcoral",
    margin: 5,
    borderRadius: 7,
    maxWidth: 40,
    height: 25,
    textAlign: 'center',
    fontSize: 22
  },
  combos: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 28,
    backgroundColor: "lightcoral",
    margin: 5,
    borderRadius: 7,
    maxWidth: 100,
    height: 25,
    textAlign: 'center'
  },
  words: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 28,
    margin: 5,
    borderRadius: 7,
    maxWidth: 100,
    backgroundColor: "lightgreen",
    height: 25,
    textAlign: 'center'
  },
  clear: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 28,
    backgroundColor: "lightcoral",
    margin: 5,
    borderRadius: 7,
    maxWidth: 40,
    height: 25,
    fontSize: 22,
    textAlign: 'center'
  },
  buttonSmall: {
    backgroundColor: "lightcoral",
    width: 70,
    height: 30,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
  },
  buttonBigCombos: {
    backgroundColor: "lightcoral",
    width: 90,
    height: 30,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  },
  buttonBigWords: {
    backgroundColor: "lightgreen",
    width: 90,
    height: 30,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }
})
