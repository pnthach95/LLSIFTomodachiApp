import {Images} from 'assets';
import {TurboImage} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {useState} from 'react';
import {Image, View, useWindowDimensions} from 'react-native';
import {AddHTTPS, findColorByAttribute, findSkill} from 'utils';
import type {NativeSyntheticEvent} from 'react-native';
import type {Success} from 'react-native-turbo-image';

/**
 * Card item for Card List Screen
 *
 * Prop:
 * - `item`: [Card object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#objects)
 * - `onPress`: onPress function
 */
const CardItem = ({
  item,
  numColumns,
  onPress,
}: FCItemProps<CardObject> & {numColumns: number}) => {
  const {width} = useWindowDimensions();
  const itemWidth = width / numColumns;
  const card = AddHTTPS(item.card_image || item.card_idolized_image);
  const cardColors = findColorByAttribute(item.attribute);
  const [imgSize, setImgSize] = useState({width: 1, height: 0});

  const onLoad = ({nativeEvent}: NativeSyntheticEvent<Success>) => {
    setImgSize({width: nativeEvent.width, height: nativeEvent.height});
  };

  return (
    <PressableFeedback
      className="rounded-[5px]"
      style={{width: itemWidth}}
      onPress={onPress}>
      {!!card && (
        <TurboImage
          source={{uri: card}}
          style={{
            aspectRatio: imgSize.width / imgSize.height,
          }}
          onSuccess={onLoad}
        />
      )}
      <View
        className="flex-row justify-around rounded-b-[5px] bg-light-other-attribute p-1.25 data-[attribute=Cool]:bg-light-cool data-[attribute=Pure]:bg-light-pure data-[attribute=Smile]:bg-light-smile"
        data-attribute={item.attribute}>
        {!!item.skill && (
          <Image
            className="h-7.5 w-7.5"
            source={Images.skill[findSkill(item.skill)]}
            style={{tintColor: cardColors[0]}}
          />
        )}
        <Image
          className="h-7.5 w-7.5"
          source={item.japan_only ? Images.region[0] : Images.region[1]}
          style={{tintColor: cardColors[0]}}
        />
        {item.is_promo && (
          <Image
            className="h-7.5 w-7.5"
            source={Images.promo}
            style={{tintColor: cardColors[0]}}
          />
        )}
        {item.is_special && (
          <Image
            className="h-7.5 w-7.5"
            source={Images.skill[3]}
            style={{tintColor: cardColors[0]}}
          />
        )}
        {!!item.event && (
          <Image
            className="h-7.5 w-7.5"
            source={Images.event}
            style={{tintColor: cardColors[0]}}
          />
        )}
      </View>
      <PressableFeedback.Ripple
        animation={{backgroundColor: {value: cardColors[0]}}}
      />
    </PressableFeedback>
  );
};

export default CardItem;
