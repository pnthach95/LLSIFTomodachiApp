import { StyleSheet } from 'react-native'

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
    backgroundColor: '#fff6',
    padding: 10,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  group: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#0005',
    backgroundColor: '#fff9'
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
