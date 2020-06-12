import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NetworkConsumer } from 'react-native-offline';
import { Fonts, Colors } from '~/Theme';

/**
 * Connect Status
 */
function ConnectStatus() {
  return <View>
    <NetworkConsumer>
      {({ isConnected }) => (
        isConnected ? <View style={styles.zero} />
          : <View style={styles.box}>
            <Text style={[Fonts.style.white, Fonts.style.center]}>
              No internet connection
            </Text>
          </View>
      )}
    </NetworkConsumer>
  </View>;
}

export default ConnectStatus;

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
