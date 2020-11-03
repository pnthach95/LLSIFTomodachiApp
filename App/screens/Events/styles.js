import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '~/Theme';

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
    elevation: 5,
  },
  list: {
    padding: Metrics.smallMargin,
  },
  margin10: {
    margin: 10,
  },
  resetText: {
    ...Fonts.style.white,
    ...Fonts.style.center,
  },
  resetView: {
    alignItems: 'stretch',
    backgroundColor: Colors.red,
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
  },
});
