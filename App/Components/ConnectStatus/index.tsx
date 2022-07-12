import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NetworkConsumer} from 'react-native-offline';
import {Text} from 'react-native-paper';
import {Colors, Fonts} from '~/Theme';

/**
 * Connect Status
 */
const ConnectStatus = () => {
  return (
    <NetworkConsumer>
      {({isConnected}) =>
        isConnected ? (
          <View style={styles.zero} />
        ) : (
          <View style={styles.box}>
            <Text style={[Fonts.style.white, Fonts.style.center]}>
              No internet connection
            </Text>
          </View>
        )
      }
    </NetworkConsumer>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.red600,
    padding: 10,
  },
  zero: {
    height: 0,
  },
});

export default ConnectStatus;
