import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { ApplicationStyles } from '~/Theme';

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
  static propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    color: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  render() {
    const {
      onPress, name, color, style,
    } = this.props;
    return (
      <TouchableOpacity onPress={onPress}
        style={[ApplicationStyles.center, styles.button, style]}>
        <Icon name={name} size={30} color={color} />
      </TouchableOpacity>
    );
  }
}
