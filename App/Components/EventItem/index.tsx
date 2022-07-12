import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Surface, Text, TouchableRipple, useTheme} from 'react-native-paper';
import {EventStatus} from '~/Config';
import {Colors, Fonts, Metrics} from '~/Theme';
import {AddHTTPS} from '~/Utils';
import type {OnLoadEvent} from 'react-native-fast-image';

const {ONGOING, ANNOUNCED} = EventStatus;
const {amber400, green300} = Colors;

/**
 * Event item for Event List Screen
 *
 * Prop:
 * - `item`: [Event object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects)
 * - `onPress`: onPress function
 */
const EventItem = ({item, onPress}: FCItemProps<EventObject>) => {
  const {surface} = useTheme().colors;
  const [imgSize, setImgSize] = useState({
    width: Metrics.widthBanner,
    height: 100,
  });
  const getImage = !item.english_image
    ? AddHTTPS(item.image)
    : AddHTTPS(item.english_image);
  const ENStatus = item.english_status;
  const JPStatus = item.japan_status;
  const isAnnounced = JPStatus === ANNOUNCED || ENStatus === ANNOUNCED;
  const isOngoing = JPStatus === ONGOING || ENStatus === ONGOING;
  const label = isAnnounced ? ANNOUNCED : isOngoing ? ONGOING : '';
  const bgColor = {
    backgroundColor: isAnnounced ? amber400 : isOngoing ? green300 : surface,
  };

  const onLoad = (e: OnLoadEvent) => {
    const {width, height} = e.nativeEvent;
    setImgSize({width, height});
  };

  return (
    <Surface style={[styles.container, bgColor]}>
      <TouchableRipple borderless style={styles.touchable} onPress={onPress}>
        <>
          <FastImage
            resizeMode="contain"
            source={{uri: getImage, priority: 'normal'}}
            style={{
              width: Metrics.widthBanner,
              height: (Metrics.widthBanner * imgSize.height) / imgSize.width,
            }}
            onLoad={onLoad}
          />
          <View style={styles.textBox}>
            {label.length > 0 && (
              <Text style={Fonts.style.center}>
                {`[${label.toUpperCase()}]`}
              </Text>
            )}
            {!!item.english_name &&
              item.english_name !== item.japanese_name && (
                <Text style={Fonts.style.center}>{item.english_name}</Text>
              )}
            <Text style={Fonts.style.center}>{item.japanese_name}</Text>
          </View>
        </>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Metrics.baseMargin,
    elevation: 5,
    marginHorizontal: Metrics.baseMargin,
    overflow: 'hidden',
    paddingHorizontal: Metrics.baseMargin,
  },
  textBox: {
    paddingTop: Metrics.smallMargin,
  },
  touchable: {
    alignItems: 'center',
    padding: Metrics.baseMargin,
  },
});

export default EventItem;
