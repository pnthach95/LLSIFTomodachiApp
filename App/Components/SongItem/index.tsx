import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, TouchableRipple } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import { Metrics, Colors, Fonts } from '~/Theme';
import { AddHTTPS, findColorByAttribute } from '~/Utils';
import type { SongObject } from '~/Utils/types';

type SongItemType = {
  item: SongObject;
  onPress: () => void;
};

const { itemWidth } = Metrics.images;

/**
 * Song item for Song List Screen
 *
 * Prop:
 * - `item`: [Song object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#objects)
 * - `onPress`: onPress function
 *
 */
const SongItem: React.FC<SongItemType> = ({ item, onPress }) => {
  const attColors = findColorByAttribute(item.attribute || '');
  const [imgSize, setImgSize] = useState({ width: 1, height: 1 });
  const getName = item.name + (item.romaji_name ? `\n${item.romaji_name}` : '');

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  };

  return (
    <Surface style={[styles.container, { backgroundColor: attColors[0] }]}>
      <TouchableRipple borderless rippleColor={attColors[1]} onPress={onPress}>
        <FastImage
          source={{ uri: AddHTTPS(item.image) }}
          onLoad={onLoad}
          style={[
            styles.image,
            {
              width: itemWidth,
              height: (itemWidth * imgSize.height) / imgSize.width
            }
          ]}
        />
        <View style={styles.info}>
          <Text style={styles.text}>{getName}</Text>
        </View>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.itemColor,
    borderRadius: 5,
    elevation: 5,
    margin: Metrics.smallMargin,
    width: itemWidth
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: Metrics.smallMargin
  },
  text: {
    ...Fonts.style.white,
    ...Fonts.style.center
  }
});

export default SongItem;
