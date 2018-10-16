import React from 'react'
import { View } from 'react-native'

export default class Seperator extends React.Component {
  render() {
    return <View style={[{ backgroundColor: '#777', height: 1.4, width: '100%', marginVertical: 4 }, this.props.style]} />
  }
}
