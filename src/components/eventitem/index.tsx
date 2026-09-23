import {TurboImage} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Surface} from 'heroui-native/surface';
import {Typography as Text} from 'heroui-native/text';
import {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {AddHTTPS} from 'utils';
import type {NativeSyntheticEvent} from 'react-native';
import type {Success} from 'react-native-turbo-image';

/**
 * Event item for Event List Screen
 *
 * Prop:
 * - `item`: [Event object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects)
 * - `onPress`: onPress function
 */
const EventItem = ({
  item: {
    image,
    english_image,
    english_status,
    japan_status,
    english_name,
    japanese_name,
  },
  onPress,
}: FCItemProps<EventObject>) => {
  const {width} = useWindowDimensions();
  const widthBanner = width - 40;
  const [imgSize, setImgSize] = useState({width: widthBanner, height: 100});
  const finalImage = !english_image ? AddHTTPS(image) : AddHTTPS(english_image);
  const isAnnounced =
    japan_status === 'announced' || english_status === 'announced';
  const isOngoing = japan_status === 'ongoing' || english_status === 'ongoing';
  const label = isAnnounced ? 'announced' : isOngoing ? 'ongoing' : '';

  const onLoad = ({nativeEvent}: NativeSyntheticEvent<Success>) => {
    setImgSize({width: nativeEvent.width, height: nativeEvent.height});
  };

  return (
    <PressableFeedback className="items-center p-2.5" onPress={onPress}>
      <Surface
        className="mx-2.5 overflow-hidden rounded-[10px] px-2.5 data-[announced=true]:bg-amber-400 data-[ongoing=true]:bg-green-300"
        data-announced={isAnnounced}
        data-ongoing={isOngoing}>
        <>
          {finalImage && (
            <TurboImage
              resizeMode="contain"
              source={{uri: finalImage}}
              style={{
                width: widthBanner,
                height: (widthBanner * imgSize.height) / imgSize.width,
              }}
              onSuccess={onLoad}
            />
          )}
          <View className="pt-1.25">
            {label.length > 0 && (
              <Text className="text-center">{`[${label.toUpperCase()}]`}</Text>
            )}
            {!!english_name && english_name !== japanese_name && (
              <Text className="text-center">{english_name}</Text>
            )}
            <Text className="text-center">{japanese_name}</Text>
          </View>
        </>
      </Surface>
    </PressableFeedback>
  );
};

export default EventItem;
