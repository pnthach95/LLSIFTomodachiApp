import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

import UserContext from '~/Context/UserContext';
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
 */
function SkillRow({ skill, selectSkill }) {
  const { state } = useContext(UserContext);

  return <View style={styles.pickerRow}>
    <View style={styles.leftView}>
      <Text>Skill</Text>
    </View>
    <View style={styles.flex2}>
      <RNPickerSelect onValueChange={selectSkill}
        items={state.cachedData.skills}
        hideIcon={true}
        style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
        placeholderTextColor={'black'}
        placeholder={{ label: 'All', value: 'All' }}
        value={skill} />
    </View>
  </View>;
}

SkillRow.propTypes = {
  skill: PropTypes.string.isRequired,
  selectSkill: PropTypes.func.isRequired,
};

export default SkillRow;
