import { connect } from 'react-redux';
import { fetchCachedData } from '~/redux/actions/cachedDataActions';
import LoadingScreen from './LoadingScreen';

const mapStateToProps = (state) => ({
  cachedData: state.reducer.cachedData,
  error: state.reducer.error,
});

const mapDispatchToProps = { fetchCachedData };

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
