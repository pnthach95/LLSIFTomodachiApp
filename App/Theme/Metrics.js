import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

export default {
  // Examples of metrics you can define:
  // baseMargin: 10,
  // largeMargin: 20,
  // smallMargin: 5,
  fullWidth: width,
  fullHeight: height
}
