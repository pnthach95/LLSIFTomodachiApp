import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth - Metrics.smallMargin * 4,
    margin: Metrics.smallMargin,
    borderRadius: 4
  },
  info: {
    flexDirection: 'row',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  infoRight: {
    flexDirection: 'row',
    padding: Metrics.smallMargin,
    justifyContent: 'space-around'
  }
});
