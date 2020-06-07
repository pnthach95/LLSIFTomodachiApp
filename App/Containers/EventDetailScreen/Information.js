import React, { useState } from 'react';
import {
  Text, View, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import Seperator from '~/Components/Seperator/Seperator';
import TimerCountdown from '~/Components/TimerCountdown/Timer';
import { AddHTTPS, findAttribute } from '~/Utils';
import { Config, EventStatus } from '~/Config';
import { Metrics, ApplicationStyles, Fonts } from '~/Theme';
import styles from './styles';

function Information({
  item, WWEventStart, WWEventEnd, JPEventStart, JPEventEnd, cards, songs,
}) {
  const navigation = useNavigation();
  const [imgSize, setImgSize] = useState({
    width: 1,
    height: 0,
  });

  /**
   * Get width, height of image in FastImage
   *
   */
  function onLoadFastImage(e) {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  }

  /**
   * Navigate to destination screen
   *
   */
  const navigateTo = (destination, item0) => () => {
    navigation.navigate(destination, { item: item0 });
  };

  /**
   * Countdown timer for ongoing event
   *
   */
  function timer(time) {
    return <TimerCountdown initialSecondsRemaining={time}
      allowFontScaling={true} />;
  }

  const styleFastImage = {
    alignSelf: 'center',
    width: Metrics.widthBanner,
    height: (Metrics.widthBanner * imgSize.height) / imgSize.width,
  };

  return <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}
      style={ApplicationStyles.screen}
      contentContainerStyle={styles.content}>
      {/* ENGLISH BLOCK */}
      {item.english_name !== null
        && <View>
          <Text style={styles.whiteCenter}>Worldwide</Text>
          <Text style={[styles.text, styles.title, styles.whiteCenter]}>
            {item.english_name.length === 0
              ? item.romaji_name : item.english_name}
          </Text>
          <FastImage source={{ uri: AddHTTPS(item.english_image) }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={(e) => onLoadFastImage(e)}
            style={styleFastImage} />
          <Text style={[styles.text, styles.whiteCenter]}>
            {`Start: ${WWEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${WWEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
          </Text>
          {item.world_current
            && <Text style={[styles.text, styles.whiteCenter]}>
              {timer(WWEventEnd.diff(moment()))}{' left'}
            </Text>}
          {item.english_status === EventStatus.ANNOUNCED
            && <Text style={[styles.text, styles.whiteCenter]}>
              {'Starts in '}{timer(WWEventStart.diff(moment()))}
            </Text>}
        </View>}
      {item.english_name !== null
        && <Seperator style={styles.whiteLine} />}

      {/* JAPANESE BLOCK */}
      <Text style={styles.whiteCenter}>Japanese</Text>
      <Text style={[styles.text, styles.title, styles.whiteCenter]}>
        {item.romaji_name}
      </Text>
      <FastImage source={{ uri: AddHTTPS(item.image) }}
        resizeMode={FastImage.resizeMode.contain}
        onLoad={(e) => onLoadFastImage(e)}
        style={styleFastImage} />
      <Text style={[styles.text, styles.whiteCenter]}>
        {`Start: ${JPEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
      </Text>
      {item.japan_current
        && <Text style={[styles.text, styles.whiteCenter]}>
          {timer(JPEventEnd.diff(moment()))}{' left'}
        </Text>}
      {item.japan_status === EventStatus.ANNOUNCED
        && <Text style={[styles.text, styles.whiteCenter]}>
          {'Starts in '}{timer(JPEventStart.diff(moment()))}
        </Text>}
      {songs.length !== 0
        && <Seperator style={styles.whiteLine} />}
      {/* SONGS */}
      {songs.length !== 0
        && <View>
          <Text style={styles.whiteCenter}>Song</Text>
          <View style={styles.cardList}>
            {songs.map((songItem, index) => <TouchableOpacity key={`song${index}`}
              onPress={navigateTo('SongDetailScreen', songItem)}
              style={styles.card}>
              <FastImage source={{ uri: AddHTTPS(songItem.image) }} style={styles.song} />
              <View style={styles.songInfo}>
                <Image source={findAttribute(songItem.attribute)} style={styles.attributeIcon} />
                <Text style={styles.whiteCenter}>
                  {`${songItem.name}${songItem.romaji_name !== null ? `\n${songItem.romaji_name}` : ''}`}
                </Text>
              </View>
            </TouchableOpacity>)}
          </View>
        </View>}
      <Seperator style={styles.whiteLine} />
      <Text style={styles.whiteCenter}>Rewards</Text>
      {/* CARDS */}
      <View style={styles.cardList}>
        {cards.map((cardItem, index) => <TouchableOpacity key={`card${index}`}
          onPress={navigateTo('CardDetailScreen', cardItem)}
          style={styles.card}>
          <View style={styles.cardImage}>
            {cardItem.round_card_image !== null
              && <FastImage source={{ uri: AddHTTPS(cardItem.round_card_image) }}
                style={styles.roundImage} />}
            {cardItem.round_card_image !== null && <View style={styles.width5} />}
            <FastImage source={{ uri: AddHTTPS(cardItem.round_card_idolized_image) }}
              style={styles.roundImage} />
          </View>
          <Text style={Fonts.style.white}>{cardItem.idol.name}</Text>
          {cardItem.other_event !== null
            && <Text style={Fonts.style.white}>{'(Worldwide only)'}</Text>}
        </TouchableOpacity>)}
      </View>
    </ScrollView>
  </View>;
}

Information.propTypes = {
  item: PropTypes.shape({
    english_name: PropTypes.string,
    english_image: PropTypes.string,
    romaji_name: PropTypes.string,
    world_current: PropTypes.any,
    english_status: PropTypes.any,
    image: PropTypes.string,
    japan_current: PropTypes.any,
    japan_status: PropTypes.any,
  }),
  WWEventStart: PropTypes.any,
  WWEventEnd: PropTypes.any,
  JPEventStart: PropTypes.any,
  JPEventEnd: PropTypes.any,
  cards: PropTypes.array,
  songs: PropTypes.array,
};

export default Information;
