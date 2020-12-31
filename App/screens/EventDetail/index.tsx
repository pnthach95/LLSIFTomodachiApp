import React, { useState, useEffect, useRef } from 'react';
import { View, Animated, Image, StyleSheet } from 'react-native';
import {
  Divider,
  Text,
  Title,
  TouchableRipple,
  Button,
  IconButton,
  useTheme,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import dayjs from 'dayjs';

import TimerCountdown from '~/Components/TimerCountdown';
import LoadingScreen from '../Loading';
import { AddHTTPS } from '~/Utils';
import { EventStatus } from '~/Config';
import LLSIFService from '~/Services/LLSIFService';
import { Metrics, Images, Fonts, AppStyles } from '~/Theme';
import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleProp,
} from 'react-native';
import type {
  CardObject,
  CardSearchParams,
  EventDetailScreenProps,
  EventObject,
  LLSIFError,
  SongObject,
  SongSearchParams,
} from '~/Utils/types';

const { ScrollView } = Animated;

/**
 * Event Detail Screen
 *
 * From parent screen, pass `eventName` (Japanese only) to show event detail
 *
 * Event object: https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects
 *
 */
const EventDetailScreen = ({
  navigation,
  route,
}: EventDetailScreenProps): JSX.Element => {
  const scrollAV = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
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
  const [imgSize, setImgSize] = useState({ width: 1, height: 0 });
  const [currentOffset, setCurrentOffset] = useState(0);
  const bottom = { paddingBottom: insets.bottom };

  useEffect(() => {
    void getItem();
  }, []);

  const getItem = async () => {
    try {
      const res = await LLSIFService.fetchEventData(
        encodeURIComponent(route.params.eventName),
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

  /** Load card list, song list in event */
  const loadData = async (evRes: EventObject) => {
    setWWEventStart(dayjs(evRes.english_beginning));
    setWWEventEnd(dayjs(evRes.english_end));
    setJPEventStart(dayjs(evRes.beginning));
    setJPEventEnd(dayjs(evRes.end));
    const cardParams: CardSearchParams = {
      page: 1,
      page_size: 30,
      event_japanese_name: evRes.japanese_name,
    };
    const songParams: SongSearchParams = {
      page: 1,
      page_size: 30,
      event: evRes.japanese_name,
    };
    const [resCard, resSong] = await Promise.all([
      LLSIFService.fetchCardList(cardParams),
      LLSIFService.fetchSongList(songParams),
    ]);
    if (Array.isArray(resCard)) {
      setCards(resCard);
    }
    if (Array.isArray(resSong)) {
      setSongs(resSong);
    }
    setIsLoading(false);
  };

  /** Navigate to destination screen */
  const goToSongDetail = (song: SongObject) => () => {
    navigation.navigate('SongDetailScreen', {
      item: song,
      prevStatusBarColor: colors.card,
    });
  };

  /** Navigate to destination screen */
  const goToCardDetail = (card: CardObject) => () => {
    navigation.navigate('CardDetailScreen', {
      item: card,
      prevStatusBarColor: colors.card,
    });
  };

  const goToEnTracker = () => {
    navigation.navigate('EventTrackerScreen', {
      isWW: true,
      name: item?.english_name || '',
    });
  };

  const goToJpTracker = () => {
    navigation.navigate('EventTrackerScreen', {
      isWW: false,
      name: item?.japanese_name || '',
    });
  };

  const styleFastImage: StyleProp<ImageStyle> = {
    alignSelf: 'center',
    width: Metrics.widthBanner,
    height: (Metrics.widthBanner * imgSize.height) / imgSize.width,
  };

  const goBack = () => navigation.goBack();

  const moveBackButton = scrollAV.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = event.nativeEvent.contentOffset.y;
    if (offset > 50) {
      const dif = offset - (currentOffset || 0);
      if (Math.abs(dif) > 10) {
        if (dif < 0) {
          Animated.timing(scrollAV, {
            duration: 100,
            toValue: 0,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.timing(scrollAV, {
            duration: 100,
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }
      }
    } else {
      Animated.timing(scrollAV, {
        duration: 100,
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
    setCurrentOffset(offset);
  };

  return (
    <View style={AppStyles.screen}>
      <Animated.View
        style={[
          AppStyles.back,
          { transform: [{ translateY: moveBackButton }] },
        ]}>
        <IconButton
          icon='arrow-left'
          color={colors.text}
          onPress={goBack}
          style={{ backgroundColor: colors.background }}
        />
      </Animated.View>
      {isLoading ? (
        <LoadingScreen />
      ) : !!isError || !item ? (
        <View style={[AppStyles.center, AppStyles.screen]}>
          <Text>{isError?.detail}</Text>
          <Text>{route.params.eventName}</Text>
        </View>
      ) : (
        <ScrollView
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, bottom]}>
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
                          source={Images.multi[songItem.attribute]}
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
                          uri: AddHTTPS(cardItem.round_card_idolized_image),
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
    width: 25,
  },
  card: {
    alignItems: 'center',
    margin: Metrics.baseMargin,
  },
  cardImage: {
    flexDirection: 'row',
    marginHorizontal: Metrics.baseMargin,
  },
  cardList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: Metrics.baseMargin,
    paddingTop: 10,
  },
  roundImage: {
    height: responsiveWidth(16),
    width: responsiveWidth(16),
  },
  song: {
    height: responsiveWidth(33),
    width: responsiveWidth(33),
  },
  songInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: Metrics.baseMargin,
  },
  textBlock: {
    paddingVertical: Metrics.baseMargin,
  },
  width5: {
    width: 5,
  },
});

export default EventDetailScreen;
