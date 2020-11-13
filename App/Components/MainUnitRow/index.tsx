import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import styles from '~/Theme/RowStyles';
import type { FCSelectionProps, MainUnitNames } from '~/Utils/types';

/**
 * Main Unit Row (None, μ's, Aqours)
 */
const MainUnitRow: React.FC<FCSelectionProps<MainUnitNames>> = ({
  value,
  setValue,
}) => {
  const none = () => setValue('');
  const muse = () => setValue(`μ's`);
  const aqours = () => setValue('Aqours');

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
            value === '' && styles.selectedValue,
          ]}>
          <Text>All</Text>
        </TouchableRipple>
        <TouchableRipple
          onPress={muse}
          style={[
            styles.standardButton,
            value === "μ's" && styles.selectedValue1,
          ]}>
          <Image source={Images.mainUnit["μ's"]} style={styles.buttonImage1} />
        </TouchableRipple>
        <TouchableRipple
          onPress={aqours}
          style={[
            styles.standardButton,
            value === 'Aqours' && styles.selectedValue1,
          ]}>
          <Image source={Images.mainUnit.Aqours} style={styles.buttonImage1} />
        </TouchableRipple>
      </View>
    </View>
  );
};

MainUnitRow.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.any,
};

export default MainUnitRow;
