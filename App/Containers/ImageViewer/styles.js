import { StyleSheet } from 'react-native';
import { ApplicationStyles, Metrics } from '../../Theme';

export default StyleSheet.create({
  close: {
    paddingLeft: 20,
  },
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  headerAbsolutePosition: {
    ...ApplicationStyles.absolute,
    alignItems: 'center',
    backgroundColor: '#0005',
    flexDirection: 'row',
    height: Metrics.navBarHeight,
    justifyContent: 'space-between',
    zIndex: 5,
  },
  loaderContainer: {
    alignItems: 'center',
    bottom: '50%',
    flex: 1,
    justifyContent: 'center',
    left: '50%',
    position: 'absolute',
    right: '50%',
    top: '50%',
  },
  textCenter: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
  },
});
