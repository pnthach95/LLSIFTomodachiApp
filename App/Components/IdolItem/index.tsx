import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Surface, Text, TouchableRipple} from 'react-native-paper';
import {Fonts, Metrics} from '~/Theme';
import {findColorByAttribute} from '~/Utils';
import type {OnLoadEvent} from 'react-native-fast-image';

const {smallItemWidth} = Metrics.images;
const cImgSize = smallItemWidth - Metrics.baseMargin;

/**
 * Idol item for Idol List Screen
 *
 * Prop:
 * - `item`: [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 * - `onPress`: onPress function
 */
const IdolItem = ({item, onPress}: FCItemProps<IdolObject>) => {
  const attColors = findColorByAttribute(item.attribute || '');
  const [imgSize, setImgSize] = useState({
    height: cImgSize,
    width: cImgSize,
  });

  const onLoad = (e: OnLoadEvent) => {
    const {width, height} = e.nativeEvent;
    setImgSize({
      ...imgSize,
      height: (cImgSize * height) / width,
    });
  };

  return (
    <Surface style={[styles.container, {backgroundColor: attColors[0]}]}>
      <TouchableRipple
        borderless
        rippleColor={attColors[1]}
        style={styles.content}
        onPress={onPress}>
        <>
          <FastImage
            resizeMode="contain"
            source={{uri: item.chibi, priority: 'normal'}}
            style={imgSize}
            onLoad={onLoad}
          />
          <Text style={Fonts.style.center}>{item.name}</Text>
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
    width: smallItemWidth,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    padding: Metrics.smallMargin,
  },
});

export default IdolItem;
