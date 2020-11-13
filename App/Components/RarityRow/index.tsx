import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type { FCSelectionProps, RarityType } from '~/Utils/types';

/**
 * Rarity Row (None, N, R, SR, SSR, UR)
 */
const RarityRow: React.FC<FCSelectionProps<RarityType>> = ({
  value,
  setValue,
}) => {
  const none = () => setValue('');
  const n = () => setValue('N');
  const r = () => setValue('R');
  const sr = () => setValue('SR');
  const ssr = () => setValue('SSR');
  const ur = () => setValue('UR');

  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>Rarity</Text>
      </View>
      <View style={rowStyles.rightView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableRipple
            onPress={none}
            style={[
              rowStyles.standardButton,
              value === '' && rowStyles.selectedValue1,
            ]}>
            <Image source={Images.empty} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={n}
            style={[
              rowStyles.standardButton,
              value === 'N' && rowStyles.selectedValue1,
            ]}>
            <Image source={Images.rarity[0]} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={r}
            style={[
              rowStyles.standardButton,
              value === 'R' && rowStyles.selectedValue1,
            ]}>
            <Image source={Images.rarity[1]} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={sr}
            style={[
              rowStyles.standardButton,
              value === 'SR' && rowStyles.selectedValue1,
            ]}>
            <Image source={Images.rarity[2]} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={ssr}
            style={[
              rowStyles.standardButton,
              value === 'SSR' && rowStyles.selectedValue1,
            ]}>
            <Image source={Images.rarity[3]} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={ur}
            style={[
              rowStyles.standardButton,
              value === 'UR' && rowStyles.selectedValue1,
            ]}>
            <Image source={Images.rarity[4]} style={rowStyles.buttonImage} />
          </TouchableRipple>
        </ScrollView>
      </View>
    </View>
  );
};

RarityRow.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.any,
};

export default RarityRow;
