import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { BooleanOrEmpty } from '~/Utils/types';

type RegionRowType = {
  japanOnly: BooleanOrEmpty;
  selectRegion: (japanOnly: BooleanOrEmpty) => void;
};

/**
 * Region Row (None, False, True)
 *
 * - `selectRegion`: Save `japanOnly` state
 * - `japanOnly` state from parent
 *
 */
const RegionRow: React.FC<RegionRowType> = ({ japanOnly, selectRegion }) => {
  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Region</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity
          onPress={() => selectRegion('')}
          style={[
            styles.textButton,
            styles.standardButton,
            japanOnly === '' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRegion('False')}
          style={[
            styles.textButton,
            styles.standardButton,
            japanOnly === 'False' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>EN Only</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRegion('True')}
          style={[
            styles.textButton,
            styles.standardButton,
            japanOnly === 'True' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>JP Only</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegionRow;
