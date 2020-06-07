import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

import UserContext from '~/Context/UserContext';
import styles from '~/Theme/RowStyles';

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
function SchoolRow({ idolSchool, selectSchool }) {
  const { state } = useContext(UserContext);

  return <View style={styles.pickerRow}>
    <View style={styles.leftView}>
      <Text>School</Text>
    </View>
    <View style={styles.flex2}>
      <RNPickerSelect onValueChange={selectSchool}
        items={state.cachedData.schools}
        hideIcon={true}
        style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
        placeholderTextColor={'black'}
        placeholder={{ label: 'All', value: 'All' }}
        value={idolSchool} />
    </View>
  </View>;
}

SchoolRow.propTypes = {
  idolSchool: PropTypes.string.isRequired,
  selectSchool: PropTypes.func.isRequired,
};

export default SchoolRow;
