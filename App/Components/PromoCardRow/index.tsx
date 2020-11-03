import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import { BooleanOrEmpty } from '~/Utils/type';

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
  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Promo card</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity
          onPress={() => selectPromo('')}
          style={[
            styles.textButton,
            styles.standardButton,
            isPromo === '' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectPromo('True')}
          style={[
            styles.textButton,
            styles.standardButton,
            isPromo === 'True' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>Only</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectPromo('False')}
          style={[
            styles.textButton,
            styles.standardButton,
            isPromo === 'False' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>None</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromoCardRow;
