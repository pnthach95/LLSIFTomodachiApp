import React from 'react';
import { View, Image } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import styles from './SplashScreenStyle';
import { Images, ApplicationStyles } from '../../Theme';

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
  }

  render() {
    return (
      <View style={[ApplicationStyles.screen, ApplicationStyles.center, { backgroundColor: this.props.bgColor }]}>
        <Image source={Images.logo} style={styles.logo} />
        <BarIndicator count={9} color={'white'} />
      </View>
    );
  }
}
