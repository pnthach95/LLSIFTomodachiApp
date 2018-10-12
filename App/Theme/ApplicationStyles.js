import Metrics from './Metrics';

/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */

export default {
  screen: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    height: Metrics.navBarHeight,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageHeader: {
    height: '100%',
    resizeMode: 'contain'
  },
  mediumIcon: {
    width: Metrics.icons.medium,
    height: Metrics.icons.medium,
    resizeMode: 'contain'
  },
  largeIcon: {
    width: Metrics.icons.large,
    height: Metrics.icons.large,
    resizeMode: 'contain'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}
