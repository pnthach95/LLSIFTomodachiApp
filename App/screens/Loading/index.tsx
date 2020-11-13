import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Images, AppStyles } from '~/Theme';

/**
 * Splash Screen
 */
const LoadingScreen: React.FC<unknown> = () => {
  return (
    <View style={[AppStyles.screen, AppStyles.center]}>
      <FastImage
        source={Images.logo}
        resizeMode='contain'
        style={styles.logo}
      />
      <ActivityIndicator size='large' />
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
