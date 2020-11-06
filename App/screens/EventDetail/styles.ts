import { StyleSheet } from 'react-native';
import { Colors, Metrics, Fonts } from '~/Theme';

export default StyleSheet.create({
  attributeIcon: {
    height: 25,
    margin: 5,
    width: 25
  },
  card: {
    alignItems: 'center',
    margin: Metrics.baseMargin
  },
  cardImage: {
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Metrics.baseMargin
  },
  container: {
    flex: 1
  },
  content: {
    padding: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin
  },
  flex2: {
    flex: 2
  },
  header: {
    backgroundColor: Colors.lightViolet
  },
  roundImage: {
    height: Metrics.screenWidth / 6,
    width: Metrics.screenWidth / 6
  },
  song: {
    height: Metrics.screenWidth / 3,
    width: Metrics.screenWidth / 3
  },
  songInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin
  },
  text: {
    fontSize: 16,
    paddingVertical: Metrics.baseMargin
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  trackerCell: {
    backgroundColor: Colors.lightViolet
  },
  trackerHead: {
    backgroundColor: Colors.grey400,
    height: 40
  },
  trackerRegion: {
    height: Metrics.navBarHeight,
    marginHorizontal: Metrics.doubleBaseMargin
  },
  trackerText: {
    margin: 6
  },
  whiteCenter: {
    ...Fonts.style.center
  },
  width5: {
    width: 5
  }
});
