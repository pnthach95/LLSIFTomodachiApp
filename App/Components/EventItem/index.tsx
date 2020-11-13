import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Surface, useTheme } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import { Metrics, Colors, Fonts } from '~/Theme';
import { AddHTTPS } from '~/Utils';
import { EventStatus } from '~/Config';
import type { FCItemProps, EventObject } from '~/Utils/types';

const { ONGOING, ANNOUNCED } = EventStatus;
const { amber400, green300 } = Colors;

/**
 * Event item for Event List Screen
 *
 * Prop:
 * - `item`: [Event object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects)
 * - `onPress`: onPress function
 */
const EventItem: React.FC<FCItemProps<EventObject>> = ({ item, onPress }) => {
  const { surface } = useTheme().colors;
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
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  };

  return (
    <Surface style={[styles.container, bgColor]}>
      <TouchableRipple borderless onPress={onPress} style={styles.padding}>
        <>
          <FastImage
            onLoad={onLoad}
            source={{ uri: getImage, priority: 'normal' }}
            resizeMode='contain'
            style={{
              width: Metrics.widthBanner,
              height: (Metrics.widthBanner * imgSize.height) / imgSize.width,
            }}
          />
          <View style={styles.textBox}>
            {label.length > 0 && (
              <Text style={Fonts.style.center}>
                {`[${label.toUpperCase()}]`}
              </Text>
            )}
            {!!item.english_name && (
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
    margin: Metrics.smallMargin,
    overflow: 'hidden',
  },
  padding: {
    padding: Metrics.baseMargin,
  },
  textBox: {
    paddingTop: Metrics.smallMargin,
  },
});

EventItem.propTypes = {
  item: PropTypes.any,
  onPress: PropTypes.any,
};

export default EventItem;
