import { StyleSheet } from 'react-native';
import {
  ApplicationStyles,
  Metrics, Colors, Fonts,
} from '~/Theme';

export default StyleSheet.create({
  close: {
    paddingLeft: 20,
  },
  container: {
    backgroundColor: Colors.black,
    flex: 1,
  },
  headerAbsolutePosition: {
    ...ApplicationStyles.absolute,
    alignItems: 'center',
    backgroundColor: Colors.c0005,
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
    ...Fonts.style.white,
    ...Fonts.style.center,
    fontSize: 26,
  },
});
