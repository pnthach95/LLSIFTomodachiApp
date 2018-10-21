import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { ApplicationStyles } from '../../Theme'

/**
 * Nút hình vuông, dùng icon Ionicons
 *
 * - name: tên icon
 * - color: màu icon
 * - onPress: function
 * @export
 * @class SquareButton
 * @extends {React.Component}
 */
export default class SquareButton extends React.Component {
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
