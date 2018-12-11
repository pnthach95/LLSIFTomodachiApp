import { StyleSheet } from 'react-native';
import { Metrics } from '../../Theme';

export default StyleSheet.create({
  header: {
    elevation: 5,
    backgroundColor: 'white'
  },
  list: {
    padding: Metrics.smallMargin
  },
  filterContainer: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 10
  },
  resetButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    margin: 5,
    padding: 10
  },
  resetText: {
    color: 'white',
    textAlign: 'center'
  },
  resetView: {
    alignItems: 'stretch',
    marginTop: 10
  }
});
