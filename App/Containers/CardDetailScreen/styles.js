import { StyleSheet } from 'react-native'
import { Metrics } from 'App/Theme'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingRight: Metrics.baseMargin
  },
  leftHeader: {
    flex: 1
  },
  centerHeader: {
    flex: 3
  },
  rightHeader: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  rightHeaderImage: {
    resizeMode: 'contain',
    width: '33%'
  },
  headerButton: {
    height: Metrics.navBarHeight,
    width: Metrics.navBarHeight
  },
  scrollView: {
    paddingBottom: Metrics.doubleBaseMargin
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.baseMargin
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: Metrics.doubleBaseMargin
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    alignItems: 'center'
  },
  button: {
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin
  },
  progressText: {
    paddingLeft: '10%',
    paddingVertical: Metrics.baseMargin,
    color: '#333'
  },
  banner: {
    width: '80%',
    height: 100
  }
})
