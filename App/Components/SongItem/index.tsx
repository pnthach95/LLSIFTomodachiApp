import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface, TouchableRipple } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { Metrics, Fonts } from '~/Theme';
import { AddHTTPS, findColorByAttribute } from '~/Utils';

import type { OnLoadEvent } from 'react-native-fast-image';
import type { FCItemProps, SongObject } from '~/typings';

const { itemWidth } = Metrics.images;

/**
 * Song item for Song List Screen
 *
 * Prop:
 * - `item`: [Song object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#objects)
 * - `onPress`: onPress function
 */
const SongItem = ({ item, onPress }: FCItemProps<SongObject>): JSX.Element => {
  const attColors = findColorByAttribute(item.attribute || '');
  const [imgSize, setImgSize] = useState({ width: 1, height: 1 });

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  };

  return (
    <Surface style={[styles.container, { backgroundColor: attColors[0] }]}>
      <TouchableRipple borderless rippleColor={attColors[1]} onPress={onPress}>
        <>
          <FastImage
            source={{ uri: AddHTTPS(item.image) }}
            onLoad={onLoad}
            style={[
              styles.image,
              {
                width: itemWidth,
                height: (itemWidth * imgSize.height) / imgSize.width,
              },
            ]}
          />
          <View style={styles.info}>
            <Text style={styles.text}>{item.name}</Text>
            {!!item.romaji_name && (
              <Text style={styles.text}>{item.romaji_name}</Text>
            )}
          </View>
        </>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    elevation: 5,
    margin: Metrics.smallMargin,
    overflow: 'hidden',
    width: itemWidth,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Metrics.smallMargin,
  },
  text: {
    ...Fonts.style.white,
    ...Fonts.style.center,
  },
});

export default SongItem;
