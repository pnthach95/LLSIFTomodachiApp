import {Label} from 'heroui-native/label';
import {Typography as Text} from 'heroui-native/text';
import {View} from 'react-native';
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
    <View className="flex-row">
      <View style={style1}>
        <Label style={item1.textStyle}>{item1.text}</Label>
      </View>
      <View style={style2}>
        <Text.Paragraph style={item2.textStyle} onPress={item2.onPress}>
          {item2.text}
        </Text.Paragraph>
      </View>
    </View>
  );
};

export default TextRow;
