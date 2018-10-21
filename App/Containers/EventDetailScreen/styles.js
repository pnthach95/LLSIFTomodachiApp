import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Theme'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.violet
  },
  scrollView: {
    paddingBottom: Metrics.doubleBaseMargin
  },
  header: {
    justifyContent: 'space-between',
    backgroundColor: Colors.lightViolet,
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
  content: {
    alignItems: 'center'
  },
  text: {
    color: 'white',
    fontSize: 16,
    padding: Metrics.baseMargin,
  },
  title: {
    color: 'white',
    fontSize: 24,
    padding: Metrics.baseMargin,
    textAlign: 'center'
  },
  song: {
    width: Metrics.screenWidth / 3,
    height: Metrics.screenWidth / 3
  },
  songInfo: {
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
    alignItems: 'center'
  },
  roundImage: {
    width: Metrics.screenWidth / 6,
    height: Metrics.screenWidth / 6
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin
  },
  cardImage: {
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin
  }
})
