import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  header: {
    backgroundColor: 'white'
  },
  list: {
    padding: Metrics.smallMargin
  },
  filterContainer: {
    backgroundColor: 'white',
    padding: 10
  },
  resetText: {
    color: 'white',
    textAlign: 'center'
  },
  resetView: {
    alignItems: 'stretch',
    backgroundColor: 'red',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10
  }
});
