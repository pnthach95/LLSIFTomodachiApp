import { StyleSheet, Platform } from 'react-native';
import { Metrics, Colors } from './index';

export default StyleSheet.create({
  buttonText: {
    color: 'black',
    fontSize: 16
  },
  textButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Metrics.baseMargin
  },
  standardButton: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginVertical: 3,
    borderRadius: 5
  },
  buttonImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  buttonImage1: {
    width: 50,
    height: 30,
    resizeMode: 'contain'
  },
  leftView: {
    flex: 1,
    justifyContent: 'center'
  },
  rightView: {
    flex: 2,
    flexDirection: 'row'
  },
  selectedValue: {
    backgroundColor: Colors.lightGreen,
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 5
  },
  selectedValue1: {
    backgroundColor: Colors.lightGreen,
  },
  picker: {
    borderBottomWidth: 1
  },
  pickerRow: {
    flexDirection: 'row',
    marginVertical: Platform.OS === 'ios' ? 7 : 0
  }
})
