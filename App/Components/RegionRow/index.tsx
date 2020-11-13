import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import rowStyles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { BooleanOrEmpty } from '~/Utils/types';

type Props = {
  japanOnly: BooleanOrEmpty;
  selectRegion: (japanOnly: BooleanOrEmpty) => void;
};

/**
 * Region Row (None, False, True)
 */
const RegionRow: React.FC<Props> = ({ japanOnly, selectRegion }) => {
  const none = () => selectRegion('');
  const sFalse = () => selectRegion('False');
  const sTrue = () => selectRegion('True');

  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>Region</Text>
      </View>
      <View style={rowStyles.rightView}>
        <TouchableRipple
          onPress={none}
          style={[
            rowStyles.textButton,
            rowStyles.standardButton,
            japanOnly === '' && rowStyles.selectedValue,
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sFalse}
          style={[
            rowStyles.textButton,
            rowStyles.standardButton,
            japanOnly === 'False' && rowStyles.selectedValue,
          ]}>
          <Text>EN Only</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sTrue}
          style={[
            rowStyles.textButton,
            rowStyles.standardButton,
            japanOnly === 'True' && rowStyles.selectedValue,
          ]}>
          <Text>JP Only</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

RegionRow.propTypes = {
  japanOnly: PropTypes.any,
  selectRegion: PropTypes.any,
};

export default RegionRow;
