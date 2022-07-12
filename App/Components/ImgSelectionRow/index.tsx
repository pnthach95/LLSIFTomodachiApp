import React from 'react';
import {FlatList, Image, View} from 'react-native';
import {Text, TouchableRipple} from 'react-native-paper';
import {AppStyles, Images} from '~/Theme';
import rowStyles from '~/Theme/RowStyles';

/**
 * Selection Row with Image
 */
const ImgSelectionRow = ({title, data, value, setValue}: FCSelectionProps) => {
  return (
    <View style={AppStyles.row}>
      <View style={rowStyles.leftView}>
        <Text>{title}</Text>
      </View>
      <View style={rowStyles.rightView}>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, index) => `${index}${item}`}
          renderItem={({item}) => {
            const onPress = () => setValue(item);
            return (
              <TouchableRipple
                style={[
                  rowStyles.standardButton,
                  value === item && rowStyles.selectedValue1,
                ]}
                onPress={onPress}>
                <Image
                  source={Images.multi[item]}
                  style={rowStyles.buttonImage}
                />
              </TouchableRipple>
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ImgSelectionRow;
