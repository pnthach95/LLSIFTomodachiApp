import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '~/Theme/RowStyles';
import { ApplicationStyles } from '~/Theme';
import { BooleanOrEmpty } from '~/Utils/type';

type SpecialCardRowType = {
  isSpecial: BooleanOrEmpty,
  selectSpecial: (isSpecial: BooleanOrEmpty) => void,
};

/**
 * Special Card Row (None, True, False)
 *
 * Prop:
 * - `selectSpecial`: Save `isSpecial` state
 * - `isSpecial`: state from parent
 *
 */
const SpecialCardRow: React.FC<SpecialCardRowType> = ({ isSpecial, selectSpecial }) => {
  return <View style={ApplicationStyles.row}>
    <View style={styles.leftView}>
      <Text>Special card</Text>
    </View>
    <View style={styles.rightView}>
      <TouchableOpacity onPress={() => selectSpecial('')}
        style={[
          styles.textButton,
          styles.standardButton,
          isSpecial === '' && styles.selectedValue,
        ]}>
        <Text style={styles.buttonText}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectSpecial('True')}
        style={[
          styles.textButton,
          styles.standardButton,
          isSpecial === 'True' && styles.selectedValue,
        ]}>
        <Text style={styles.buttonText}>Only</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectSpecial('False')}
        style={[
          styles.textButton,
          styles.standardButton,
          isSpecial === 'False' && styles.selectedValue,
        ]}>
        <Text style={styles.buttonText}>None</Text>
      </TouchableOpacity>
    </View>
  </View>;
};

export default SpecialCardRow;
