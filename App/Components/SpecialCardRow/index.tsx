import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { BooleanOrEmpty } from '~/Utils/types';

type SpecialCardRowType = {
  isSpecial: BooleanOrEmpty;
  selectSpecial: (isSpecial: BooleanOrEmpty) => void;
};

/**
 * Special Card Row (None, True, False)
 *
 * Prop:
 * - `selectSpecial`: Save `isSpecial` state
 * - `isSpecial`: state from parent
 *
 */
const SpecialCardRow: React.FC<SpecialCardRowType> = ({
  isSpecial,
  selectSpecial
}) => {
  const none = () => selectSpecial('');
  const sTrue = () => selectSpecial('True');
  const sFalse = () => selectSpecial('False');

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
            isSpecial === '' && styles.selectedValue
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sTrue}
          style={[
            styles.textButton,
            styles.standardButton,
            isSpecial === 'True' && styles.selectedValue
          ]}>
          <Text>Only</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sFalse}
          style={[
            styles.textButton,
            styles.standardButton,
            isSpecial === 'False' && styles.selectedValue
          ]}>
          <Text>None</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

SpecialCardRow.propTypes = {
  isSpecial: PropTypes.any,
  selectSpecial: PropTypes.any
};

export default SpecialCardRow;
