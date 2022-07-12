import {StyleSheet} from 'react-native';
import {Colors, Metrics} from './index';

export default StyleSheet.create({
  buttonImage: {
    height: 30,
    resizeMode: 'contain',
    width: 30,
  },
  buttonImage1: {
    height: 30,
    resizeMode: 'contain',
    width: 50,
  },
  flex2: {
    flex: 2,
  },
  leftView: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: Metrics.baseMargin,
  },
  rightView: {
    flex: 2,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  selectedValue: {
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 5,
  },
  selectedValue1: {
    backgroundColor: Colors.lightGreen,
  },
  selectionButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: Metrics.baseMargin,
  },
  standardButton: {
    borderRadius: 5,
    marginVertical: 3,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  textButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Metrics.baseMargin,
  },
});
