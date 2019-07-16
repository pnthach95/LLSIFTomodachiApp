import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '~/Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    flex: 1,
  },
  contentContainer: {
    padding: Metrics.baseMargin,
  },
  filterContainer: {
    backgroundColor: Colors.white,
    height: Metrics.screenHeight * 0.35,
  },
  flatListElement: {
    margin: Metrics.baseMargin,
  },
  floatButton: {
    backgroundColor: Colors.white,
    borderRadius: 50,
    bottom: 10,
    height: 50,
    left: 20,
    position: 'absolute',
    width: 50,
  },
  floatButtonSize: {
    height: 35,
    width: 35,
  },
  header: {
    backgroundColor: Colors.white,
  },
  list: {
    padding: Metrics.smallMargin,
  },
  resetText: {
    ...Fonts.style.white,
    ...Fonts.style.center,
  },
  resetView: {
    alignItems: 'stretch',
    backgroundColor: Colors.red,
    justifyContent: 'center',
    marginTop: Metrics.baseMargin,
    padding: Metrics.baseMargin,
  },
});
