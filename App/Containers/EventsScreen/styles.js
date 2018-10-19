import { StyleSheet } from 'react-native'
import { Metrics, Colors } from 'App/Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.violet
  },
  header: {
    backgroundColor: 'white'
  },
  list: {
    padding: Metrics.smallMargin,
  },
  content: {
    alignItems: 'center',
  }
})
