import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import UserContext from '~/Context/UserContext';
import styles from '~/Theme/RowStyles';

type IdolNameRow = {
  name: string;
  selectIdol: () => void;
};

/**
 * Idol Name Row.
 *
 * Idol list in `this.props.idols`.
 *
 * Prop:
 * - `selectIdol`: Save `name` state
 * - `name`: state from parent
 *
 */
const IdolNameRow: React.FC<IdolNameRow> = ({ name, selectIdol }) => {
  const { state } = useContext(UserContext);

  return (
    <View style={styles.pickerRow}>
      <View style={styles.leftView}>
        <Text>Idol</Text>
      </View>
      <View style={styles.flex2}>
        <RNPickerSelect
          onValueChange={selectIdol}
          items={state.cachedData.idols}
          style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
          placeholder={{ label: 'All', value: 'All' }}
          value={name}
        />
      </View>
    </View>
  );
};

export default IdolNameRow;
