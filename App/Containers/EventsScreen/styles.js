import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.violet
  },
  header: {
    backgroundColor: 'white'
  },
  list: {
    padding: Metrics.smallMargin,
  },
  content: {
    alignItems: 'center',
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
