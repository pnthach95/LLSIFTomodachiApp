import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import styles from './styles'
import { ApplicationStyles } from '../../Theme'

export default class CardDetailScreen extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[ApplicationStyles.center, styles.button]}>
        <Icon name={this.props.name} size={30} color={this.props.color} />
      </TouchableOpacity>
    )
  }
}
