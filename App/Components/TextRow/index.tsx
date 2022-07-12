import React from 'react';
import {View} from 'react-native';
import {Paragraph} from 'react-native-paper';
import {AppStyles} from '~/Theme';
import type {TextStyle} from 'react-native';

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
const TextRow = ({item1, item2}: Props) => {
  const style1 = {flex: item1.flex};
  const style2 = {flex: item2.flex};
  return (
    <View style={AppStyles.row}>
      <View style={style1}>
        <Paragraph style={item1.textStyle}>{item1.text}</Paragraph>
      </View>
      <View style={style2}>
        <Paragraph style={item2.textStyle} onPress={item2.onPress}>
          {item2.text}
        </Paragraph>
      </View>
    </View>
  );
};

export default TextRow;
