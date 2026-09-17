import {FlashList} from '@shopify/flash-list';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {View} from 'react-native';

type Props<T = CombinedWithBOE> = {
  title: string;
  value: T;
  setValue: (value: T) => void;
  data: LVObject<T>[];
};

const keyExtractor = (item: Props['data'][0], index: number): string =>
  `${index}${item.value}`;

/**
 * Boolean or empty selection row
 */
const SelectionRow = ({title, value, setValue, data}: Props) => {
  const renderItem = ({item}: {item: Props['data'][0]}) => {
    const onPress = () => setValue(item.value);

    return (
      <PressableFeedback
        className="my-0.75 mr-2.5 items-center justify-center rounded-[5px] px-1.75 py-0.75 data-[checked=true]:bg-success data-[checked=true]:px-2.5 data-[checked=true]:py-1.25"
        data-checked={value === item.value}
        onPress={onPress}>
        <Text>{item.label}</Text>
      </PressableFeedback>
    );
  };

  return (
    <View className="flex-row">
      <View className="my-2.5 flex-1 justify-center">
        <Text>{title}</Text>
      </View>
      <View className="flex-2 flex-row">
        <FlashList
          horizontal
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default SelectionRow;
