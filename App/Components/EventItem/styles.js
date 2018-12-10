import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth - 20,
    elevation: 5,
    borderRadius: 10,
    margin: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBox: {
    paddingVertical: Metrics.smallMargin
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
});
