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
    height: Metrics.screenHeight - 290,
    paddingVertical: 10,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  textBlock: {
    paddingHorizontal: 10
  },
  settingRow: {
    flexDirection: 'row',
    backgroundColor: '#fffa',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#eeec',
    width: '100%',
    height: 150
  },
  footerBlock: {
    flexDirection: 'row',
    marginVertical: 10
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
