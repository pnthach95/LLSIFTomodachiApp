import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { YearType } from '~/Utils/types';

type YearRowType = {
  idolYear: YearType;
  selectYear: (idolYear: YearType) => void;
};

/**
 * Year Row (None, First, Second, Third)
 *
 * Prop:
 * - `selectYear`: Save `idolYear` state
 * - `idolYear`: state from parent
 *
 */
const YearRow: React.FC<YearRowType> = ({ idolYear, selectYear }) => {
  const none = () => selectYear('');
  const first = () => selectYear('First');
  const second = () => selectYear('Second');
  const third = () => selectYear('Third');
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
            idolYear === '' && styles.selectedValue
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={first}
          style={[
            styles.textButton,
            styles.standardButton,
            idolYear === 'First' && styles.selectedValue
          ]}>
          <Text>1st</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={second}
          style={[
            styles.textButton,
            styles.standardButton,
            idolYear === 'Second' && styles.selectedValue
          ]}>
          <Text>2nd</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={third}
          style={[
            styles.textButton,
            styles.standardButton,
            idolYear === 'Third' && styles.selectedValue
          ]}>
          <Text>3rd</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

YearRow.propTypes = {
  idolYear: PropTypes.any,
  selectYear: PropTypes.any
};

export default YearRow;
