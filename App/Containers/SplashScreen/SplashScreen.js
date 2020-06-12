import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import { BarIndicator } from 'react-native-indicators';
import { responsiveScreenWidth } from 'react-native-responsive-dimensions';
import { Images, ApplicationStyles } from '~/Theme';

/**
 * Splash Screen
 *
 * Prop:
 * - `bgColor`: Background color
 *
 * @export
 * @class SplashScreen
 * @extends {React.Component}
 */
export default class SplashScreen extends React.Component {
  static defaultProps = {
    bgColor: '#D2CAC6',
  };

  static propTypes = {
    bgColor: PropTypes.string,
  };

  render() {
    return <View style={[
      ApplicationStyles.screen,
      ApplicationStyles.center,
      { backgroundColor: this.props.bgColor }]}>
      <FastImage source={Images.logo}
        resizeMode='contain'
        style={styles.logo} />
      <BarIndicator count={9} color={'white'} />
    </View>;
  }
}

const styles = StyleSheet.create({
  logo: {
    height: responsiveScreenWidth(50),
    width: responsiveScreenWidth(70),
  },
});
