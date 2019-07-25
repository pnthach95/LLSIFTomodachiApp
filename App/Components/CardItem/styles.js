import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';

export default StyleSheet.create({
  container: {
    borderRadius: 4,
    margin: Metrics.smallMargin,
    width: Metrics.images.itemWidth,
  },
  info: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.smallMargin,
  },
  topRadius: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});
