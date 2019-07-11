import { connect } from 'react-redux';
import SubUnitRow from './SubUnitRow';
import { getSubunits } from '~/redux/selectors/cachedDataSelectors';

const mapStateToProps = state => ({ subUnits: getSubunits(state) });
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(SubUnitRow);
