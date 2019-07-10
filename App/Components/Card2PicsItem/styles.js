import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    borderRadius: 4,
    margin: Metrics.smallMargin,
    width: Metrics.screenWidth - Metrics.smallMargin * 4,
  },
  info: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
  },
  infoRight: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.smallMargin,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
