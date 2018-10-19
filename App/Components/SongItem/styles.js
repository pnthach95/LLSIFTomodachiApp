import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.itemColor,
    width: Metrics.images.itemWidth,
    margin: Metrics.smallMargin,
  },
  info: {
    paddingVertical: Metrics.smallMargin,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
})
