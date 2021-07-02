import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { AppStyles } from '~/Theme';

import type { TextStyle } from 'react-native';

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
  const style1 = { flex: item1.flex };
  const style2 = { flex: item2.flex };
  return (
    <View style={AppStyles.row}>
      <View style={style1}>
        <Paragraph style={item1.textStyle}>{item1.text}</Paragraph>
      </View>
      <View style={style2}>
        <Paragraph onPress={item2.onPress} style={item2.textStyle}>
          {item2.text}
        </Paragraph>
      </View>
    </View>
  );
};

TextRow.propTypes = {
  item1: PropTypes.shape({
    flex: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    textStyle: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ).isRequired,
  }).isRequired,
  item2: PropTypes.shape({
    flex: PropTypes.number.isRequired,
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    textStyle: PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ).isRequired,
    onPress: PropTypes.func.isRequired,
  }).isRequired,
};

export default TextRow;
