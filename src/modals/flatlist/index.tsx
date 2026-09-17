import {MaterialDesignIcons} from 'components/uniwind';
import {Button} from 'heroui-native/button';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {FlatList, View} from 'react-native';
import type {ListRenderItem} from 'react-native';
import type {ListModalComponent} from 'typings/modalfy';

const keyExtractor = (item: string, index: number) => `item${index}`;
const objKeyExtractor = (item: LVObject<string>, index: number) =>
  `item${index}`;

/**
 * Selection modal
 */
const FlatListModal: ListModalComponent = ({modal}) => {
  const {closeModal, getParam} = modal;
  const title = getParam('title', '');
  const selectedItem = getParam('selectedItem');
  const data = getParam('data');
  const objectData = getParam('objectData');

  const onClose = () => closeModal();

  const renderItem: ListRenderItem<string> = ({item}) => {
    const onPressItem = getParam('onPress');
    const onPress = () => {
      closeModal();
      onPressItem(item);
    };

    return (
      <PressableFeedback onPress={onPress}>
        <View className="flex-row justify-between p-2.5">
          <Text className="w-0 flex-1 grow">{item}</Text>
          {!!selectedItem && item === selectedItem && (
            <MaterialDesignIcons
              colorClassName="accent-success"
              name="check"
              size={20}
            />
          )}
        </View>
      </PressableFeedback>
    );
  };

  const renderObjectItem: ListRenderItem<LVObject<string>> = ({item}) => {
    const onPressItem = getParam('onPress');
    const onPress = () => {
      closeModal();
      onPressItem(item.value);
    };

    return (
      <PressableFeedback onPress={onPress}>
        <View className="flex-row justify-between p-2.5">
          <Text className="w-0 flex-1 grow">{item.label}</Text>
          {!!selectedItem && item.value === selectedItem && (
            <MaterialDesignIcons
              colorClassName="accent-success"
              name="check"
              size={20}
            />
          )}
        </View>
      </PressableFeedback>
    );
  };

  return (
    <View className="max-h-2/5 w-full overflow-hidden rounded-t-[10px]">
      <View className="flex-row items-center justify-between bg-surface">
        <Text className="px-2.5">{title}</Text>
        <Button isIconOnly onPress={onClose}>
          <MaterialDesignIcons colorClassName="accent-danger" name="close" />
        </Button>
      </View>
      {data && (
        <FlatList
          contentContainerClassName="pb-safe-offset-0"
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
      {objectData && (
        <FlatList
          contentContainerClassName="pb-safe-offset-0"
          data={objectData}
          keyExtractor={objKeyExtractor}
          renderItem={renderObjectItem}
        />
      )}
    </View>
  );
};

export default FlatListModal;
