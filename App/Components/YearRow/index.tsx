import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import styles from '~/Theme/RowStyles';
import { AppStyles } from '~/Theme';
import { YearType } from '~/Utils/type';

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
  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Year</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity
          onPress={() => selectYear('')}
          style={[
            styles.textButton,
            styles.standardButton,
            idolYear === '' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectYear('First')}
          style={[
            styles.textButton,
            styles.standardButton,
            idolYear === 'First' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>1st</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectYear('Second')}
          style={[
            styles.textButton,
            styles.standardButton,
            idolYear === 'Second' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>2nd</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectYear('Third')}
          style={[
            styles.textButton,
            styles.standardButton,
            idolYear === 'Third' && styles.selectedValue
          ]}
        >
          <Text style={styles.buttonText}>3rd</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YearRow;
