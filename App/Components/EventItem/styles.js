import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    margin: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    width: Metrics.screenWidth - 20,
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
  },
  textBox: {
    paddingVertical: Metrics.smallMargin,
  },
});
