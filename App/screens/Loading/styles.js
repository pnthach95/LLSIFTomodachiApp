import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '~/Theme';

export default StyleSheet.create({
  bg: {
    backgroundColor: Colors.pink,
  },
  button: {
    backgroundColor: Colors.white,
    margin: 10,
    padding: 10,
  },
  text: {
    ...Fonts.style.normal,
    ...Fonts.style.white,
    ...Fonts.style.center,
  },
  textBox: {
    marginHorizontal: 10,
  },
});
