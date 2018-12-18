import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightHeader: {
    flexDirection: 'row',
    marginRight: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  rightHeaderImage: {
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.17,
    height: Metrics.navBarHeight
  },
  scrollView: {
    margin: Metrics.doubleBaseMargin
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
