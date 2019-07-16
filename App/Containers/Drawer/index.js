import { connect } from 'react-redux';
import Drawer from './Drawer';

const mapStateToProps = state => ({
  randomCard: state.reducer.cachedData.randomCard,
  bgImage: state.reducer.cachedData.bgImage,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
