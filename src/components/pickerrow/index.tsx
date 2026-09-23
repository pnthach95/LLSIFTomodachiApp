import {Select} from 'heroui-native/select';
import {Typography} from 'heroui-native/text';
import {FlatList, View} from 'react-native';

type Props = {
  name: string;
  value: string;
  list: string[];
  onSelect: (name: string) => void;
};

/** Idol Name Row */
const PickerRow = ({name, value, list, onSelect}: Props) => {
  return (
    <View className="flex-row items-center">
      <View className="flex-1">
        <Typography>{name}</Typography>
      </View>
      <Select
        className="flex-2"
        presentation="popover"
        value={{label: value, value}}
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
                <Select.Item label={item} value={item}>
                  <Select.ItemLabel />
                </Select.Item>
              )}
            />
          </Select.Content>
        </Select.Portal>
      </Select>
    </View>
  );
};

export default PickerRow;
