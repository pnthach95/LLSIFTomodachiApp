import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '~/Theme';

const heightText = (Metrics.navBarHeight / 3) + 6;

export default StyleSheet.create({
  banner: {
    height: 100,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 1,
    paddingVertical: Metrics.baseMargin,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.baseMargin,
  },
  headerButton: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: Metrics.doubleBaseMargin,
    paddingTop: Metrics.baseMargin,
  },
  informationBlock: {
    paddingHorizontal: Metrics.doubleBaseMargin,
  },
  leftRadius: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  leftRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  marginRight10: {
    marginRight: Metrics.baseMargin,
  },
  progressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  progressText: {
    color: Colors.c333,
    paddingLeft: '10%',
    paddingVertical: Metrics.baseMargin,
  },
  rightHeaderImage: {
    height: Metrics.navBarHeight,
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.17,
  },
  rightRadius: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  rightRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: Metrics.baseMargin,
  },
  scrollView: {
    paddingBottom: Metrics.doubleBaseMargin,
  },
  skCard: {
    height: 300,
    width: (Metrics.screenWidth - Metrics.baseMargin * 3) / 2,
  },
  skFlexStart: {
    justifyContent: 'flex-start',
  },
  skNavIcon: {
    height: Metrics.navBarHeight - 14,
    marginLeft: Metrics.baseMargin,
    width: Metrics.navBarHeight - 14,
  },
  skNavName: {
    height: heightText,
    width: Metrics.screenWidth / 3,
  },
  skNavNameContainer: {
    height: heightText,
    width: Metrics.screenWidth / 3,
  },
  skText1: {
    height: heightText,
    marginTop: Metrics.baseMargin,
    width: Metrics.screenWidth / 2,
  },
  skText2: {
    height: heightText,
    marginTop: Metrics.baseMargin,
    width: (2 * Metrics.screenWidth) / 3,
  },
  subtitleText: {
    fontSize: Fonts.size.medium,
  },
});
