import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Images, AppStyles } from '~/Theme';

type ScreenType = {
  bgColor?: string;
};

/**
 * Splash Screen
 *
 * Prop:
 * - `bgColor`: Background color
 *
 */
const LoadingScreen: React.FC<ScreenType> = ({ bgColor = '#D2CAC6' }) => {
  return (
    <View
      style={[
        AppStyles.screen,
        AppStyles.center,
        { backgroundColor: bgColor }
      ]}>
      <FastImage
        source={Images.logo}
        resizeMode='contain'
        style={styles.logo}
      />
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: responsiveScreenWidth(50),
    width: responsiveScreenWidth(70)
  }
});

export default LoadingScreen;
