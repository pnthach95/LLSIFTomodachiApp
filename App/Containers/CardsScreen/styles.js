import { StyleSheet } from 'react-native'
import { Metrics, Colors } from 'App/Theme'

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
  buttonText: {
    color: 'black',
    fontSize: 16
  },
  button: {
    paddingLeft: 12,
    paddingVertical: 5
  },
  buttonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  leftView: {
    flex: 1,
    justifyContent: 'center'
  },
  selectedButton: {
    borderColor: Colors.green,
    borderWidth: 2,
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
  }
})
