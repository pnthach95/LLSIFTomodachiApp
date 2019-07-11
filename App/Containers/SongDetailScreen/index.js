import { connect } from 'react-redux';
import SongDetailScreen from './SongDetail';
import { getSongMaxStat } from '~/redux/selectors/cachedDataSelectors';

const mapStateToProps = state => ({
  songMaxStat: getSongMaxStat(state),
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(SongDetailScreen);
