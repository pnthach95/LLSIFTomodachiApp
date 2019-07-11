import { connect } from 'react-redux';
import SchoolRow from './SchoolRow';
import { getSchools } from '~/redux/selectors/cachedDataSelectors';

const mapStateToProps = state => ({ schools: getSchools(state) });
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(SchoolRow);
