import { StyleSheet } from 'react-native';
import { Metrics, Fonts } from '../../Theme';

export default StyleSheet.create({
  container: {
    marginVertical: Metrics.smallMargin
  },
  title: {
    ...Fonts.style.black,
    fontSize: Fonts.size.small,
    fontWeight: 'bold'
  },
  content: {
    ...Fonts.style.normal,
    ...Fonts.style.black,
    textAlign: 'justify'
  },
  link: {
    textDecorationLine: 'underline'
  }
});
