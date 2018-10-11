import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.itemColor,
    width: Metrics.images.itemWidth,
    margin: Metrics.smallMargin,
  },
  info: {
    flexDirection: 'row',
    padding: Metrics.smallMargin,
    justifyContent: 'space-around'
  }
})
