import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Surface } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import { Metrics, Fonts, Colors } from '~/Theme';
import { findColorByAttribute } from '~/Utils';
import type { IdolObject } from '~/Utils/types';

type IdolItemType = {
  item: IdolObject;
  onPress: () => void;
};

/**
 * Idol item for Idol List Screen
 *
 * Prop:
 * - `item`: [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 * - `onPress`: onPress function
 *
 */
const IdolItem: React.FC<IdolItemType> = ({ item, onPress }) => {
  const attColors = findColorByAttribute(item.attribute || '');
  const [imgSize, setImgSize] = useState({
    height: Metrics.images.smallItemWidth,
    width: Metrics.images.smallItemWidth
  });

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({
      ...imgSize,
      height: (Metrics.images.smallItemWidth * height) / width
    });
  };

  return (
    <Surface style={[styles.container, { backgroundColor: attColors[1] }]}>
      <TouchableRipple borderless rippleColor={attColors[0]} onPress={onPress}>
        <>
          <FastImage
            source={{
              uri: item.chibi,
              priority: FastImage.priority.normal
            }}
            onLoad={onLoad}
            resizeMode='contain'
            style={imgSize}
          />
          <View style={styles.info}>
            <Text style={Fonts.style.center}>{item.name}</Text>
          </View>
        </>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.itemColor,
    borderRadius: 5,
    elevation: 5,
    margin: Metrics.smallMargin,
    width: Metrics.images.smallItemWidth
  },
  info: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: Metrics.smallMargin
  }
});

export default IdolItem;
