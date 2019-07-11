import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  filterContainer: {
    backgroundColor: Colors.white,
    padding: 10,
  },
  flatListElement: {
    margin: 10,
  },
  header: {
    backgroundColor: Colors.white,
  },
  list: {
    padding: Metrics.smallMargin,
  },
  resetText: {
    color: Colors.white,
    textAlign: 'center',
  },
  resetView: {
    alignItems: 'stretch',
    backgroundColor: Colors.red,
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
});
