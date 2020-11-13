import React from 'react';
import PropTypes from 'prop-types';
import { View, TextStyle } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { AppStyles } from '~/Theme';

type Props = {
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
const TextRow: React.FC<Props> = ({ item1, item2 }) => {
  return (
    <View style={AppStyles.row}>
      <View style={{ flex: item1.flex }}>
        <Paragraph style={item1.textStyle}>{item1.text}</Paragraph>
      </View>
      <View style={{ flex: item2.flex }}>
        <Paragraph onPress={item2.onPress} style={item2.textStyle}>
          {item2.text}
        </Paragraph>
      </View>
    </View>
  );
};

TextRow.propTypes = {
  item1: PropTypes.any,
  item2: PropTypes.any,
};

export default TextRow;
