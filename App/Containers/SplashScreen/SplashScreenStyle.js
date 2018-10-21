import { StyleSheet } from 'react-native'
import { Colors } from '../../Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.pink
  },
  logo: {
    width: '70%',
    resizeMode: 'contain'
  },
})
