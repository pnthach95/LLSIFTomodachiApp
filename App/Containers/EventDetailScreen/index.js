import { connect } from 'react-redux';
import EventDetailScreen from './EventDetail';
import { getWWEventInfo, getJPEventInfo } from '~/redux/selectors/cachedDataSelectors';

const mapStateToProps = state => ({
  wwEventInfo: getWWEventInfo(state),
  jpEventInfo: getJPEventInfo(state),
});

const mapDispatchToProps = null;
export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
