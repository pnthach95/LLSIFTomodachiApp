import { connect } from 'react-redux';
import CardsScreen from './Cards';

const mapStateToProps = (state) => ({
  isConnected: state.network.isConnected,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(CardsScreen);
