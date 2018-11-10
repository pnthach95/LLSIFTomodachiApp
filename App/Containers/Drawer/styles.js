import { StyleSheet } from 'react-native'
import { Metrics } from '../../Theme'

export default StyleSheet.create({
  fullscreen: {
    width: '100%',
    height: '100%'
  },
  container: {
    height: Metrics.screenHeight - 50,
    backgroundColor: '#ddda'
  },
  header: {
    width: '100%',
    height: 80,
    backgroundColor: '#fffb'
  },
  logo: {
    height: 80,
    width: '75%'
  },
  body: {
    width: '100%',
    padding: 10
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#eeec',
    width: '100%',
    height: 150
  },
  versionContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    height: 50
  },
  versionText: {
    textAlign: 'center'
  },
  viewMore: {
    backgroundColor: 'white',
    width: '100%',
    height: 50
  }
})
