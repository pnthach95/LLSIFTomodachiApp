import { StyleSheet } from 'react-native';
import { Metrics, Colors } from '~/Theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.blue,
    elevation: 5,
  },
  height10: {
    height: 10,
  },
  hole: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight,
  },
  list: {
    padding: Metrics.smallMargin,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
