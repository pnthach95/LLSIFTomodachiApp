import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

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
  progressRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '5%',
  },
  progressText: {
    color: '#333',
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
  subtitleText: {
    fontSize: 14,
  },
});
