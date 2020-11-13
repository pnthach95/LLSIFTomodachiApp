import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import styles from '~/Theme/RowStyles';
import type { MainUnitNames } from '~/Utils/types';

type Props = {
  mainUnit: MainUnitNames;
  selectMainUnit: (mainUnit: MainUnitNames) => void;
};

/**
 * Main Unit Row (None, μ's, Aqours)
 *
 * Prop:
 * - `selectMainUnit`: Save `mainUnit` state
 * - `mainUnit`: state from parent
 */
const MainUnitRow: React.FC<Props> = ({ mainUnit, selectMainUnit }) => {
  const none = () => selectMainUnit('');
  const muse = () => selectMainUnit(`μ's`);
  const aqours = () => selectMainUnit('Aqours');

  return (
    <View style={AppStyles.row}>
      <View style={styles.leftView}>
        <Text>Main unit</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableRipple
          onPress={none}
          style={[
            styles.textButton,
            styles.standardButton,
            mainUnit === '' && styles.selectedValue,
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={muse}
          style={[
            styles.standardButton,
            mainUnit === "μ's" && styles.selectedValue1,
          ]}>
          <Image source={Images.mainUnit["μ's"]} style={styles.buttonImage1} />
        </TouchableRipple>
        <TouchableRipple
          onPress={aqours}
          style={[
            styles.standardButton,
            mainUnit === 'Aqours' && styles.selectedValue1,
          ]}>
          <Image source={Images.mainUnit.Aqours} style={styles.buttonImage1} />
        </TouchableRipple>
      </View>
    </View>
  );
};

MainUnitRow.propTypes = {
  mainUnit: PropTypes.any,
  selectMainUnit: PropTypes.any,
};

export default MainUnitRow;
