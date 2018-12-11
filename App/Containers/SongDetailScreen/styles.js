import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingRight: Metrics.baseMargin
  },
  centerHeader: {
    flex: 5
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rightHeaderImage: {
    resizeMode: 'contain',
    width: '100%'
  },
  headerButton: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight
  },
  scrollView: {
    marginVertical: Metrics.doubleBaseMargin
  },
  content: {
    padding: 10,
    flex: 1
  },
  event: {
    alignItems: 'center'
  },
  eventButton: {
    alignSelf: 'flex-end',
    paddingRight: 10
  },
  eventImage: {
    width: (Metrics.screenWidth / 2) - 20,
    height: Metrics.screenWidth / 5
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Metrics.baseMargin
  },
  leftRadius: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  rightRadius: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    marginHorizontal: 1
  },
});
