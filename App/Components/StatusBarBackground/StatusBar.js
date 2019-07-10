import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

export default class StatusBarBackground extends Component {
  render() { return <View style={[styles.statusBarBackground, this.props.style || {}]} />; }
}

const styles = StyleSheet.create({
  statusBarBackground: {
    backgroundColor: 'white',
    height: (Platform.OS === 'ios') ? 20 : 0,
  },
});
