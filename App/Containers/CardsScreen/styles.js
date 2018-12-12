import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green
  },
  header: {
    backgroundColor: 'white'
  },
  list: {
    padding: Metrics.smallMargin
  },
  filterContainer: {
    height: '40%',
    backgroundColor: 'white'
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
  },
  floatButtonSize: {
    width: 35,
    height: 35
  },
  floatButton: {
    borderRadius: 50,
    position: 'absolute',
    bottom: 10,
    left: 20,
    backgroundColor: 'white',
    width: 50,
    height: 50
  }
});
