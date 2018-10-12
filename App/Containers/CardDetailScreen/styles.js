import { StyleSheet } from 'react-native'
import { Colors, Metrics } from 'App/Theme'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  text: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    padding: Metrics.baseMargin,
    justifyContent: 'space-around'
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: Metrics.doubleBaseMargin
  },
  button: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin
  },
  progressText: {
    paddingLeft: '10%',
    paddingVertical: Metrics.baseMargin,
    color: '#333'
  },
  headerButton: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight
  }
})
