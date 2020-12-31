import React from 'react';
import { View, Image, FlatList } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';

import type { FCSelectionProps } from '~/typings';

/**
 * Selection Row with Image
 */
const ImgSelectionRow = ({
  title,
  data,
  value,
  setValue,
}: FCSelectionProps): JSX.Element => {
  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>{title}</Text>
      </View>
      <View style={rowStyles.rightView}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `${index}${item}`}
          renderItem={({ item }) => {
            const onPress = () => setValue(item);
            return (
              <TouchableRipple
                onPress={onPress}
                style={[
                  rowStyles.standardButton,
                  value === item && rowStyles.selectedValue1,
                ]}>
                <Image
                  source={Images.multi[item]}
                  style={rowStyles.buttonImage}
                />
              </TouchableRipple>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ImgSelectionRow;
