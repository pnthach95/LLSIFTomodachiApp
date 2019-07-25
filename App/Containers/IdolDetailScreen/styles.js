import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';

export default StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  leftHeader: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: Metrics.baseMargin,
  },
  rightHeaderImage: {
    height: Metrics.navBarHeight,
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.17,
  },
  scrollView: {
    margin: Metrics.doubleBaseMargin,
  },
});
