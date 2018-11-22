import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.green
  },
  list: {
    padding: Metrics.smallMargin
  },
  filterContainer: {
    height: '50%',
    backgroundColor: '#ddd9'
  },
  insideFilterContainer: {
    padding: 10
  },
  resetText: {
    color: 'white',
    textAlign: 'center'
  }
})
