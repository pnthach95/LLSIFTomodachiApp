import {TurboImage} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Surface} from 'heroui-native/surface';
import {Typography as Text} from 'heroui-native/text';
import {useState} from 'react';
import {useWindowDimensions} from 'react-native';
import {findColorByAttribute} from 'utils';
import type {NativeSyntheticEvent} from 'react-native';
import type {Success} from 'react-native-turbo-image';

/**
 * Idol item for Idol List Screen
 *
 * Prop:
 * - `item`: [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 * - `onPress`: onPress function
 */
const IdolItem = ({item, onPress}: FCItemProps<IdolObject>) => {
  const {width} = useWindowDimensions();
  const smallItemWidth = (width - 10) / 3 - 10;
  const cImgSize = smallItemWidth - 10;
  const attColors = findColorByAttribute(item.attribute || '');
  const [imgSize, setImgSize] = useState({height: cImgSize, width: cImgSize});

  const onLoad = ({nativeEvent}: NativeSyntheticEvent<Success>) => {
    setImgSize({
      ...imgSize,
      height: (cImgSize * nativeEvent.height) / nativeEvent.width,
    });
  };

  return (
    <PressableFeedback className="flex-1 items-center p-1.25" onPress={onPress}>
      <PressableFeedback.Ripple
        animation={{backgroundColor: {value: attColors[1]}}}
      />
      <Surface
        className="m-1.25 overflow-hidden rounded-[5px] bg-other-attribute data-[attribute=Cool]:bg-cool data-[attribute=Pure]:bg-pure data-[attribute=Smile]:bg-smile"
        data-attribute={item.attribute}
        style={{width: smallItemWidth}}>
        {item.chibi && (
          <TurboImage
            resizeMode="contain"
            source={{uri: item.chibi}}
            style={imgSize}
            onSuccess={onLoad}
          />
        )}
        <Text className="text-center">{item.name}</Text>
      </Surface>
    </PressableFeedback>
  );
};

export default IdolItem;
