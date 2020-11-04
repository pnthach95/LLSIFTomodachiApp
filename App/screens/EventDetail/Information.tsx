import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleProp
} from 'react-native';
import { Divider, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import dayjs, { Dayjs } from 'dayjs';

import TimerCountdown from '~/Components/TimerCountdown';
import { AddHTTPS } from '~/Utils';
import { Config, EventStatus } from '~/Config';
import { Metrics, AppStyles, Images } from '~/Theme';
import styles from './styles';
import { CardObject, EventObject, SongObject } from '~/Utils/types';

const Information = ({
  item,
  WWEventStart,
  WWEventEnd,
  JPEventStart,
  JPEventEnd,
  cards,
  songs
}: {
  item: EventObject;
  WWEventStart: Dayjs;
  WWEventEnd: Dayjs;
  JPEventStart: Dayjs;
  JPEventEnd: Dayjs;
  cards: CardObject[];
  songs: SongObject[];
}): JSX.Element => {
  const navigation = useNavigation();
  const [imgSize, setImgSize] = useState({
    width: 1,
    height: 0
  });

  /**
   * Navigate to destination screen
   */
  const navigateTo = (
    destination: string,
    item0: SongObject | CardObject
  ) => () => {
    navigation.navigate(destination, { item: item0 });
  };

  const styleFastImage: StyleProp<ImageStyle> = {
    alignSelf: 'center',
    width: Metrics.widthBanner,
    height: (Metrics.widthBanner * imgSize.height) / imgSize.width
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={AppStyles.screen}
        contentContainerStyle={styles.content}>
        {/* ENGLISH BLOCK */}
        {item.english_name !== null && (
          <View>
            <Text style={styles.whiteCenter}>Worldwide</Text>
            <Text style={[styles.text, styles.title, styles.whiteCenter]}>
              {item.english_name || item.romaji_name}
            </Text>
            <FastImage
              source={{ uri: AddHTTPS(item.english_image || '') }}
              resizeMode={FastImage.resizeMode.contain}
              style={styleFastImage}
            />
            <Text style={[styles.text, styles.whiteCenter]}>
              {`Start: ${WWEventStart.format(
                Config.DATETIME_FORMAT_OUTPUT
              )}\nEnd: ${WWEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
            </Text>
            {item.world_current && (
              <Text style={[styles.text, styles.whiteCenter]}>
                <TimerCountdown
                  initialSecondsRemaining={WWEventEnd.diff(dayjs())}
                />
                {' left'}
              </Text>
            )}
            {item.english_status === EventStatus.ANNOUNCED && (
              <Text style={[styles.text, styles.whiteCenter]}>
                {'Starts in '}
                <TimerCountdown
                  initialSecondsRemaining={WWEventStart.diff(dayjs())}
                />
              </Text>
            )}
          </View>
        )}
        {item.english_name !== null && <Divider style={styles.whiteLine} />}

        {/* JAPANESE BLOCK */}
        <Text style={styles.whiteCenter}>Japanese</Text>
        <Text style={[styles.text, styles.title, styles.whiteCenter]}>
          {item.romaji_name}
        </Text>
        <FastImage
          source={{ uri: AddHTTPS(item.image) }}
          resizeMode={FastImage.resizeMode.contain}
          onLoad={(e) => {
            const { width, height } = e.nativeEvent;
            setImgSize({ width, height });
          }}
          style={styleFastImage}
        />
        <Text style={[styles.text, styles.whiteCenter]}>
          {`Start: ${JPEventStart.format(
            Config.DATETIME_FORMAT_OUTPUT
          )}\nEnd: ${JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
        </Text>
        {item.japan_current && (
          <Text style={[styles.text, styles.whiteCenter]}>
            <TimerCountdown
              initialSecondsRemaining={JPEventEnd.diff(dayjs())}
            />
            {' left'}
          </Text>
        )}
        {item.japan_status === EventStatus.ANNOUNCED && (
          <Text style={[styles.text, styles.whiteCenter]}>
            {'Starts in '}
            <TimerCountdown
              initialSecondsRemaining={JPEventStart.diff(dayjs())}
            />
          </Text>
        )}
        {songs.length !== 0 && <Divider style={styles.whiteLine} />}
        {/* SONGS */}
        {songs.length !== 0 && (
          <View>
            <Text style={styles.whiteCenter}>Song</Text>
            <View style={styles.cardList}>
              {songs.map((songItem, index) => (
                <TouchableOpacity
                  key={`song${index}`}
                  onPress={navigateTo('SongDetailScreen', songItem)}
                  style={styles.card}>
                  <FastImage
                    source={{ uri: AddHTTPS(songItem.image) }}
                    style={styles.song}
                  />
                  <View style={styles.songInfo}>
                    <Image
                      source={Images.attribute[songItem.attribute || '']}
                      style={styles.attributeIcon}
                    />
                    <Text style={styles.whiteCenter}>
                      {`${songItem.name}${
                        songItem.romaji_name ? `\n${songItem.romaji_name}` : ''
                      }`}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        <Divider style={styles.whiteLine} />
        <Text style={styles.whiteCenter}>Rewards</Text>
        {/* CARDS */}
        <View style={styles.cardList}>
          {cards.map((cardItem, index) => (
            <TouchableOpacity
              key={`card${index}`}
              onPress={navigateTo('CardDetailScreen', cardItem)}
              style={styles.card}>
              <View style={styles.cardImage}>
                {!!cardItem.round_card_image && (
                  <FastImage
                    source={{ uri: AddHTTPS(cardItem.round_card_image) }}
                    style={styles.roundImage}
                  />
                )}
                {!!cardItem.round_card_image && <View style={styles.width5} />}
                {!!cardItem.round_card_idolized_image && (
                  <FastImage
                    source={{
                      uri: AddHTTPS(cardItem.round_card_idolized_image)
                    }}
                    style={styles.roundImage}
                  />
                )}
              </View>
              <Text>{cardItem.idol.name}</Text>
              {cardItem.other_event && <Text>(Worldwide only)</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

Information.propTypes = {
  item: PropTypes.shape({
    english_name: PropTypes.string,
    english_image: PropTypes.string,
    romaji_name: PropTypes.string,
    world_current: PropTypes.any,
    english_status: PropTypes.any,
    image: PropTypes.string,
    japan_current: PropTypes.any,
    japan_status: PropTypes.any
  }),
  WWEventStart: PropTypes.any,
  WWEventEnd: PropTypes.any,
  JPEventStart: PropTypes.any,
  JPEventEnd: PropTypes.any,
  cards: PropTypes.array,
  songs: PropTypes.array
};

export default Information;
