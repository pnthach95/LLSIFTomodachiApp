import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { FCSelectionProps, BooleanOrEmpty } from '~/Utils/types';

/**
 * Special Card Row (None, True, False)
 */
const SpecialCardRow: React.FC<FCSelectionProps<BooleanOrEmpty>> = ({
  value,
  setValue,
}) => {
  const none = () => setValue('');
  const sTrue = () => setValue('True');
  const sFalse = () => setValue('False');

  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Special card</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableRipple
          onPress={none}
          style={[
            styles.textButton,
            styles.standardButton,
            value === '' && styles.selectedValue,
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sTrue}
          style={[
            styles.textButton,
            styles.standardButton,
            value === 'True' && styles.selectedValue,
          ]}>
          <Text>Only</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sFalse}
          style={[
            styles.textButton,
            styles.standardButton,
            value === 'False' && styles.selectedValue,
          ]}>
          <Text>None</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

SpecialCardRow.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.any,
};

export default SpecialCardRow;
