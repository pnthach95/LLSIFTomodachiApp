import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../Theme'

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
  },
  textInput: {
    flex: 1,
    borderColor: '#333',
    borderWidth: 1.5,
    margin: 6
  },
  filterContainer: {
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
