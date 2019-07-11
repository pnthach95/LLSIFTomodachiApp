import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

export default StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  block: {
    alignItems: 'center',
    width: Metrics.screenWidth,
  },
  centerHeader: {
    alignItems: 'center',
    flex: 5,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Colors.pink,
    flex: 1,
  },
  content: {
    alignItems: 'center',
    padding: Metrics.baseMargin,
  },
  logo: {
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.3,
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
  textbox: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 4,
  },
  title: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  update: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.lightGreen,
    padding: 5,
    width: Metrics.screenWidth * 0.9,
  },
});
