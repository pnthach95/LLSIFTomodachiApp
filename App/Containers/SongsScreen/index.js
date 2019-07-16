import { connect } from 'react-redux';
import SongsScreen from './Songs';

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(SongsScreen);
