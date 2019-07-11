import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '~/Theme';

export default StyleSheet.create({
  attributeIcon: {
    height: 25,
    width: 25,
  },
  card: {
    alignItems: 'center',
    marginVertical: Metrics.baseMargin,
  },
  cardImage: {
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: Metrics.baseMargin,
  },
  container: {
    backgroundColor: Colors.violet,
    flex: 1,
  },
  content: {
    padding: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    alignItems: 'center',
  },
  flex2: {
    flex: 2,
  },
  header: {
    backgroundColor: Colors.lightViolet,
  },
  roundImage: {
    height: Metrics.screenWidth / 6,
    width: Metrics.screenWidth / 6,
  },
  song: {
    height: Metrics.screenWidth / 3,
    width: Metrics.screenWidth / 3,
  },
  songInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
  },
  text: {
    fontSize: 16,
    paddingVertical: Metrics.baseMargin,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  trackerCell: {
    backgroundColor: Colors.lightViolet,
  },
  trackerHead: {
    backgroundColor: '#f1f8ff',
    height: 40,
  },
  trackerRegion: {
    height: Metrics.navBarHeight,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  trackerText: {
    margin: 6,
  },
  whiteCenter: {
    color: 'white',
    textAlign: 'center',
  },
  whiteLine: {
    backgroundColor: 'white',
  },
});
