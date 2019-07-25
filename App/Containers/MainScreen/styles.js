import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '~/Theme';

export default StyleSheet.create({
  bgWhite: {
    backgroundColor: Colors.white,
  },
  blank: {
    backgroundColor: Colors.pink,
    flex: 1,
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
    ...Fonts.style.white,
    ...Fonts.style.center,
    fontSize: 16,
  },
  textbox: {
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: 4,
  },
  title: {
    ...Fonts.style.white,
    ...Fonts.style.center,
    fontSize: 24,
    fontWeight: 'bold',
  },
  update: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.lightGreen,
    padding: 5,
    width: Metrics.screenWidth * 0.9,
  },
});
