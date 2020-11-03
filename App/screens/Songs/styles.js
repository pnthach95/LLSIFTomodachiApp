import { StyleSheet } from 'react-native';
import { Metrics, Colors, Fonts } from '~/Theme';

export default StyleSheet.create({
  filterContainer: {
    backgroundColor: Colors.white,
    elevation: 5,
    padding: 10,
  },
  flatListElement: {
    margin: 10,
  },
  header: {
    backgroundColor: Colors.white,
    elevation: 5
  },
  list: {
    padding: Metrics.smallMargin,
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
