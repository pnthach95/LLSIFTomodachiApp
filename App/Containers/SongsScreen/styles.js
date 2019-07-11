import { StyleSheet } from 'react-native';
import { Metrics } from '~/Theme';

export default StyleSheet.create({
  filterContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  flatListElement: {
    margin: 10,
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
    marginTop: 10,
    padding: 10,
  },
});
