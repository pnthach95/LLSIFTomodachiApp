import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink
  },
  centerHeader: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  logo: {
    width: Metrics.screenWidth * 0.3,
    resizeMode: 'contain'
  },
  content: {
    alignItems: 'center',
    padding: Metrics.baseMargin
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  textbox: {
    paddingVertical: 4,
    paddingHorizontal: Metrics.baseMargin,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  block: {
    width: Metrics.screenWidth,
    alignItems: 'center'
  },
  update: {
    width: Metrics.screenWidth * 0.9,
    backgroundColor: Colors.lightGreen,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 5
  }
});
