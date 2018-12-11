import { StyleSheet, Platform } from 'react-native';
import { Colors } from './index';

export default StyleSheet.create({
  buttonText: {
    color: 'black',
    fontSize: 16
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginVertical: 3,
    borderRadius: 10,
    marginRight: 10
  },
  button1: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginVertical: 3,
    borderRadius: 10
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
    borderColor: Colors.green,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 2,
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
