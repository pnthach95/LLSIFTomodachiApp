import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { ApplicationStyles } from '../../Theme';

/**
 * Square button, using Ionicons icon (https://oblador.github.io/react-native-vector-icons/).
 *
 * Prop:
 * - name: Icon name
 * - color: Icon color
 * - style: style
 * - onPress: onPress function
 *
 * @export
 * @class SquareButton
 * @extends {React.Component}
 */
export default class SquareButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={[ApplicationStyles.center, styles.button, this.props.style]}>
        <Icon name={this.props.name} size={30} color={this.props.color} />
      </TouchableOpacity>
    );
  }
}
