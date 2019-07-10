import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
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
    paddingVertical: Metrics.baseMargin,
  },
  content: {
    flex: 1,
    paddingHorizontal: Metrics.baseMargin,
  },
  event: {
    alignItems: 'center',
  },
  eventButton: {
    alignSelf: 'flex-end',
    paddingRight: Metrics.baseMargin,
  },
  eventImage: {
    height: Metrics.screenWidth / 5,
    marginVertical: 10,
    width: 2 * Metrics.screenWidth / 3,
  },
  headerButton: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight,
  },
  leftRadius: {
    borderBottomLeftRadius: Metrics.baseMargin,
    borderTopLeftRadius: Metrics.baseMargin,
  },
  leftRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightHeaderImage: {
    height: Metrics.navBarHeight,
    resizeMode: 'contain',
    width: Metrics.screenWidth * 0.17,
  },
  rightRadius: {
    borderBottomRightRadius: Metrics.baseMargin,
    borderTopRightRadius: Metrics.baseMargin,
  },
  scrollView: {
    marginVertical: Metrics.doubleBaseMargin,
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
  },
});
