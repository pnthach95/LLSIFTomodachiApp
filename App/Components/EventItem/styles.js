import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff5',
    width: Metrics.screenWidth - 20,
    borderRadius: 15,
    margin: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    paddingVertical: Metrics.smallMargin,
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
});
