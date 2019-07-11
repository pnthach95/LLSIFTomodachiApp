import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';

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
    color: 'white',
    textAlign: 'center',
  },
  textBox: {
    paddingVertical: Metrics.smallMargin,
  },
});
