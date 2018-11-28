import { StyleSheet } from 'react-native'
import { Metrics } from '../../Theme'

export default StyleSheet.create({
  fullscreen: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 0,
    flexGrow: 1,
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
    flex: 1,
    paddingVertical: 6,
    alignItems: 'stretch'
  },
  textBlock: {
    paddingHorizontal: 10
  },
  settingRow: {
    flexDirection: 'row',
    backgroundColor: '#fffa',
    padding: 10,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  group: {
    padding: 10,
    backgroundColor: '#fff7'
  },
  footer: {
    alignSelf: 'flex-end',
    backgroundColor: '#eeec',
    width: '100%',
    height: 150
  },
  footerBlock: {
    flexDirection: 'row',
    marginVertical: 10
  },
  versionContainer: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    width: '100%',
    height: 50
  },
  versionText: {
    textAlign: 'center'
  },
  viewMore: {
    backgroundColor: '#fff9',
    width: '100%',
    height: 50
  }
})
