import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '../../Theme';

export default StyleSheet.create({
  container: {
    marginVertical: Metrics.smallMargin
  },
  title: {
    fontSize: Fonts.size.small,
    color: 'black',
    fontWeight: 'bold'
  },
  content: {
    fontSize: Fonts.size.regular,
    color: 'black',
    textAlign: 'justify'
  },
  link: {
    textDecorationLine: 'underline'
  }
});
