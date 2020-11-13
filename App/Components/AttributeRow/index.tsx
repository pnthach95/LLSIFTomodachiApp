import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type { AttributeType, FCSelectionProps } from '~/Utils/types';

/**
 * Attribute Row (None, Smile, Pure, Cool, All)
 */
const AttributeRow: React.FC<FCSelectionProps<AttributeType>> = ({
  value,
  setValue,
}) => {
  const none = () => setValue('');
  const smile = () => setValue('Smile');
  const pure = () => setValue('Pure');
  const cool = () => setValue('Cool');
  const all = () => setValue('All');

  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>Attribute</Text>
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
            onPress={smile}
            style={[
              rowStyles.standardButton,
              value === 'Smile' && rowStyles.selectedValue1,
            ]}>
            <Image
              source={Images.attribute.Smile}
              style={rowStyles.buttonImage}
            />
          </TouchableRipple>
          <TouchableRipple
            onPress={pure}
            style={[
              rowStyles.standardButton,
              value === 'Pure' && rowStyles.selectedValue1,
            ]}>
            <Image
              source={Images.attribute.Pure}
              style={rowStyles.buttonImage}
            />
          </TouchableRipple>
          <TouchableRipple
            onPress={cool}
            style={[
              rowStyles.standardButton,
              value === 'Cool' && rowStyles.selectedValue1,
            ]}>
            <Image
              source={Images.attribute.Cool}
              style={rowStyles.buttonImage}
            />
          </TouchableRipple>
          <TouchableRipple
            onPress={all}
            style={[
              rowStyles.standardButton,
              value === 'All' && rowStyles.selectedValue1,
            ]}>
            <Image
              source={Images.attribute.All}
              style={rowStyles.buttonImage}
            />
          </TouchableRipple>
        </ScrollView>
      </View>
    </View>
  );
};

AttributeRow.propTypes = {
  value: PropTypes.any,
  setValue: PropTypes.any,
};

export default AttributeRow;
