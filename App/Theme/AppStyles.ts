import { StyleSheet } from 'react-native';
import Colors from './Colors';
import Metrics from './Metrics';

export default StyleSheet.create({
  absolute: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: Metrics.navBarHeight,
    justifyContent: 'space-between',
    zIndex: 2
  },
  imageHeader: {
    height: Metrics.navBarHeight,
    width: '60%'
  },
  largeIcon: {
    height: Metrics.icons.large,
    resizeMode: 'contain',
    width: Metrics.icons.large
  },
  mediumIcon: {
    height: Metrics.icons.medium,
    width: Metrics.icons.medium
  },
  row: {
    flexDirection: 'row'
  },
  screen: {
    flex: 1
  },
  searchButton: {
    height: Metrics.navBarHeight - 10,
    marginRight: 6,
    width: Metrics.navBarHeight - 10
  },
  searchHeader: {
    backgroundColor: Colors.grey200,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6
  },
  searchInput: {
    paddingLeft: 10,
    paddingVertical: 10,
    width: Metrics.screenWidth - Metrics.navBarHeight * 3
  }
});
