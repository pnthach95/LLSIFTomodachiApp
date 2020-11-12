import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { BooleanOrEmpty } from '~/Utils/types';

type RegionRowType = {
  japanOnly: BooleanOrEmpty;
  selectRegion: (japanOnly: BooleanOrEmpty) => void;
};

/**
 * Region Row (None, False, True)
 */
const RegionRow: React.FC<RegionRowType> = ({ japanOnly, selectRegion }) => {
  const none = () => selectRegion('');
  const sFalse = () => selectRegion('False');
  const sTrue = () => selectRegion('True');

  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Region</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableRipple
          onPress={none}
          style={[
            styles.textButton,
            styles.standardButton,
            japanOnly === '' && styles.selectedValue
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sFalse}
          style={[
            styles.textButton,
            styles.standardButton,
            japanOnly === 'False' && styles.selectedValue
          ]}>
          <Text>EN Only</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sTrue}
          style={[
            styles.textButton,
            styles.standardButton,
            japanOnly === 'True' && styles.selectedValue
          ]}>
          <Text>JP Only</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

RegionRow.propTypes = {
  japanOnly: PropTypes.any,
  selectRegion: PropTypes.any
};

export default RegionRow;
