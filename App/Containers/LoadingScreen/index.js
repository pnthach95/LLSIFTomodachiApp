import { connect } from 'react-redux';
import { fetchCachedData } from '~/redux/actions/cachedDataActions';
import LoadingScreen from './LoadingScreen';

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = { fetchCachedData };

export default connect(mapStateToProps, mapDispatchToProps)(LoadingScreen);
