import { StyleSheet } from 'react-native';
import { Colors } from '~/Theme';

export default StyleSheet.create({
  background: {
    backgroundColor: '#aaa',
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 1.5,
    flexDirection: 'row',
    height: 35,
    width: '80%',
  },
  fill: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row-reverse',
  },
  noFill: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    paddingHorizontal: 10,
  },
});
