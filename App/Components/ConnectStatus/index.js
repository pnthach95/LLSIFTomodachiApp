import { connect } from 'react-redux';
import ConnectStatus from './ConnectStatus';

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(ConnectStatus);
