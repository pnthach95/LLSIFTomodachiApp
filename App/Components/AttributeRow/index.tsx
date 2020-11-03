import React from 'react';
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
import type { AttributeType } from '~/Utils/type';

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
            ]}
          >
            <Image source={Images.empty} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAttribute('Smile')}
            style={[
              rowStyles.standardButton,
              attribute === 'Smile' && rowStyles.selectedValue1
            ]}
          >
            <Image source={Images.attribute[0]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAttribute('Pure')}
            style={[
              rowStyles.standardButton,
              attribute === 'Pure' && rowStyles.selectedValue1
            ]}
          >
            <Image source={Images.attribute[1]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAttribute('Cool')}
            style={[
              rowStyles.standardButton,
              attribute === 'Cool' && rowStyles.selectedValue1
            ]}
          >
            <Image source={Images.attribute[2]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => selectAttribute('All')}
            style={[
              rowStyles.standardButton,
              attribute === 'All' && rowStyles.selectedValue1
            ]}
          >
            <Image source={Images.attribute[3]} style={rowStyles.buttonImage} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  zeroPaddingLeft: { paddingLeft: 0 }
});

export default AttributeRow;
