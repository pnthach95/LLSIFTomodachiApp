import {TurboImage} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Typography as Text} from 'heroui-native/text';
import {View, useWindowDimensions} from 'react-native';
import {AddHTTPS, findColorByAttribute} from 'utils';

/**
 * Song item for Song List Screen
 *
 * Prop:
 * - `item`: [Song object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#objects)
 * - `onPress`: onPress function
 */
const SongItem = ({
  numColumns,
  item,
  onPress,
}: FCItemProps<SongObject> & {numColumns: number}) => {
  const uri = AddHTTPS(item.image);
  const {width} = useWindowDimensions();
  const itemWidth = width / numColumns;
  const attColors = findColorByAttribute(item.attribute || '');

  return (
    <PressableFeedback onPress={onPress}>
      {uri && (
        <TurboImage
          resizeMode="cover"
          source={{uri}}
          style={{width: itemWidth, height: itemWidth}}
        />
      )}
      <View
        className="absolute bottom-0 h-1/3 w-full items-center justify-end bg-linear-to-b from-other-attribute to-other-attribute p-1 data-[attribute=Cool]:from-cool/10 data-[attribute=Cool]:to-cool data-[attribute=Pure]:from-pure/10 data-[attribute=Pure]:to-pure data-[attribute=Smile]:from-smile/10 data-[attribute=Smile]:to-smile"
        data-attribute={item.attribute}>
        <Text align="center" className="text-white" weight="bold">
          {item.name}
        </Text>
        {!!item.romaji_name && (
          <Text truncate align="center" className="text-white" weight="bold">
            {item.romaji_name}
          </Text>
        )}
      </View>
      <PressableFeedback.Ripple
        animation={{backgroundColor: {value: attColors[1]}}}
      />
    </PressableFeedback>
  );
};

export default SongItem;
