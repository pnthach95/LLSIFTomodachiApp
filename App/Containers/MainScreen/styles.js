import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.pink
  },
  centerHeader: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  logo: {
    width: '70%',
    resizeMode: 'contain'
  },
  body: {
    paddingVertical: Metrics.baseMargin,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: Metrics.baseMargin,
    paddingBottom: Metrics.baseMargin
  },
  text: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  textbox: {
    paddingVertical: 4,
    paddingHorizontal: Metrics.baseMargin,
  },
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center'
  },
  block: {
    width: '100%',
    alignItems: 'center'
  },
  update: {
    width: '90%',
    backgroundColor: Colors.lightGreen,
    alignSelf: 'center',
    alignItems: 'center',
    padding: 5
  }
});
