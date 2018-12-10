import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    elevation: 5,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingRight: Metrics.baseMargin
  },
  leftHeader: {
    flex: 1
  },
  centerHeader: {
    flex: 3
  },
  rightHeader: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rightHeaderImage: {
    resizeMode: 'contain',
    width: '33%'
  },
  headerButton: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight
  },
  scrollView: {
    paddingBottom: Metrics.doubleBaseMargin
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.baseMargin
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
