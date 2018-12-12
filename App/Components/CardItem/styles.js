import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    width: Metrics.images.itemWidth,
    margin: Metrics.smallMargin,
    borderRadius: 4
  },
  info: {
    flexDirection: 'row',
    padding: Metrics.smallMargin,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    justifyContent: 'space-around'
  }
});
