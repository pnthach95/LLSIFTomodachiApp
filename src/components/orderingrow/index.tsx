import {MaterialDesignIcons} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {View} from 'react-native';
import {useModal} from 'react-native-modalfy';
import type {ModalStackParamList} from 'typings/modalfy';

type Props = {
  list: LVObject<string>[];
  onSelect: (item: string) => void;
  selectedItem: string | undefined;
  toggleReverse: () => void;
  isReverse: boolean;
};

/** Ordering Row */
const OrderingRow = ({
  isReverse,
  list,
  onSelect,
  selectedItem,
  toggleReverse,
}: Props) => {
  const {openModal} = useModal<ModalStackParamList>();

  const openList = () => {
    openModal('list', {
      title: 'Ordering',
      selectedItem,
      objectData: list,
      onPress: onSelect,
    });
  };

  const findLabel = list.find(i => i.value === selectedItem)?.label || '';

  return (
    <>
      <View className="flex-row">
        <View className="my-2.5 flex-1 justify-center">
          <Text>Ordering</Text>
        </View>
        <PressableFeedback className="flex-2" onPress={openList}>
          <View className="m-2.5 flex-row items-center justify-between">
            <Text>{findLabel}</Text>
            <MaterialDesignIcons name="menu-down" size={20} />
          </View>
        </PressableFeedback>
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
