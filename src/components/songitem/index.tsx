import {TurboImage} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Surface} from 'heroui-native/surface';
import {Typography as Text} from 'heroui-native/text';
import {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {AddHTTPS, findColorByAttribute} from 'utils';
import type {NativeSyntheticEvent} from 'react-native';
import type {Success} from 'react-native-turbo-image';

/**
 * Song item for Song List Screen
 *
 * Prop:
 * - `item`: [Song object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#objects)
 * - `onPress`: onPress function
 */
const SongItem = ({item, onPress}: FCItemProps<SongObject>) => {
  const uri = AddHTTPS(item.image);
  const {width} = useWindowDimensions();
  const itemWidth = (width - 10) / 2 - 10;
  const attColors = findColorByAttribute(item.attribute || '');
  const [imgSize, setImgSize] = useState({width: 1, height: 1});

  const onLoad = ({nativeEvent}: NativeSyntheticEvent<Success>) => {
    setImgSize({width: nativeEvent.width, height: nativeEvent.height});
  };

  return (
    <PressableFeedback onPress={onPress}>
      <PressableFeedback.Ripple
        animation={{backgroundColor: {value: attColors[1]}}}
      />
      <Surface
        className="m-1.25 overflow-hidden rounded-[5px] bg-other-attribute data-[attribute=Cool]:bg-cool data-[attribute=Pure]:bg-pure data-[attribute=Smile]:bg-smile"
        data-attribute={item.attribute}
        style={{width: itemWidth}}>
        <>
          {uri && (
            <TurboImage
              className="rounded-t-[5px]"
              source={{uri}}
              style={{
                width: itemWidth,
                height: (itemWidth * imgSize.height) / imgSize.width,
              }}
              onSuccess={onLoad}
            />
          )}
          <View className="items-center justify-center p-1.25">
            <Text className="text-center text-white">{item.name}</Text>
            {!!item.romaji_name && (
              <Text className="text-center text-white">{item.romaji_name}</Text>
            )}
          </View>
        </>
      </Surface>
    </PressableFeedback>
  );
};

export default SongItem;
