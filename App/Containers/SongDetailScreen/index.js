import { connect } from 'react-redux';
import SongDetailScreen from './SongDetail';

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
  songMaxStat: state.reducer.cachedData.cards_info.songs_max_stats,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(SongDetailScreen);
