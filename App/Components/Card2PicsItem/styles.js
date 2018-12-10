import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth - Metrics.smallMargin * 4,
    margin: Metrics.smallMargin,
    borderRadius: 4,
    elevation: 5
  },
  info: {
    flexDirection: 'row',
    padding: Metrics.smallMargin,
    justifyContent: 'space-around'
  }
});
