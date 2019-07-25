import { connect } from 'react-redux';
import MainScreen from './Main';

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
  cachedData: state.reducer.cachedData,
  cachedDataErrorMessage: state.reducer.error,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
