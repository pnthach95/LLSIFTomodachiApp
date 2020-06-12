import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

import UserContext from '~/Context/UserContext';
import styles from '~/Theme/RowStyles';

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
function SubUnitRow({ idolSubUnit, selectSubUnit }) {
  const { state } = useContext(UserContext);

  return <View style={styles.pickerRow}>
    <View style={styles.leftView}>
      <Text>Sub unit</Text>
    </View>
    <View style={styles.flex2}>
      <RNPickerSelect onValueChange={selectSubUnit}
        items={state.cachedData.subUnits}
        hideIcon={true}
        style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
        placeholderTextColor={'black'}
        placeholder={{ label: 'All', value: 'All' }}
        value={idolSubUnit} />
    </View>
  </View>;
}

SubUnitRow.propTypes = {
  idolSubUnit: PropTypes.string.isRequired,
  selectSubUnit: PropTypes.func.isRequired,
};

export default SubUnitRow;
