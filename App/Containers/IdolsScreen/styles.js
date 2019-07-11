import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
  },
  hole: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight,
  },
  list: {
    padding: Metrics.smallMargin,
  },
  sectionText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
