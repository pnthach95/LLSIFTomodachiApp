import {MaterialDesignIcons} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {View} from 'react-native';
import {useModal} from 'react-native-modalfy';
import type {ModalStackParamList} from 'typings/modalfy';

type Props = {
  name: string;
  value: string;
  list: string[];
  onSelect: (name: string) => void;
};

/** Idol Name Row */
const PickerRow = ({name, value, list, onSelect}: Props) => {
  const {openModal} = useModal<ModalStackParamList>();

  const openList = () => {
    openModal('list', {
      title: name,
      data: list,
      onPress: onSelect,
      selectedItem: value,
    });
  };

  return (
    <View className="flex-row">
      <View className="my-2.5 flex-1 justify-center">
        <Text>{name}</Text>
      </View>
      <PressableFeedback className="flex-2" onPress={openList}>
        <View className="m-2.5 flex-row items-center justify-between">
          <Text>{value}</Text>
          <MaterialDesignIcons name="menu-down" size={20} />
        </View>
      </PressableFeedback>
    </View>
  );
};

export default PickerRow;
