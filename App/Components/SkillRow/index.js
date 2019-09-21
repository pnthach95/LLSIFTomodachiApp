import { connect } from 'react-redux';
import SkillRow from './SkillRow';
import { getSkills } from '~/redux/selectors/cachedDataSelectors';

const mapStateToProps = (state) => ({ skills: getSkills(state) });
const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(SkillRow);
