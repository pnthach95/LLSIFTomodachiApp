import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.violet,
    flex: 1,
  },
  content: {
    alignItems: 'center',
  },
  filterContainer: {
    backgroundColor: Colors.white,
    padding: 10,
  },
  header: {
    backgroundColor: Colors.white,
  },
  list: {
    padding: Metrics.smallMargin,
  },
  margin10: {
    margin: 10,
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
});
