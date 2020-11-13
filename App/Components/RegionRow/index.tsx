import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import rowStyles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { FCSelectionProps, BooleanOrEmpty } from '~/Utils/types';

/**
 * Region Row (None, False, True)
 */
const RegionRow: React.FC<FCSelectionProps<BooleanOrEmpty>> = ({
  value,
  setValue,
}) => {
  const none = () => setValue('');
  const sFalse = () => setValue('False');
  const sTrue = () => setValue('True');

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
            value === '' && rowStyles.selectedValue,
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sFalse}
          style={[
            rowStyles.textButton,
            rowStyles.standardButton,
            value === 'False' && rowStyles.selectedValue,
          ]}>
          <Text>EN Only</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sTrue}
          style={[
            rowStyles.textButton,
            rowStyles.standardButton,
            value === 'True' && rowStyles.selectedValue,
          ]}>
          <Text>JP Only</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

RegionRow.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.any,
};

export default RegionRow;
