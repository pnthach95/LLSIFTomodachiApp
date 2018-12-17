import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../Theme';

export default StyleSheet.create({
  fullscreen: {
    width: '100%',
    height: '100%'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 50,
    flex: 0,
    flexGrow: 1,
    backgroundColor: '#ddda'
  },
  header: {
    alignSelf: 'stretch',
    height: 70,
    backgroundColor: '#fffb'
  },
  logo: {
    height: 70,
    width: '75%'
  },
  body: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'stretch'
  },
  textBlock: {
    paddingHorizontal: Metrics.baseMargin
  },
  settingRow: {
    flexDirection: 'row',
    backgroundColor: '#fff6',
    padding: Metrics.baseMargin,
    marginBottom: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Metrics.baseMargin,
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
    marginVertical: Metrics.baseMargin
  },
  versionContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    height: 50
  },
  versionText: {
    ...Fonts.style.black,
    textAlign: 'center'
  },
  viewMore: {
    backgroundColor: '#fff9',
    alignSelf: 'stretch',
    height: 50
  }
});
