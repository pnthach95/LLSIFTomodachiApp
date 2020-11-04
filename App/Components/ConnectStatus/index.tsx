import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { NetworkConsumer } from 'react-native-offline';
import { Fonts, Colors } from '~/Theme';

/**
 * Connect Status
 */
const ConnectStatus = (): React.ReactElement => {
  return (
    <View>
      <NetworkConsumer>
        {({ isConnected }) =>
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
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.red,
    padding: 10,
    width: '100%'
  },
  zero: {
    height: 0
  }
});

export default ConnectStatus;
