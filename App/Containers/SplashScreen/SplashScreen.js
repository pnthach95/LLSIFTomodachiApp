import React from 'react'
import { View, Image } from 'react-native'
import Spinkit from 'react-native-spinkit'
import styles from './SplashScreenStyle'
import { Images, Metrics } from '../../Theme'

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container, { backgroundColor: this.props.bgColor }]}>
        <Image source={Images.logo} style={styles.logo} />
        <Spinkit type='WanderingCubes' size={Metrics.icons.xl} color='white' />
      </View>
    )
  }
}
