import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native'
import { Button, Icon } from 'react-native-elements'

class PhoneButton extends Component {
  getContent = () => {
    switch (this.props.label) {
      case 1:
        return 'backspace'
      case '*':
        return 'loop'
      case '#':
        return 'delete-forever'
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

    const contentRender = hasIcon ? (
      <TouchableHighlight duration={1} style={styles.button} onPress={this.props.click} id={id}>
      <View>
        <Text style={styles.label}>
          {this.props.label}
        </Text>
        <Icon name={content} color='white' size={12} />
        </View>
      </TouchableHighlight>
    ) : (
      <TouchableHighlight duration={1} style={styles.button} onPress={this.props.click} id={id}>
            <View>

        <Text style={styles.label}>
          {this.props.label}
        </Text>
        <Text style={styles.sub}>
          {this.props.sub}
        </Text>
        </View>
      </TouchableHighlight>
    )

    return contentRender
  }
}

export default PhoneButton

const styles = StyleSheet.create({
  container: {
    height: 80,
    minWidth: 80,
    maxWidth: 80
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#72b1db",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#1f628d",
    borderStyle: "solid",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  label: {
    fontSize: 20,
    textAlign: "center",
    color: "#ffffff"
  },
  sub: {
    fontSize: 12,
    textAlign: "center",
    color: "#ffffff"
  },
  icon: {
    height: 12
  }
})
