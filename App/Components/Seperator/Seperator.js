import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '~/Theme';

/**
 * Seperator
 *
 * Prop:
 * - style: style
 *
 * @export
 * @class Seperator
 * @extends {React.Component}
 */
export default class Seperator extends React.Component {
  static propTypes = {
    style: PropTypes.object,
  };

  render() {
    return <View style={[styles.default, this.props.style]} />;
  }
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: Colors.c777,
    height: 1.4,
    marginVertical: 4,
    width: '100%',
  },
});
