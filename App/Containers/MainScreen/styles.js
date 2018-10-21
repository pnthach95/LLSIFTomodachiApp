import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink
  },
  leftHeader: {
    flex: 1
  },
  centerHeader: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  logo: {
    width: '70%',
    resizeMode: 'contain'
  },
  body: {
    paddingVertical: Metrics.baseMargin,
  },
  content: {
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    padding: Metrics.baseMargin,
    textAlign: 'center'
  },
  title: {
    color: 'white',
    fontSize: 24,
    padding: Metrics.baseMargin,
  }
})
