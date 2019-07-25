import { connect } from 'react-redux';
import IdolNameRow from './IdolNameRow';
import { getIdols } from '~/redux/selectors/cachedDataSelectors';

const mapStateToProps = state => ({ idols: getIdols(state) });
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(IdolNameRow);
