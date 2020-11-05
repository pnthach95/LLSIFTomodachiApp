import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import type { BooleanOrEmpty } from '~/Utils/types';

type PromoCardRowType = {
  isPromo: BooleanOrEmpty;
  selectPromo: (isPromo: BooleanOrEmpty) => void;
};

/**
 * Promo Card Row (None, True, False)
 *
 * Prop:
 * - `selectPromo`: Save `isPromo` state
 * - `isPromo`: state from parent
 *
 */
const PromoCardRow: React.FC<PromoCardRowType> = ({ isPromo, selectPromo }) => {
  const none = () => selectPromo('');
  const sTrue = () => selectPromo('True');
  const sFalse = () => selectPromo('False');

  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Promo card</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableRipple
          onPress={none}
          style={[
            styles.textButton,
            styles.standardButton,
            isPromo === '' && styles.selectedValue
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sTrue}
          style={[
            styles.textButton,
            styles.standardButton,
            isPromo === 'True' && styles.selectedValue
          ]}>
          <Text>Only</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={sFalse}
          style={[
            styles.textButton,
            styles.standardButton,
            isPromo === 'False' && styles.selectedValue
          ]}>
          <Text>None</Text>
        </TouchableRipple>
      </View>
    </View>
  );
};

PromoCardRow.propTypes = {
  isPromo: PropTypes.any,
  selectPromo: PropTypes.any
};

export default PromoCardRow;
