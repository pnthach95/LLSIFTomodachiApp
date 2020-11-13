import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { Surface, TouchableRipple, Divider } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import { Metrics, AppStyles, Images } from '~/Theme';
import { AddHTTPS, findColorByAttribute, findSkill } from '~/Utils';
import type { FCItemProps, CardObject } from '~/Utils/types';

const { itemWidth } = Metrics.images;

/**
 * Card item for Card List Screen
 *
 * Prop:
 * - `item`: [Card object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#objects)
 * - `onPress`: onPress function
 */
const CardItem: React.FC<FCItemProps<CardObject>> = ({ item, onPress }) => {
  const card = item.card_image || item.card_idolized_image;
  const cardColors = findColorByAttribute(item.attribute);
  const [imgSize, setImgSize] = useState({ width: 1, height: 0 });
  const styleSeperator = {
    backgroundColor: cardColors[0],
    marginVertical: 0,
  };

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  };

  return (
    <Surface style={styles.container}>
      <TouchableRipple borderless rippleColor={cardColors[0]} onPress={onPress}>
        <>
          {!!card && (
            <FastImage
              onLoad={onLoad}
              source={{
                uri: AddHTTPS(card),
                priority: FastImage.priority.normal,
              }}
              resizeMode='contain'
              style={[
                styles.topRadius,
                {
                  width: itemWidth,
                  height: (itemWidth * imgSize.height) / imgSize.width,
                },
              ]}
            />
          )}
          {/* FOOTER */}
          <Divider style={styleSeperator} />
          <View style={[styles.info, { backgroundColor: cardColors[1] }]}>
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
            {!!item.event && (
              <Image
                source={Images.event}
                style={[AppStyles.mediumIcon, { tintColor: cardColors[0] }]}
              />
            )}
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
    width: itemWidth,
  },
  info: {
    borderBottomLeftRadius: Metrics.smallMargin,
    borderBottomRightRadius: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: Metrics.smallMargin,
  },
  topRadius: {
    borderTopLeftRadius: Metrics.smallMargin,
    borderTopRightRadius: Metrics.smallMargin,
  },
});

CardItem.propTypes = {
  item: PropTypes.any,
  onPress: PropTypes.any,
};

export default CardItem;
