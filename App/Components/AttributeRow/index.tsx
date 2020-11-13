import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, ScrollView } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type { AttributeType } from '~/Utils/types';

type Props = {
  attribute: AttributeType;
  selectAttribute: (attribute: AttributeType) => void;
};

/**
 * Attribute Row (None, Smile, Pure, Cool, All)
 */
const AttributeRow: React.FC<Props> = ({ attribute, selectAttribute }) => {
  const none = () => selectAttribute('');
  const smile = () => selectAttribute('Smile');
  const pure = () => selectAttribute('Pure');
  const cool = () => selectAttribute('Cool');
  const all = () => selectAttribute('All');

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
              attribute === '' && rowStyles.selectedValue1,
            ]}>
            <Image source={Images.empty} style={rowStyles.buttonImage} />
          </TouchableRipple>
          <TouchableRipple
            onPress={smile}
            style={[
              rowStyles.standardButton,
              attribute === 'Smile' && rowStyles.selectedValue1,
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
              attribute === 'Pure' && rowStyles.selectedValue1,
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
              attribute === 'Cool' && rowStyles.selectedValue1,
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
              attribute === 'All' && rowStyles.selectedValue1,
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
  attribute: PropTypes.any,
  selectAttribute: PropTypes.any,
};

export default AttributeRow;
