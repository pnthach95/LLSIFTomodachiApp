import Metrics from './Metrics';

export default {
  screen: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    zIndex: 2,
    flexDirection: 'row',
    height: Metrics.navBarHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageHeader: {
    width: '60%',
    height: Metrics.navBarHeight,
    resizeMode: 'contain',
  },
  mediumIcon: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium,
    resizeMode: 'contain',
  },
  largeIcon: {
    width: Metrics.icons.large,
    height: Metrics.icons.large,
    resizeMode: 'contain',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    paddingVertical: 10,
    paddingLeft: 10,
    width: Metrics.screenWidth - Metrics.navBarHeight * 3,
  },
  searchHeader: {
    flexDirection: 'row',
    width: Metrics.screenWidth - Metrics.navBarHeight * 2,
    backgroundColor: '#dcdcdc',
    borderRadius: 20,
    marginVertical: 6,
    justifyContent: 'space-between',
  },
  searchButton: {
    width: Metrics.navBarHeight - 10,
    height: Metrics.navBarHeight - 10,
    marginRight: 6,
  },
};
