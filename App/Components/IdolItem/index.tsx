import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Surface } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { Metrics, Fonts, AppStyles } from '~/Theme';
import { findColorByAttribute } from '~/Utils';

import type { OnLoadEvent } from 'react-native-fast-image';
import type { FCItemProps, IdolObject } from '~/typings';

const { smallItemWidth } = Metrics.images;
const cImgSize = smallItemWidth - Metrics.baseMargin;

/**
 * Idol item for Idol List Screen
 *
 * Prop:
 * - `item`: [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 * - `onPress`: onPress function
 */
const IdolItem = ({ item, onPress }: FCItemProps<IdolObject>): JSX.Element => {
  const attColors = findColorByAttribute(item.attribute || '');
  const [imgSize, setImgSize] = useState({
    height: cImgSize,
    width: cImgSize,
  });

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({
      ...imgSize,
      height: (cImgSize * height) / width,
    });
  };

  return (
    <Surface style={[styles.container, { backgroundColor: attColors[0] }]}>
      <TouchableRipple borderless rippleColor={attColors[1]} onPress={onPress}>
        <View style={[AppStyles.center, styles.content]}>
          <FastImage
            source={{ uri: item.chibi, priority: 'normal' }}
            onLoad={onLoad}
            resizeMode='contain'
            style={imgSize}
          />
          <Text style={Fonts.style.center}>{item.name}</Text>
        </View>
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
    width: smallItemWidth,
  },
  content: {
    padding: Metrics.smallMargin,
  },
});

export default IdolItem;
