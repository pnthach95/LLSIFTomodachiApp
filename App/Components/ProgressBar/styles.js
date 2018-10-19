import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  background: {
    backgroundColor: '#aaa',
    height: 35,
    width: '80%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1.5,
    flexDirection: 'row'
  },
  fill: {
    backgroundColor: Colors.primary,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  noFill: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    paddingHorizontal: 10,
    color: 'white'
  }
})
