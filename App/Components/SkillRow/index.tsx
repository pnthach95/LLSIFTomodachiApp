import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import UserContext from '~/Context/UserContext';
import styles from '~/Theme/RowStyles';

type SkillRowType = {
  skill: string,
  selectSkill: () => void,
};

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
const SkillRow: React.FC<SkillRowType> = ({ skill, selectSkill }) => {
  const { state } = useContext(UserContext);

  return <View style={styles.pickerRow}>
    <View style={styles.leftView}>
      <Text>Skill</Text>
    </View>
    <View style={styles.flex2}>
      <RNPickerSelect onValueChange={selectSkill}
        items={state.cachedData.skills}
        style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
        placeholder={{ label: 'All', value: 'All' }}
        value={skill} />
    </View>
  </View>;
};

export default SkillRow;
