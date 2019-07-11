import { connect } from 'react-redux';
import MainScreen from './Main';

const mapStateToProps = state => ({
  cachedData: state.cachedData,
  cachedDataErrorMessage: state.error,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
