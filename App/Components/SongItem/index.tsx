import React, { useState } from 'react';
import { TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import { Text, Surface, TouchableRipple } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import { Metrics, Colors, Fonts } from '~/Theme';
import { AddHTTPS, findColorByAttribute } from '~/Utils';
import { SongObject } from '~/Utils/type';

type SongItemType = {
  item: SongObject;
  onPress: () => void;
};

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
  const [imgSize, setImgSize] = useState({
    width: Metrics.images.itemWidth,
    height: Metrics.images.itemWidth
  });
  const getName = item.name + (item.romaji_name ? `\n${item.romaji_name}` : '');

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({
      width: Metrics.images.itemWidth,
      height: (Metrics.images.itemWidth * height) / width
    });
  };

  return (
    <Surface style={[styles.container, { backgroundColor: attColors[0] }]}>
      <TouchableRipple
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(attColors[1], true)}>
        <FastImage
          source={{ uri: AddHTTPS(item.image) }}
          onLoad={onLoad}
          style={[imgSize, styles.image]}
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
    width: Metrics.images.itemWidth
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
