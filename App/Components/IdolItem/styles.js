import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: Colors.itemColor,
    width: Metrics.images.smallItemWidth,
    margin: Metrics.smallMargin
  },
  info: {
    flexDirection: 'row',
    margin: Metrics.smallMargin,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center'
  }
});
