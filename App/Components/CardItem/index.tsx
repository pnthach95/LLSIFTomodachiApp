import React, { useState } from 'react';
import { TouchableNativeFeedback, View, Image, StyleSheet } from 'react-native';
import { Surface, TouchableRipple } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import Seperator from '../Seperator/Seperator';
import { Metrics, ApplicationStyles, Images } from '~/Theme';
import { AddHTTPS, findColorByAttribute, findSkill } from '~/Utils';
import { CardObject } from '~/Utils/type';

type CardItemType = {
  item: CardObject;
  onPress: () => void;
};

/**
 * Card item for Card List Screen
 *
 * Prop:
 * - `item`: [Card object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#objects)
 * - `onPress`: onPress function
 *
 */
const CardItem: React.FC<CardItemType> = ({ item, onPress }) => {
  const card = item.card_image || item.card_idolized_image;
  const cardColors = findColorByAttribute(item.attribute);
  const [imgSize, setImgSize] = useState({ width: 1, height: 0 });
  const styleSeperator = {
    backgroundColor: cardColors[0],
    marginVertical: 0,
  };

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({
      width: Metrics.images.itemWidth,
      height: (Metrics.images.itemWidth * height) / width,
    });
  };

  return <Surface style={styles.container}>
    <TouchableRipple onPress={onPress}
      background={TouchableNativeFeedback.Ripple(cardColors[0], false)}>
      <>
        {card && <FastImage onLoad={onLoad}
          source={{
            uri: AddHTTPS(card),
            priority: FastImage.priority.normal,
          }}
          resizeMode='contain'
          style={[styles.topRadius, imgSize]} />}
        {/* FOOTER */}
        <Seperator style={styleSeperator} />
        <View style={[styles.info, { backgroundColor: cardColors[1] }]}>
          {(!!item.skill) && <Image source={findSkill(item.skill)}
            style={[ApplicationStyles.mediumIcon, { tintColor: cardColors[0] }]} />}
          <Image source={item.japan_only ? Images.region[0] : Images.region[1]}
            style={[ApplicationStyles.mediumIcon, { tintColor: cardColors[0] }]} />
          {item.is_promo && <Image source={Images.promo}
            style={[ApplicationStyles.mediumIcon, { tintColor: cardColors[0] }]} />}
          {item.is_special && <Image source={Images.skill[3]}
            style={[ApplicationStyles.mediumIcon, { tintColor: cardColors[0] }]} />}
          {item.event !== null && <Image source={Images.event}
            style={[ApplicationStyles.mediumIcon, { tintColor: cardColors[0] }]} />}
        </View>
      </>
    </TouchableRipple>
  </Surface>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    elevation: 5,
    margin: Metrics.smallMargin,
    width: Metrics.images.itemWidth,
  },
  info: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.smallMargin,
  },
  topRadius: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
});

export default CardItem;