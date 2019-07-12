import { connect } from 'react-redux';
import Drawer from './Drawer';

const mapStateToProps = state => ({
  randomCard: state.cachedData.randomCard,
  bgImage: state.cachedData.bgImage,
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
