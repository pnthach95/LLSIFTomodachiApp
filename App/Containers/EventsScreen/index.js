import { connect } from 'react-redux';
import EventsScreen from './Events';

const mapStateToProps = state => ({
  isConnected: state.network.isConnected,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
