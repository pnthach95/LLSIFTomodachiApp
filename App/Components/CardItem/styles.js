import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.itemColor,
    width: Metrics.images.itemWidth,
    margin: Metrics.smallMargin,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 10
  },
  image: {
    width: Metrics.images.itemWidth
  },
  delete: {
    position: 'absolute',
    right: 0,
    top: -5,
    zIndex: 2
  },
  textStyle: {
    paddingHorizontal: 6,
    paddingVertical: 3
  }
})
