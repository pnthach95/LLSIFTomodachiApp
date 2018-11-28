import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSkills } from '../../Stores/CachedData/Selectors';
import styles from '../../Theme/RowStyles';

/**
 * Skill Row.
 * 
 * Skill list in `this.props.skills`.
 * 
 * Prop:
 * - `selectSkill`: Save `skill` state
 * - `skill`: state from parent
 * 
 * @export
 * @class SkillRow
 * @extends {React.Component}
 */
class SkillRow extends React.Component {
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.leftView}>
          <Text>Skill</Text>
        </View>
        <View style={{ flex: 2 }}>
          <RNPickerSelect onValueChange={this.props.selectSkill}
            items={this.props.skills}
            placeholder={{ label: 'All', value: 'All' }}
            value={this.props.skill} />
        </View>
      </View>
    );
  }
}

SkillRow.propTypes = {
  skill: PropTypes.string.isRequired,
  selectSkill: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({ skills: getSkills(state) });
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SkillRow);
