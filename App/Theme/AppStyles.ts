import { StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Metrics from './Metrics';

export default StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageHeader: {
    height: Metrics.navBarHeight,
    width: responsiveWidth(60)
  },
  mediumIcon: {
    height: Metrics.icons.medium,
    width: Metrics.icons.medium
  },
  noElevation: {
    elevation: 0
  },
  row: {
    flexDirection: 'row'
  },
  screen: {
    flex: 1
  },
  searchHeader: {
    flex: 1,
    marginLeft: Metrics.baseMargin
  }
});
