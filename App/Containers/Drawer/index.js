import { connect } from 'react-redux';
import Drawer from './Drawer';
import { getRandomCard, getBGImage } from '~/redux/selectors/cachedDataSelectors';

const mapStateToProps = state => ({
  randomCard: getRandomCard(state),
  bgImage: getBGImage(state),
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
