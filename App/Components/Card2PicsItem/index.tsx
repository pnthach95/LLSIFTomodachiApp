import React, { useEffect, useState } from 'react';
import { TouchableNativeFeedback, View, Image, StyleSheet } from 'react-native';
import { Surface, TouchableRipple } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import Seperator from '../Seperator/Seperator';
import { Metrics, ApplicationStyles, Images } from '~/Theme';
import { AddHTTPS, findColorByAttribute, findSkill } from '~/Utils';
import type { CardObject } from '~/Utils/type';

type Card2PicsItemType = {
  item: CardObject;
  onPress: () => {};
};

/**
 * Card item for Card List Screen, idolized and unidolized
 *
 * Prop:
 * - `item`: [Card object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#objects)
 * - `onPress`: onPress function
 *
 */
const Card2PicsItem: React.FC<Card2PicsItemType> = ({ item, onPress }) => {
  const cardColors = findColorByAttribute(item.attribute);
  const [images, setImages] = useState<string[]>([]);
  const [imgSize, setImgSize] = useState({ width: 1, height: 0 });
  const styleSeperator = {
    backgroundColor: cardColors[0],
    marginVertical: 0,
  };

  useEffect(() => {
    const tmp = [];
    if (item.card_image) tmp.push(AddHTTPS(item.card_image));
    if (item.card_idolized_image) tmp.push(AddHTTPS(item.card_idolized_image));
    setImages(tmp);
  }, []);

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({
      width: Metrics.images.itemWidth,
      height: (Metrics.images.itemWidth * height) / width
    });
  };

  return <Surface style={[styles.container, { backgroundColor: cardColors[1] }]}>
    <TouchableRipple onPress={onPress}
      background={TouchableNativeFeedback.Ripple(cardColors[0], false)}>
      <>
        <View style={styles.row}>
          {images.map((value, index) => <FastImage key={index}
            source={{ uri: value }}
            onLoad={onLoad}
            resizeMode='contain'
            style={imgSize} />)}
        </View>
        {/* FOOTER */}
        <Seperator style={styleSeperator} />
        <View style={[styles.info, { backgroundColor: cardColors[1] }]}>
          <View style={ApplicationStyles.screen} />
          <View style={[styles.infoRight, ApplicationStyles.screen]}>
            {(!!item.skill) && <Image source={findSkill(item.skill)}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: cardColors[0] },
              ]} />}

            <Image source={item.japan_only ? Images.region[0] : Images.region[1]}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: cardColors[0] },
              ]} />

            {item.is_promo && <Image source={Images.promo}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: cardColors[0] },
              ]} />}

            {item.is_special && <Image source={Images.skill[3]}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: cardColors[0] },
              ]} />}

            {item.event !== null && <Image source={Images.event}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: cardColors[0] },
              ]} />}
          </View>
        </View>
      </>
    </TouchableRipple>
  </Surface>;
};

const styles = StyleSheet.create({
  container: {
    elevation: 5,
    borderRadius: 4,
    margin: Metrics.smallMargin,
    width: Metrics.screenWidth - Metrics.smallMargin * 4,
  },
  info: {
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    flexDirection: 'row',
  },
  infoRight: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.smallMargin,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default Card2PicsItem;