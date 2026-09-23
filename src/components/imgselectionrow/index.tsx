import {Images} from 'assets';
import {TagGroup} from 'heroui-native/tag-group';
import {Typography as Text} from 'heroui-native/text';
import {Image, View} from 'react-native';

type Props = {
  title: string;
  data: readonly Combined[];
  value: Combined;
  setValue: (value: Combined) => void;
};

/**
 * Selection Row with Image
 */
const ImgSelectionRow = ({title, data, value, setValue}: Props) => {
  return (
    <View className="flex-row">
      <View className="my-2.5 flex-1 justify-center">
        <Text>{title}</Text>
      </View>
      <TagGroup
        className="flex-2"
        selectedKeys={new Set([value])}
        selectionMode="single"
        variant="surface"
        onSelectionChange={v => {
          if (v.size > 0) {
            setValue([...v][0] as Combined);
          }
        }}>
        <TagGroup.List>
          {data.map(d => (
            <TagGroup.Item key={d} id={d}>
              <Image
                className="h-7 w-7"
                resizeMode="contain"
                source={Images.multi[d]}
              />
            </TagGroup.Item>
          ))}
        </TagGroup.List>
      </TagGroup>
    </View>
  );
};

export default ImgSelectionRow;
