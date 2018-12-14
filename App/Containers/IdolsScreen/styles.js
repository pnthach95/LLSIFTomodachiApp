import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '../../Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.blue
  },
  list: {
    padding: Metrics.smallMargin
  },
  sectionText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  }
});
