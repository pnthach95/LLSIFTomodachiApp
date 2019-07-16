import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Colors } from '~/Theme';

/**
 * Connect Status
 *
 * Prop:
 * - `isConnected`: bool
 *
 * @export
 * @class ConnectStatus
 * @extends {Component}
 */
export default class ConnectStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: props.isConnected,
    };
  }

  static propTypes = {
    isConnected: PropTypes.bool,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isConnected !== nextProps.isConnected) {
      return { isConnected: nextProps.isConnected };
    }
    return null;
  }

  render() {
    if (this.state.isConnected) return <View style={styles.zero} />;
    return (
      <View style={styles.box}>
        <Text style={[Fonts.style.white, Fonts.style.center]}>
          No internet connection
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.red,
    padding: 10,
    width: '100%',
  },
  zero: {
    height: 0,
  },
});
