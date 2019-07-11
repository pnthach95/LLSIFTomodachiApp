import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.itemColor,
    borderRadius: 5,
    margin: Metrics.smallMargin,
    width: Metrics.images.itemWidth,
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: Metrics.smallMargin,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
});
