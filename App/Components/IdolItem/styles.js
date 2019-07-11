import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.itemColor,
    borderRadius: 5,
    margin: Metrics.smallMargin,
    width: Metrics.images.smallItemWidth,
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: Metrics.smallMargin,
  },
  text: {
    textAlign: 'center',
  },
});
