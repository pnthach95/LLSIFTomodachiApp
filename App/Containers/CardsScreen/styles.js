import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.green,
    flex: 1,
  },
  contentContainer: {
    padding: Metrics.baseMargin,
  },
  filterContainer: {
    backgroundColor: 'white',
    height: Metrics.screenHeight * 0.35,
  },
  flatListElement: {
    margin: Metrics.baseMargin,
  },
  floatButton: {
    backgroundColor: 'white',
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
    backgroundColor: 'white',
  },
  list: {
    padding: Metrics.smallMargin,
  },
  resetText: {
    color: 'white',
    textAlign: 'center',
  },
  resetView: {
    alignItems: 'stretch',
    backgroundColor: 'red',
    justifyContent: 'center',
    marginTop: Metrics.baseMargin,
    padding: Metrics.baseMargin,
  },
});
