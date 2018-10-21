import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'
import { Fonts } from '../../Theme'

/**
 * TextRow
 * - item1: {text, flex, textStyle}
 * - item2: {text, flex, textStyle, onPress}
 *
 * @export
 * @class TextRow
 * @extends {React.Component}
 */
export default class TextRow extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: this.props.item1.flex }}>
          <Text style={[Fonts.style.normal, this.props.item1.textStyle]}>{this.props.item1.text}</Text>
        </View>
        <View style={{ flex: this.props.item2.flex }}>
          <Text style={[Fonts.style.normal, this.props.item2.textStyle]}
            onPress={this.props.item2.onPress}>{this.props.item2.text}</Text>
        </View>
      </View>
    )
  }
}
