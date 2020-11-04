import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';

export default StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  leftHeader: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rightHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: Metrics.baseMargin
  },
  rightHeaderImage: {
    height: 70,
    width: 70
  },
  scrollView: {
    margin: Metrics.doubleBaseMargin
  }
});
