import React from 'react';
import PropTypes from 'prop-types';
import { View, TextStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { Fonts, AppStyles } from '~/Theme';

type TextRowType = {
  item1: {
    flex: number;
    text: string;
    textStyle?: TextStyle;
  };
  item2: {
    flex: number;
    text: string | number;
    textStyle?: TextStyle;
    onPress?: () => void;
  };
};

/**
 * TextRow
 */
const TextRow: React.FC<TextRowType> = ({ item1, item2 }) => {
  return (
    <View style={AppStyles.row}>
      <View style={{ flex: item1.flex }}>
        <Text style={[Fonts.style.normal, item1.textStyle]}>{item1.text}</Text>
      </View>
      <View style={{ flex: item2.flex }}>
        <Text
          onPress={item2.onPress}
          style={[Fonts.style.normal, item2.textStyle]}>
          {item2.text}
        </Text>
      </View>
    </View>
  );
};

TextRow.propTypes = {
  item1: PropTypes.any,
  item2: PropTypes.any
};

export default TextRow;
