import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.pink
  },
  logo: {
    width: '70%',
    resizeMode: 'contain'
  },
  paddingVertical: {
    paddingVertical: Metrics.baseMargin,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
})
