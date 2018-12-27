import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.violet
  },
  header: {
    backgroundColor: Colors.lightViolet
  },
  content: {
    padding: Metrics.baseMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    paddingVertical: Metrics.baseMargin
  },
  whiteCenter: {
    color: 'white',
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
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
    marginTop: Metrics.baseMargin,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    marginVertical: Metrics.baseMargin
  },
  cardImage: {
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin
  },
  attributeIcon: {
    width: 25,
    height: 25
  },
  whiteLine: {
    backgroundColor: 'white'
  },
  trackerRegion: {
    height: Metrics.navBarHeight,
    marginHorizontal: Metrics.doubleBaseMargin,
  },
  trackerHead: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  trackerCell: {
    backgroundColor: Colors.lightViolet
  },
  trackerText: {
    margin: 6
  },
  textCenter: {
    textAlign: 'center'
  }
});
