import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightHeaderImage: {
    resizeMode: 'contain',
    height: Metrics.navBarHeight,
    width: Metrics.screenWidth * 0.17
  },
  headerButton: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight
  },
  scrollView: {
    marginVertical: Metrics.doubleBaseMargin
  },
  scrollViewContainer: {
    alignItems: 'center',
    marginVertical: Metrics.baseMargin
  },
  content: {
    paddingHorizontal: Metrics.baseMargin,
    flex: 1
  },
  event: {
    alignItems: 'center'
  },
  eventButton: {
    alignSelf: 'flex-end',
    paddingRight: Metrics.baseMargin
  },
  eventImage: {
    marginVertical: 10,
    width: 2 * Metrics.screenWidth / 3,
    height: Metrics.screenWidth / 5
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Metrics.baseMargin
  },
  leftRadius: {
    borderTopLeftRadius: Metrics.baseMargin,
    borderBottomLeftRadius: Metrics.baseMargin
  },
  rightRadius: {
    borderTopRightRadius: Metrics.baseMargin,
    borderBottomRightRadius: Metrics.baseMargin
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: 1
  },
});
