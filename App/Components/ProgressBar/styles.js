import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  background: {
    backgroundColor: '#ddd',
    height: 35,
    width: '80%',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1.5
  },
  fill: {
    backgroundColor: Colors.primary,
    flex: 1,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  text: {
    paddingRight: 10,
    color: 'white'
  }
})
