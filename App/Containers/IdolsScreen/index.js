import { connect } from 'react-redux';
import IdolsScreen from './Idols';

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
  schools: state.reducer.cachedData.cards_info.schools,
});
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(IdolsScreen);
