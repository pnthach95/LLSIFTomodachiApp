import {Images} from 'assets';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {FlatList, Image, type ListRenderItem, View} from 'react-native';

/**
 * Selection Row with Image
 */
const ImgSelectionRow = ({title, data, value, setValue}: FCSelectionProps) => {
  const renderItem: ListRenderItem<Combined> = ({item}) => {
    const onPress = () => setValue(item);
    return (
      <PressableFeedback
        className="my-0.75 rounded-[5px] px-1.75 py-0.75 data-[checked=true]:bg-success"
        data-checked={value === item}
        onPress={onPress}>
        <Image
          className="h-7.5 w-7.5"
          resizeMode="contain"
          source={Images.multi[item]}
        />
      </PressableFeedback>
    );
  };

  return (
    <View className="flex-row">
      <View className="my-2.5 flex-1 justify-center">
        <Text>{title}</Text>
      </View>
      <View className="flex-2 flex-row">
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item, index) => `${index}${item}`}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ImgSelectionRow;
