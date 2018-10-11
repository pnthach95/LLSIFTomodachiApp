import { StyleSheet } from 'react-native'
import { Colors, Metrics } from 'App/Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink
  },
  logo: {
    width: '70%',
    resizeMode: 'contain'
  },
  body: {
    height: Metrics.screenHeight - Metrics.navBarHeight * 2,
    alignItems: 'center',
    paddingTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    padding: 10,
  }
})
