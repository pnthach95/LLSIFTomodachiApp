import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { FCSelectionProps, YearType } from '~/Utils/types';

/**
 * Year Row (None, First, Second, Third)
 */
const YearRow: React.FC<FCSelectionProps<YearType>> = ({ value, setValue }) => {
  const none = () => setValue('');
  const first = () => setValue('First');
  const second = () => setValue('Second');
  const third = () => setValue('Third');

  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Year</Text>
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
          onPress={first}
          style={[
            styles.textButton,
            styles.standardButton,
            value === 'First' && styles.selectedValue,
          ]}>
          <Text>1st</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={second}
          style={[
            styles.textButton,
            styles.standardButton,
            value === 'Second' && styles.selectedValue,
          ]}>
          <Text>2nd</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={third}
          style={[
            styles.textButton,
            styles.standardButton,
            value === 'Third' && styles.selectedValue,
          ]}>
          <Text>3rd</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

YearRow.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.any,
};

export default YearRow;
