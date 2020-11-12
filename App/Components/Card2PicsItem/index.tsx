import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { Surface, TouchableRipple, Divider } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import { Metrics, AppStyles, Images } from '~/Theme';
import { AddHTTPS, findColorByAttribute, findSkill } from '~/Utils';
import type { CardObject } from '~/Utils/types';

type Card2PicsItemType = {
  item: CardObject;
  onPress: () => void;
};

const { itemWidth } = Metrics.images;

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
    marginVertical: 0
  };

  useEffect(() => {
    const tmp = [];
    if (item.card_image) tmp.push(AddHTTPS(item.card_image));
    if (item.card_idolized_image) tmp.push(AddHTTPS(item.card_idolized_image));
    setImages(tmp);
  }, []);

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  };

  return (
    <Surface style={[styles.container, { backgroundColor: cardColors[1] }]}>
      <TouchableRipple borderless rippleColor={cardColors[0]} onPress={onPress}>
        <>
          <View style={styles.row}>
            {images.map((value, index) => (
              <FastImage
                key={index}
                source={{ uri: value }}
                onLoad={onLoad}
                resizeMode='contain'
                style={{
                  width: itemWidth,
                  height: (itemWidth * imgSize.height) / imgSize.width
                }}
              />
            ))}
          </View>
          {/* FOOTER */}
          <Divider style={styleSeperator} />
          <View style={[styles.info, { backgroundColor: cardColors[1] }]}>
            <View style={AppStyles.screen} />
            <View style={[styles.infoRight, AppStyles.screen]}>
              {!!item.skill && (
                <Image
                  source={Images.skill[findSkill(item.skill)]}
                  style={[AppStyles.mediumIcon, { tintColor: cardColors[0] }]}
                />
              )}

              <Image
                source={item.japan_only ? Images.region[0] : Images.region[1]}
                style={[AppStyles.mediumIcon, { tintColor: cardColors[0] }]}
              />

              {item.is_promo && (
                <Image
                  source={Images.promo}
                  style={[AppStyles.mediumIcon, { tintColor: cardColors[0] }]}
                />
              )}

              {item.is_special && (
                <Image
                  source={Images.skill[3]}
                  style={[AppStyles.mediumIcon, { tintColor: cardColors[0] }]}
                />
              )}

              {item.event !== null && (
                <Image
                  source={Images.event}
                  style={[AppStyles.mediumIcon, { tintColor: cardColors[0] }]}
                />
              )}
            </View>
          </View>
        </>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Metrics.smallMargin,
    elevation: 5,
    margin: Metrics.smallMargin,
    overflow: 'hidden',
    width: Metrics.screenWidth - Metrics.smallMargin * 4
  },
  info: {
    borderBottomLeftRadius: Metrics.smallMargin,
    borderBottomRightRadius: Metrics.smallMargin,
    flexDirection: 'row'
  },
  infoRight: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.smallMargin
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

Card2PicsItem.propTypes = {
  item: PropTypes.any,
  onPress: PropTypes.any
};

export default Card2PicsItem;
