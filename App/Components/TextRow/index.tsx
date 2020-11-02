import React from 'react';
import { View, ViewProps } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts, ApplicationStyles } from '~/Theme';

type TextRowType = {
  item1: {
    flex: number;
    text: string;
    textStyle: ViewProps;
  };
  item2: {
    flex: number;
    text: string;
    textStyle: ViewProps;
    onPress: () => void;
  };
};

/**
 * TextRow
 *
 * Prop:
 * - item1: {text, flex, textStyle}
 * - item2: {text, flex, textStyle, onPress}
 *
 */
const TextRow: React.FC<TextRowType> = ({ item1, item2 }) => {
  return <View style={ApplicationStyles.row}>
    <View style={{ flex: item1.flex }}>
      <Text style={[Fonts.style.normal, item1.textStyle]}>
        {item1.text}
      </Text>
    </View>
    <View style={{ flex: item2.flex }}>
      <Text onPress={item2.onPress}
        style={[Fonts.style.normal, item2.textStyle]}>
        {item2.text}
      </Text>
    </View>
  </View>;
};

export default TextRow;
