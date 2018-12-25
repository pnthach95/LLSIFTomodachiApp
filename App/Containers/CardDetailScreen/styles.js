import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightRow: {
    flexDirection: 'row',
    marginRight: Metrics.baseMargin,
    alignItems: 'center',
    justifyContent: 'flex-end'
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
    paddingBottom: Metrics.doubleBaseMargin
  },
  informationBlock: {
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.baseMargin
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    alignItems: 'center'
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: 1
  },
  leftRadius: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  rightRadius: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  progressText: {
    paddingLeft: '10%',
    paddingVertical: Metrics.baseMargin,
    color: '#333'
  },
  banner: {
    width: '80%',
    height: 100
  },
  subtitleText: {
    fontSize: 14
  }
});
