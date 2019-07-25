import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '~/Theme';

export default class StatusBarBackground extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  render() { return <View style={[styles.statusBarBackground, this.props.style || {}]} />; }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: Colors.white,
    height: (Platform.OS === 'ios') ? 20 : 0,
  },
});
