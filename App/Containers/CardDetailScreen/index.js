import { connect } from 'react-redux';
import CardDetailScreen from './CardDetail';
import { getMaxStats } from '~/redux/selectors/cachedDataSelectors';

const mapStateToProps = state => ({ maxStats: getMaxStats(state) });
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(CardDetailScreen);
