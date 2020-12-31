import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import { responsiveScreenFontSize } from 'react-native-responsive-dimensions';

const style = StyleSheet.create({
  bigTitle: {
    fontSize: responsiveScreenFontSize(4),
    fontWeight: 'bold',
  },
  black: {
    color: Colors.black,
  },
  center: {
    textAlign: 'center',
  },
  smallTitle: {
    fontSize: responsiveScreenFontSize(2),
  },
  textWrap: {
    flexGrow: 1,
    flex: 1,
    width: 0,
  },
  white: {
    color: Colors.white,
  },
});

export default { style };
