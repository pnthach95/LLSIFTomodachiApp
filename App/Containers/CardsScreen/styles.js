import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.green
  },
  header: {
    elevation: 5,
    backgroundColor: 'white'
  },
  list: {
    padding: Metrics.smallMargin
  },
  filterContainer: {
    height: '40%',
    elevation: 5,
    backgroundColor: 'white'
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
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: '#222',
    shadowOffset: { height: 0, width: 0 },
    elevation: 5,
    width: 50,
    height: 50
  }
});
