import {MaterialDesignIcons} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Select} from 'heroui-native/select';
import {Typography as Text} from 'heroui-native/text';
import {FlatList, View} from 'react-native';

type Props = {
  list: LVObject<string>[];
  onSelect: (item: string) => void;
  value: string | undefined;
  toggleReverse: () => void;
  isReverse: boolean;
};

/** Ordering Row */
const OrderingRow = ({
  isReverse,
  list,
  onSelect,
  value,
  toggleReverse,
}: Props) => {
  const findLabel = list.find(i => i.value === value)?.label || '';

  return (
    <>
      <View className="flex-row">
        <View className="my-2.5 flex-1 justify-center">
          <Text>Ordering</Text>
        </View>
        <Select
          className="flex-2"
          presentation="popover"
          value={value ? {value, label: findLabel} : undefined}
          onValueChange={d => {
            if (d) {
              onSelect(d.value);
            }
          }}>
          <Select.Trigger>
            <Select.Value placeholder="" />
            <Select.TriggerIndicator />
          </Select.Trigger>
          <Select.Portal>
            <Select.Overlay />
            <Select.Content
              className="h-96"
              presentation="popover"
              width="trigger">
              <FlatList
                data={list}
                renderItem={({item}) => (
                  <Select.Item label={item.label} value={item.value}>
                    <Select.ItemLabel />
                  </Select.Item>
                )}
              />
            </Select.Content>
          </Select.Portal>
        </Select>
      </View>
      <View className="flex-row">
        <View className="my-2.5 flex-1 justify-center" />
        <PressableFeedback className="flex-2" onPress={toggleReverse}>
          <View className="flex-row gap-2 p-2.5">
            <MaterialDesignIcons
              colorClassName="accent-success"
              name={isReverse ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={20}
            />
            <Text>Reverse order</Text>
          </View>
        </PressableFeedback>
      </View>
    </>
  );
};

export default OrderingRow;
