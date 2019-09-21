import { connect } from 'react-redux';
import CardDetailScreen from './CardDetail';

const mapStateToProps = (state) => ({
  maxStats: state.reducer.cachedData.cards_info.max_stats,
  isConnected: state.network.isConnected,
});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(CardDetailScreen);
