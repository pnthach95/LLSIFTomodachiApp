import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const style = StyleSheet.create({
  black: {
    color: Colors.black
  },
  center: {
    textAlign: 'center'
  },
  textWrap: {
    flexGrow: 1,
    flex: 1,
    width: 0
  },
  white: {
    color: Colors.white
  }
});

export default { style };
