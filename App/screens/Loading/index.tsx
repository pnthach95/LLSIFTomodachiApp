import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ActivityIndicator} from 'react-native-paper';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {AppStyles, Images} from '~/Theme';

/**
 * Splash Screen
 */
const LoadingScreen = () => {
  return (
    <View style={[AppStyles.screen, AppStyles.center]}>
      <FastImage
        resizeMode="contain"
        source={Images.logo}
        style={styles.logo}
      />
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: responsiveScreenWidth(50),
    width: responsiveScreenWidth(70),
  },
});

export default LoadingScreen;
