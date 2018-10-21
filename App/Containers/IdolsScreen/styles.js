import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue
  },
  header: {
    backgroundColor: 'white'
  },
  list: {
    padding: Metrics.smallMargin
  }
})
