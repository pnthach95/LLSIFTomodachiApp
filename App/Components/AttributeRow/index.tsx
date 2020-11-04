import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type { AttributeType } from '~/Utils/types';

type AttributeRowType = {
  attribute: AttributeType;
  selectAttribute: (attribute: AttributeType) => void;
};

/**
 * Attribute Row (None, Smile, Pure, Cool, All)
 */
const AttributeRow: React.FC<AttributeRowType> = ({
  attribute,
  selectAttribute
}) => {
  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>Attribute</Text>
      </View>
      <View style={rowStyles.rightView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => selectAttribute('')}
            style={[
              rowStyles.standardButton,
              styles.zeroPaddingLeft,
              attribute === '' && rowStyles.selectedValue1
            ]}>
            <Image source={Images.empty} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAttribute('Smile')}
            style={[
              rowStyles.standardButton,
              attribute === 'Smile' && rowStyles.selectedValue1
            ]}>
            <Image
              source={Images.attribute.Smile}
              style={rowStyles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAttribute('Pure')}
            style={[
              rowStyles.standardButton,
              attribute === 'Pure' && rowStyles.selectedValue1
            ]}>
            <Image
              source={Images.attribute.Pure}
              style={rowStyles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAttribute('Cool')}
            style={[
              rowStyles.standardButton,
              attribute === 'Cool' && rowStyles.selectedValue1
            ]}>
            <Image
              source={Images.attribute.Cool}
              style={rowStyles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAttribute('All')}
            style={[
              rowStyles.standardButton,
              attribute === 'All' && rowStyles.selectedValue1
            ]}>
            <Image
              source={Images.attribute.All}
              style={rowStyles.buttonImage}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zeroPaddingLeft: { paddingLeft: 0 }
});

AttributeRow.propTypes = {
  attribute: PropTypes.any,
  selectAttribute: PropTypes.any
};

export default AttributeRow;
