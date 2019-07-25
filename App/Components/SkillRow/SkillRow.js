import React from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';
import styles from '~/Theme/RowStyles';

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
export default class SkillRow extends React.Component {
  static propTypes = {
    skill: PropTypes.string.isRequired,
    selectSkill: PropTypes.func.isRequired,
    skills: PropTypes.any,
  };

  render() {
    return (
      <View style={styles.pickerRow}>
        <View style={styles.leftView}>
          <Text>Skill</Text>
        </View>
        <View style={styles.flex2}>
          <RNPickerSelect onValueChange={this.props.selectSkill}
            items={this.props.skills}
            hideIcon={true}
            style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
            placeholderTextColor={'black'}
            placeholder={{ label: 'All', value: 'All' }}
            value={this.props.skill} />
        </View>
      </View>
    );
  }
}
