import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import UserContext from '~/Context/UserContext';
import styles from '~/Theme/RowStyles';

type SubUnitRowType = {
  idolSubUnit: string;
  selectSubUnit: (idolSubUnit: string) => void;
};

/**
 * Sub Unit Row.
 *
 * Sub Unit list in `this.props.subUnits`.
 *
 * Prop:
 * - `selectSubUnit`: Save `idolSubUnit` state
 * - `idolSubUnit`: state from parent
 *
 */
const SubUnitRow: React.FC<SubUnitRowType> = ({
  idolSubUnit,
  selectSubUnit
}) => {
  const { state } = useContext(UserContext);

  return (
    <View style={styles.pickerRow}>
      <View style={styles.leftView}>
        <Text>Sub unit</Text>
      </View>
      <View style={styles.flex2}>
        <RNPickerSelect
          onValueChange={selectSubUnit}
          items={state.cachedData.subUnits}
          style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
          placeholder={{ label: 'All', value: 'All' }}
          value={idolSubUnit}
        />
      </View>
    </View>
  );
};

export default SubUnitRow;
