import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  input: 18,
  regular: 17,
  medium: 14,
  small: 12
};

const style = StyleSheet.create({
  black: {
    color: Colors.black
  },
  center: {
    textAlign: 'center'
  },
  h1: {
    fontSize: size.h1
  },
  h2: {
    fontSize: size.h2
  },
  h3: {
    fontSize: size.h3
  },
  normal: {
    fontSize: size.regular
  },
  white: {
    color: Colors.white
  }
});

export default { size, style };
