import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '~/Theme';

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
    ...Fonts.style.white,
    ...Fonts.style.center,
  },
  textBox: {
    paddingVertical: Metrics.smallMargin,
  },
});
