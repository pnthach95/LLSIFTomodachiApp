import {Images} from 'assets';
import {TurboImage} from 'components/uniwind';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Separator} from 'heroui-native/separator';
import {Surface} from 'heroui-native/surface';
import {useState} from 'react';
import {Image, View, useWindowDimensions} from 'react-native';
import {AddHTTPS, findColorByAttribute, findSkill} from 'utils';
import type {NativeSyntheticEvent} from 'react-native';
import type {Success} from 'react-native-turbo-image';

/**
 * Card item for Card List Screen, idolized and unidolized
 *
 * Prop:
 * - `item`: [Card object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#objects)
 * - `onPress`: onPress function
 */
const Card2PicsItem = ({item, onPress}: FCItemProps<CardObject>) => {
  const {width} = useWindowDimensions();
  const itemWidth = (width - 10) / 2 - 10;
  const cardColors = findColorByAttribute(item.attribute);
  const images = [
    AddHTTPS(item.card_image),
    AddHTTPS(item.card_idolized_image),
  ].filter((value): value is string => !!value);
  const [imgSize, setImgSize] = useState({width: 1, height: 0});

  const onLoad = ({nativeEvent}: NativeSyntheticEvent<Success>) => {
    setImgSize({width: nativeEvent.width, height: nativeEvent.height});
  };

  return (
    <PressableFeedback onPress={onPress}>
      <PressableFeedback.Ripple
        animation={{backgroundColor: {value: cardColors[0]}}}
      />
      <Surface
        className="m-1.25 overflow-hidden rounded-[5px] bg-light-other-attribute data-[attribute=Cool]:bg-light-cool data-[attribute=Pure]:bg-light-pure data-[attribute=Smile]:bg-light-smile"
        data-attribute={item.attribute}
        style={{width: width - 20}}>
        <View className="flex-row justify-around">
          {images.map((value, index) => (
            <TurboImage
              key={index}
              resizeMode="contain"
              source={{uri: value}}
              style={{
                width: itemWidth,
                height: (itemWidth * imgSize.height) / imgSize.width,
              }}
              onSuccess={onLoad}
            />
          ))}
        </View>
        {/* FOOTER */}
        <Separator
          className="bg-other-attribute data-[attribute=Cool]:bg-cool data-[attribute=Pure]:bg-pure data-[attribute=Smile]:bg-smile"
          data-attribute={item.attribute}
        />
        <View
          className="flex-row rounded-b-[5px] bg-light-other-attribute data-[attribute=Cool]:bg-light-cool data-[attribute=Pure]:bg-light-pure data-[attribute=Smile]:bg-light-smile"
          data-attribute={item.attribute}>
          <View className="flex-1" />
          <View className="flex-1 flex-row justify-around p-1.25">
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
        </View>
      </Surface>
    </PressableFeedback>
  );
};

export default Card2PicsItem;
