import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PropTypes from 'prop-types';

import UserContext from '~/Context/UserContext';
import styles from '~/Theme/RowStyles';

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
function IdolNameRow({ name, selectIdol }) {
  const { state } = useContext(UserContext);

  return <View style={styles.pickerRow}>
    <View style={styles.leftView}>
      <Text>Idol</Text>
    </View>
    <View style={styles.flex2}>
      <RNPickerSelect onValueChange={selectIdol}
        items={state.cachedData.idols}
        hideIcon={true}
        style={{ inputIOS: styles.picker, inputAndroid: styles.picker }}
        placeholderTextColor={'black'}
        placeholder={{ label: 'All', value: 'All' }}
        value={name} />
    </View>
  </View>;
}

IdolNameRow.propTypes = {
  name: PropTypes.string.isRequired,
  selectIdol: PropTypes.func.isRequired,
};

export default IdolNameRow;
