import React, { useState, useEffect } from 'react';
import { TouchableNativeFeedback, View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Surface } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import { Metrics, Colors, Fonts } from '~/Theme';
import { AddHTTPS } from '~/Utils';
import { EventStatus } from '~/Config';
import { EventObject } from '~/Utils/type';

type EventItemType = {
  item: EventObject;
  onPress: () => void;
};

/**
 * Event item for Event List Screen
 *
 * Prop:
 * - `item`: [Event object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects)
 * - `onPress`: onPress function
 *
 */
const EventItem: React.FC<EventItemType> = ({ item, onPress }) => {
  const [imgSize, setImgSize] = useState({
    width: Metrics.widthBanner,
    height: 100
  });
  const [state, setState] = useState({
    label: '',
    color: Colors.finished
  });
  const getImage = !item.english_image
    ? AddHTTPS(item.image)
    : AddHTTPS(item.english_image);
  const eventName =
    (item.english_name ? `${item.english_name}\n` : '') + item.japanese_name;

  useEffect(() => {
    const ENStatus = item.english_status;
    const JPStatus = item.japan_status;
    const isAnnounced =
      JPStatus === EventStatus.ANNOUNCED || ENStatus === EventStatus.ANNOUNCED;
    const isOngoing =
      JPStatus === EventStatus.ONGOING || ENStatus === EventStatus.ONGOING;
    if (isAnnounced) {
      setState({
        label: EventStatus.ANNOUNCED,
        color: Colors.announced
      });
    } else if (isOngoing) {
      setState({
        label: EventStatus.ONGOING,
        color: Colors.ongoing
      });
    }
  }, []);

  const onLoad = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({
      width: Metrics.widthBanner,
      height: (Metrics.widthBanner * height) / width
    });
  };

  return (
    <Surface style={[styles.container, { backgroundColor: state.color }]}>
      <TouchableRipple
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(state.color, false)}>
        <>
          <FastImage
            onLoad={onLoad}
            source={{
              uri: getImage,
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
            style={[imgSize, styles.image]}
          />
          <View style={styles.textBox}>
            <Text style={styles.text}>
              {(state.label.length > 0
                ? `[${state.label.toUpperCase()}]\n`
                : '') + eventName}
            </Text>
          </View>
        </>
      </TouchableRipple>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'center',
    margin: Metrics.smallMargin,
    paddingTop: Metrics.smallMargin,
    width: Metrics.screenWidth - 20
  },
  image: {
    alignSelf: 'center'
  },
  text: {
    ...Fonts.style.white,
    ...Fonts.style.center
  },
  textBox: {
    paddingVertical: Metrics.smallMargin
  }
});

export default EventItem;
