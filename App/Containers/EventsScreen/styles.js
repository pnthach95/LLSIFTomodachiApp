import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.violet,
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  filterContainer: {
    backgroundColor: 'white',
    padding: 10,
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
