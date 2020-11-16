import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, FlatList } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { Images, AppStyles } from '~/Theme';
import rowStyles from '~/Theme/RowStyles';
import type { FCSelectionProps } from '~/Utils/types';

/**
 * Selection Row with Image
 */
const ImgSelectionRow: React.FC<FCSelectionProps> = ({
  title,
  data,
  value,
  setValue,
}) => {
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

ImgSelectionRow.propTypes = {
  title: PropTypes.any,
  data: PropTypes.any,
  value: PropTypes.any,
  setValue: PropTypes.any,
};

export default ImgSelectionRow;
