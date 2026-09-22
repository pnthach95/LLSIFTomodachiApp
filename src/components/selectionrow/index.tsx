import {TagGroup} from 'heroui-native/tag-group';
import {Typography as Text} from 'heroui-native/text';
import {View} from 'react-native';

type Props = {
  title: string;
  value: CombinedWithBOE;
  setValue: (value: CombinedWithBOE) => void;
  data: LVObject<CombinedWithBOE>[];
};

/**
 * Boolean or empty selection row
 */
const SelectionRow = ({title, value, setValue, data}: Props) => {
  return (
    <View className="flex-row">
      <View className="my-2.5 flex-1 justify-center">
        <Text>{title}</Text>
      </View>
      <TagGroup
        className="flex-2"
        selectedKeys={new Set([value])}
        selectionMode="single"
        onSelectionChange={v => {
          if (v.size > 0) {
            setValue([...v][0] as CombinedWithBOE);
          }
        }}>
        <TagGroup.List>
          {data.map(d => (
            <TagGroup.Item key={d.value} id={d.value}>
              <TagGroup.ItemLabel>{d.label}</TagGroup.ItemLabel>
            </TagGroup.Item>
          ))}
        </TagGroup.List>
      </TagGroup>
    </View>
  );
};

export default SelectionRow;
