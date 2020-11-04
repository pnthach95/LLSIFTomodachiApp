import React, { useContext } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import UserContext from '~/Context/UserContext';
import styles from '~/Theme/RowStyles';

type SchoolRowType = {
  idolSchool: string;
  selectSchool: () => void;
};

/**
 * School Row.
 *
 * School list in `this.props.schools`.
 *
 * Prop:
 * - `selectSchool`: Save `idolSchool` state
 * - `idolSchool`: state from parent
 *
 */
const SchoolRow: React.FC<SchoolRowType> = ({ idolSchool, selectSchool }) => {
  const { state } = useContext(UserContext);

  return (
    <View style={styles.pickerRow}>
      <View style={styles.leftView}>
        <Text>School</Text>
      </View>
      <View style={styles.flex2}>
        <RNPickerSelect
          onValueChange={selectSchool}
          items={state.cachedData.schools}
          style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
          placeholder={{ label: 'All', value: 'All' }}
          value={idolSchool}
        />
      </View>
    </View>
  );
};

export default SchoolRow;
