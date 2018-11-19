import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green
  },
  header: {
    backgroundColor: 'white'
  },
  list: {
    padding: Metrics.smallMargin
  },
  filterContainer: {
    height: '50%',
    backgroundColor: 'white',
    padding: 10
  },
  resetButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    margin: 5,
    padding: 10
  },
  resetText: {
    color: 'white',
    textAlign: 'center'
  },
  resetView: {
    alignItems: 'stretch',
    marginTop: 10
  }
})
