import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Image, StyleProp, StyleSheet } from 'react-native';
import {
  Divider,
  Text,
  Title,
  TouchableRipple,
  Button,
  useTheme
} from 'react-native-paper';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import dayjs from 'dayjs';

import TimerCountdown from '~/Components/TimerCountdown';
import LoadingScreen from '../Loading';
import { AddHTTPS } from '~/Utils';
import { EventStatus } from '~/Config';
import LLSIFService from '~/Services/LLSIFService';
import { Metrics, Images, Fonts, AppStyles } from '~/Theme';
import type {
  CardObject,
  EventDetailScreenProps,
  EventObject,
  LLSIFError,
  SongObject
} from '~/Utils/types';

/**
 * Event Detail Screen
 *
 * From parent screen, pass `eventName` (Japanese only) to show event detail
 *
 * Event object: https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects
 *
 */
const EventDetailScreen: React.FC<EventDetailScreenProps> = ({
  navigation,
  route
}) => {
  const { colors } = useTheme();
  const [item, setItem] = useState<EventObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<LLSIFError | null>(null);
  const [cards, setCards] = useState<CardObject[]>([]);
  const [songs, setSongs] = useState<SongObject[]>([]);
  const [WWEventStart, setWWEventStart] = useState(dayjs());
  const [WWEventEnd, setWWEventEnd] = useState(dayjs());
  const [JPEventStart, setJPEventStart] = useState(dayjs());
  const [JPEventEnd, setJPEventEnd] = useState(dayjs());
  const [imgSize, setImgSize] = useState({
    width: 1,
    height: 0
  });

  useEffect(() => {
    void getItem();
  }, []);

  const getItem = async () => {
    try {
      const res = await LLSIFService.fetchEventData(
        encodeURIComponent(route.params.eventName)
      );
      setItem(res);
      if (res) {
        await loadData(res);
      } else {
        throw Error('Error');
      }
    } catch (error) {
      setIsError(error);
    }
  };

  /**
   * Load card list, song list in event
   *
   */
  const loadData = async (evRes: EventObject) => {
    setWWEventStart(dayjs(evRes.english_beginning));
    setWWEventEnd(dayjs(evRes.english_end));
    setJPEventStart(dayjs(evRes.beginning));
    setJPEventEnd(dayjs(evRes.end));
    const [resCard, resSong] = await Promise.all([
      LLSIFService.fetchCardList({ event_japanese_name: evRes.japanese_name }),
      LLSIFService.fetchSongList({ event: evRes.japanese_name })
    ]);
    if (Array.isArray(resCard)) {
      setCards(resCard);
    }
    if (Array.isArray(resSong)) {
      setSongs(resSong);
    }
    setIsLoading(false);
  };

  /**
   * Navigate to destination screen
   */
  const goToSongDetail = (song: SongObject) => () => {
    navigation.navigate('SongDetailScreen', {
      item: song,
      prevStatusBarColor: colors.card
    });
  };

  /**
   * Navigate to destination screen
   */
  const goToCardDetail = (card: CardObject) => () => {
    navigation.navigate('CardDetailScreen', {
      item: card,
      prevStatusBarColor: colors.card
    });
  };

  const goToEnTracker = () => {
    navigation.navigate('EventTrackerScreen', {
      isWW: true,
      name: item?.english_name || ''
    });
  };

  const goToJpTracker = () => {
    navigation.navigate('EventTrackerScreen', {
      isWW: false,
      name: item?.japanese_name || ''
    });
  };

  const styleFastImage: StyleProp<ImageStyle> = {
    alignSelf: 'center',
    width: Metrics.widthBanner,
    height: (Metrics.widthBanner * imgSize.height) / imgSize.width
  };

  return (
    <View style={AppStyles.screen}>
      {isLoading ? (
        <LoadingScreen />
      ) : !!isError || !item ? (
        <View style={[AppStyles.center, AppStyles.screen]}>
          <Text>{isError?.detail}</Text>
          <Text>{route.params.eventName}</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          {/* ENGLISH BLOCK */}
          {!!item.english_name && (
            <>
              <View style={AppStyles.center}>
                <View style={[AppStyles.center, styles.textBlock]}>
                  <Text>Worldwide</Text>
                  <Title style={Fonts.style.center}>
                    {item.english_name || item.romaji_name}
                  </Title>
                </View>
                <FastImage
                  source={{ uri: AddHTTPS(item.english_image || '') }}
                  resizeMode={FastImage.resizeMode.contain}
                  style={styleFastImage}
                />
                <View style={[AppStyles.center, styles.textBlock]}>
                  <Text>{`Start: ${WWEventStart.format('LLL')}`}</Text>
                  <Text>{`End: ${WWEventEnd.format('LLL')}`}</Text>
                  {item.world_current && (
                    <Text>
                      <TimerCountdown seconds={WWEventEnd.diff(dayjs())} />
                      {' left'}
                    </Text>
                  )}
                  {item.english_status === EventStatus.ANNOUNCED && (
                    <Text>
                      {'Starts in '}
                      <TimerCountdown seconds={WWEventStart.diff(dayjs())} />
                    </Text>
                  )}
                  {item.english_status !== EventStatus.ANNOUNCED && (
                    <Button onPress={goToEnTracker}>Go to tracker</Button>
                  )}
                </View>
              </View>
              <Divider style={{ backgroundColor: colors.text }} />
            </>
          )}

          {/* JAPANESE BLOCK */}
          <View style={AppStyles.center}>
            <View style={[AppStyles.center, styles.textBlock]}>
              <Text>Japanese</Text>
              <Title>{item.romaji_name}</Title>
            </View>
            <FastImage
              source={{ uri: AddHTTPS(item.image) }}
              resizeMode={FastImage.resizeMode.contain}
              onLoad={(e) => {
                const { width, height } = e.nativeEvent;
                setImgSize({ width, height });
              }}
              style={styleFastImage}
            />
            <View style={[AppStyles.center, styles.textBlock]}>
              <Text>{`Start: ${JPEventStart.format('LLL')}`}</Text>
              <Text>{`End: ${JPEventEnd.format('LLL')}`}</Text>
              {item.japan_current && (
                <Text>
                  <TimerCountdown seconds={JPEventEnd.diff(dayjs())} />
                  {' left'}
                </Text>
              )}
              {item.japan_status === EventStatus.ANNOUNCED && (
                <Text>
                  {'Starts in '}
                  <TimerCountdown seconds={JPEventStart.diff(dayjs())} />
                </Text>
              )}
              {item.japan_status !== EventStatus.ANNOUNCED && (
                <Button onPress={goToJpTracker}>Go to tracker</Button>
              )}
            </View>
          </View>
          {/* SONGS */}
          {songs.length !== 0 && (
            <View>
              <Divider style={{ backgroundColor: colors.text }} />
              <View style={[AppStyles.center, styles.textBlock]}>
                <Text>Song</Text>
              </View>
              <View style={styles.cardList}>
                {songs.map((songItem, index) => (
                  <TouchableRipple
                    key={`song${index}`}
                    onPress={goToSongDetail(songItem)}
                    style={styles.card}>
                    <>
                      <FastImage
                        source={{ uri: AddHTTPS(songItem.image) }}
                        style={styles.song}
                      />
                      <View style={styles.songInfo}>
                        <Image
                          source={Images.attribute[songItem.attribute || '']}
                          style={styles.attributeIcon}
                        />
                        <View style={styles.width5} />
                        <View>
                          <Text>{songItem.name}</Text>
                          {songItem.romaji_name && (
                            <Text>{songItem.romaji_name}</Text>
                          )}
                        </View>
                      </View>
                    </>
                  </TouchableRipple>
                ))}
              </View>
            </View>
          )}

          {cards.length > 0 && (
            <>
              <Divider style={{ backgroundColor: colors.text }} />
              <View style={[AppStyles.center, styles.textBlock]}>
                <Text>Rewards</Text>
              </View>
            </>
          )}
          {/* CARDS */}
          <View style={styles.cardList}>
            {cards.map((cardItem, index) => (
              <TouchableRipple
                key={`card${index}`}
                onPress={goToCardDetail(cardItem)}
                style={styles.card}>
                <>
                  <View style={styles.cardImage}>
                    {!!cardItem.round_card_image && (
                      <>
                        <FastImage
                          source={{ uri: AddHTTPS(cardItem.round_card_image) }}
                          style={styles.roundImage}
                        />
                        <View style={styles.width5} />
                      </>
                    )}
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
                </>
              </TouchableRipple>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  attributeIcon: {
    height: 25,
    width: 25
  },
  card: {
    alignItems: 'center',
    margin: Metrics.baseMargin
  },
  cardImage: {
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  content: {
    paddingHorizontal: Metrics.baseMargin
  },
  roundImage: {
    height: Metrics.screenWidth / 6,
    width: Metrics.screenWidth / 6
  },
  song: {
    height: Metrics.screenWidth / 3,
    width: Metrics.screenWidth / 3
  },
  songInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin
  },
  textBlock: {
    paddingVertical: Metrics.baseMargin
  },
  width5: {
    width: 5
  }
});

EventDetailScreen.propTypes = {
  route: PropTypes.any
};

export default EventDetailScreen;
