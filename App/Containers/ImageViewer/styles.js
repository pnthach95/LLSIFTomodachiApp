import { StyleSheet } from 'react-native'
import { Metrics } from '../../Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    flex: 1,
  },
  photo: {
    width: Metrics.screenWidth,
    height: Metrics.screenHeight,
  },
  close: {
    position: 'absolute',
    left: 20,
    top: 10,
    zIndex: 10
  }
})
