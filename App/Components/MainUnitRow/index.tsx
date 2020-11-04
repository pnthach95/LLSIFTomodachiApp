import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import styles from '~/Theme/RowStyles';
import type { MainUnitNames } from '~/Utils/types';

type MainUnitRowType = {
  mainUnit: MainUnitNames;
  selectMainUnit: (mainUnit: MainUnitNames) => void;
};

/**
 * Main Unit Row (None, μ's, Aqours)
 *
 * Prop:
 * - `selectMainUnit`: Save `mainUnit` state
 * - `mainUnit`: state from parent
 *
 */
const MainUnitRow: React.FC<MainUnitRowType> = ({
  mainUnit,
  selectMainUnit
}) => {
  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Main unit</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity
          onPress={() => selectMainUnit('')}
          style={[
            styles.textButton,
            styles.standardButton,
            mainUnit === '' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectMainUnit(`μ's`)}
          style={[
            styles.standardButton,
            mainUnit === "μ's" && styles.selectedValue1
          ]}>
          <Image source={Images.mainUnit["μ's"]} style={styles.buttonImage1} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectMainUnit('Aqours')}
          style={[
            styles.standardButton,
            mainUnit === 'Aqours' && styles.selectedValue1
          ]}>
          <Image source={Images.mainUnit.Aqours} style={styles.buttonImage1} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainUnitRow;
