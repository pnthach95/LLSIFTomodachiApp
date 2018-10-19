import { StyleSheet } from 'react-native'
import { Metrics } from '../../Theme'

export default StyleSheet.create({
  container: {
    width: Metrics.widthBanner,
    margin: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    paddingHorizontal: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    paddingVertical: Metrics.smallMargin,
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
})
