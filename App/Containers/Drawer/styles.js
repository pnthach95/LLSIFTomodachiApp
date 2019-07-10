import { StyleSheet } from 'react-native';
import { Fonts, Metrics } from '../../Theme';

export default StyleSheet.create({
  body: {
    alignItems: 'stretch',
    flex: 1,
    paddingVertical: 6,
  },
  container: {
    backgroundColor: '#ddda',
    bottom: 50,
    flex: 0,
    flexGrow: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  footer: {
    alignSelf: 'flex-end',
    backgroundColor: '#eeec',
    height: 150,
    width: '100%',
  },
  footerBlock: {
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
  },
  fullscreen: {
    height: '100%',
    width: '100%',
  },
  group: {
    alignItems: 'center',
    backgroundColor: '#fff9',
    borderBottomColor: '#0005',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: Metrics.baseMargin,
  },
  header: {
    alignSelf: 'stretch',
    backgroundColor: '#fffb',
    height: 70,
  },
  logo: {
    height: 70,
    width: '75%',
  },
  settingRow: {
    alignItems: 'center',
    backgroundColor: '#fff6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    padding: Metrics.baseMargin,
  },
  textBlock: {
    padding: Metrics.baseMargin,
  },
  versionContainer: {
    backgroundColor: 'white',
    bottom: 0,
    height: 50,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  versionText: {
    ...Fonts.style.black,
    textAlign: 'center',
  },
  viewMore: {
    alignSelf: 'stretch',
    backgroundColor: '#fff9',
    height: 50,
  },
});
