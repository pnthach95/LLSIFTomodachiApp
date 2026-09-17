import {Images} from 'assets';
import ScrollViewWithBackButton from 'components/scrollviewwithbackbutton';
import TimerCountdown from 'components/timercountdown';
import {TurboImage} from 'components/uniwind';
import dayjs from 'dayjs';
import {Button} from 'heroui-native/button';
import {PressableFeedback} from 'heroui-native/pressable-feedback';
import {Separator} from 'heroui-native/separator';
import {Typography as Text} from 'heroui-native/text';
import {useEffect, useState} from 'react';
import {Image, View, useWindowDimensions} from 'react-native';
import LLSIFService from 'services/LLSIFService';
import {AddHTTPS} from 'utils';
import LoadingScreen from '../loading';
import type {StyleProp, ViewStyle} from 'react-native';
import type {RootStackScreenProps} from 'typings/navigation';

/**
 * Event Detail Screen
 *
 * From parent screen, pass `eventName` (Japanese only) to show event detail
 *
 * Event object: https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects
 */
const EventDetailScreen = ({
  navigation,
  route,
}: RootStackScreenProps<'EventDetailScreen'>) => {
  const {width} = useWindowDimensions();
  const widthBanner = width - 40;
  const [item, setItem] = useState<EventObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<LLSIFError | Error | null>(null);
  const [cards, setCards] = useState<CardObject[]>([]);
  const [songs, setSongs] = useState<SongObject[]>([]);
  const [WWEventStart, setWWEventStart] = useState(dayjs());
  const [WWEventEnd, setWWEventEnd] = useState(dayjs());
  const [JPEventStart, setJPEventStart] = useState(dayjs());
  const [JPEventEnd, setJPEventEnd] = useState(dayjs());
  const [imgSize, setImgSize] = useState({width: 1, height: 0});
  const [isMerged, setIsMerged] = useState(false);
  const engImage = AddHTTPS(item?.english_image);
  const image = AddHTTPS(item?.image);

  useEffect(() => {
    /** Load card list, song list in event */
    const loadData = async (evRes: EventObject) => {
      const wwBegin = dayjs(evRes.english_beginning);
      const jpBegin = dayjs(evRes.beginning);
      /** Check merging date */
      if (
        wwBegin.year() >= 2021 &&
        wwBegin.month() >= 5 &&
        wwBegin.date() > 3 &&
        jpBegin.year() >= 2021 &&
        jpBegin.month() >= 5 &&
        jpBegin.date() > 3
      ) {
        setIsMerged(true);
      }
      setWWEventStart(wwBegin);
      setWWEventEnd(dayjs(evRes.english_end));
      setJPEventStart(jpBegin);
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

    const getItem = async () => {
      try {
        const res = await LLSIFService.fetchEventData(
          encodeURIComponent(route.params.eventName),
        );
        setItem(res);
        if (res) {
          await loadData(res);
        } else {
          throw new Error('Error');
        }
      } catch (error) {
        setIsError(error as Error);
      }
    };

    getItem();
  }, []);

  /** Navigate to destination screen */
  const goToSongDetail = (song: SongObject) => () => {
    navigation.navigate('SongDetailScreen', {item: song});
  };

  /** Navigate to destination screen */
  const goToCardDetail = (card: CardObject) => () => {
    navigation.navigate('CardDetailScreen', {item: card});
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
      backup: item?.english_name || '',
    });
  };

  const styleFastImage: StyleProp<ViewStyle> = {
    alignSelf: 'center',
    width: widthBanner,
    height: (widthBanner * imgSize.height) / imgSize.width,
  };

  return (
    <ScrollViewWithBackButton>
      {isLoading ? (
        <LoadingScreen />
      ) : !!isError || !item ? (
        <View className="flex-1 items-center justify-center">
          <Text>
            {(isError as LLSIFError)?.detail || (isError as Error)?.message}
          </Text>
          <Text>{route.params.eventName}</Text>
        </View>
      ) : (
        <>
          {isMerged ? (
            // Event block if merge
            <View className="items-center justify-center">
              <View className="items-center justify-center py-2.5">
                {item.english_name && <Text>{item.english_name}</Text>}
                <Text>{item.romaji_name}</Text>
              </View>
              {engImage && (
                <>
                  <TurboImage
                    resizeMode="contain"
                    source={{uri: engImage}}
                    style={styleFastImage}
                  />
                  <View className="h-2.5" />
                </>
              )}
              {image && (
                <TurboImage
                  resizeMode="contain"
                  source={{uri: image}}
                  style={styleFastImage}
                  onSuccess={({nativeEvent}) => {
                    setImgSize({
                      width: nativeEvent.width,
                      height: nativeEvent.height,
                    });
                  }}
                />
              )}
              <View className="items-center justify-center py-2.5">
                <Text>{`Start: ${JPEventStart.format('LLL')}`}</Text>
                <Text>{`End: ${JPEventEnd.format('LLL')}`}</Text>
                {item.japan_current && (
                  <Text>
                    <TimerCountdown seconds={JPEventEnd.diff(dayjs())} />
                    {' left'}
                  </Text>
                )}
                {item.japan_status === 'announced' && (
                  <Text>
                    {'Starts in '}
                    <TimerCountdown seconds={JPEventStart.diff(dayjs())} />
                  </Text>
                )}
                {item.japan_status !== 'announced' && (
                  <Button onPress={goToJpTracker}>Go to tracker</Button>
                )}
              </View>
            </View>
          ) : (
            <>
              {/* ENGLISH BLOCK */}
              {!!item.english_name && (
                <>
                  <View className="items-center justify-center">
                    <View className="items-center justify-center py-2.5">
                      <Text>Worldwide</Text>
                      <Text className="text-center">
                        {item.english_name || item.romaji_name}
                      </Text>
                    </View>
                    {engImage && (
                      <TurboImage
                        resizeMode="contain"
                        source={{uri: engImage}}
                        style={styleFastImage}
                      />
                    )}
                    <View className="items-center justify-center py-2.5">
                      <Text>{`Start: ${WWEventStart.format('LLL')}`}</Text>
                      <Text>{`End: ${WWEventEnd.format('LLL')}`}</Text>
                      {item.world_current && (
                        <Text>
                          <TimerCountdown seconds={WWEventEnd.diff(dayjs())} />
                          {' left'}
                        </Text>
                      )}
                      {item.english_status === 'announced' && (
                        <Text>
                          {'Starts in '}
                          <TimerCountdown
                            seconds={WWEventStart.diff(dayjs())}
                          />
                        </Text>
                      )}
                      {item.english_status !== 'announced' && (
                        <Button onPress={goToEnTracker}>Go to tracker</Button>
                      )}
                    </View>
                  </View>
                  <Separator />
                </>
              )}

              {/* JAPANESE BLOCK */}
              <View className="items-center justify-center">
                <View className="items-center justify-center py-2.5">
                  <Text>Japanese</Text>
                  <Text>{item.romaji_name}</Text>
                </View>
                {image && (
                  <TurboImage
                    resizeMode="contain"
                    source={{uri: image}}
                    style={styleFastImage}
                    onSuccess={({nativeEvent}) => {
                      setImgSize({
                        width: nativeEvent.width,
                        height: nativeEvent.height,
                      });
                    }}
                  />
                )}
                <View className="items-center justify-center py-2.5">
                  <Text>{`Start: ${JPEventStart.format('LLL')}`}</Text>
                  <Text>{`End: ${JPEventEnd.format('LLL')}`}</Text>
                  {item.japan_current && (
                    <Text>
                      <TimerCountdown seconds={JPEventEnd.diff(dayjs())} />
                      {' left'}
                    </Text>
                  )}
                  {item.japan_status === 'announced' && (
                    <Text>
                      {'Starts in '}
                      <TimerCountdown seconds={JPEventStart.diff(dayjs())} />
                    </Text>
                  )}
                  {item.japan_status !== 'announced' && (
                    <Button onPress={goToJpTracker}>Go to tracker</Button>
                  )}
                </View>
              </View>
            </>
          )}
          {/* SONGS */}
          {songs.length !== 0 && (
            <View>
              <Separator />
              <View className="items-center justify-center py-2.5">
                <Text>Song</Text>
              </View>
              <View className="flex-row flex-wrap justify-center">
                {songs.map((songItem, index) => {
                  const songImage = AddHTTPS(songItem.image);
                  return (
                    <PressableFeedback
                      key={`song${index}`}
                      className="m-2.5 items-center"
                      onPress={goToSongDetail(songItem)}>
                      <>
                        {songImage && (
                          <TurboImage
                            className="w-1/3"
                            source={{uri: songImage}}
                          />
                        )}
                        <View className="flex-row items-center gap-1 py-2.5">
                          <Image
                            className="h-6.25 w-6.25"
                            source={Images.multi[songItem.attribute]}
                          />
                          <View>
                            <Text>{songItem.name}</Text>
                            {songItem.romaji_name && (
                              <Text>{songItem.romaji_name}</Text>
                            )}
                          </View>
                        </View>
                      </>
                    </PressableFeedback>
                  );
                })}
              </View>
            </View>
          )}

          {cards.length > 0 && (
            <>
              <Separator />
              <View className="items-center justify-center py-2.5">
                <Text>Rewards</Text>
              </View>
            </>
          )}
          {/* CARDS */}
          <View className="flex-row flex-wrap justify-center">
            {cards.map((cardItem, index) => {
              const roundCardImage = AddHTTPS(cardItem.round_card_image);
              const roundCardIdolImage = AddHTTPS(
                cardItem.round_card_idolized_image,
              );

              return (
                <PressableFeedback
                  key={`card${index}`}
                  className="m-2.5 items-center"
                  onPress={goToCardDetail(cardItem)}>
                  <>
                    <View className="mx-2.5 flex-row">
                      {!!roundCardImage && (
                        <>
                          <TurboImage
                            className="h-8 w-8"
                            source={{uri: roundCardImage}}
                          />
                          <View className="w-1.25" />
                        </>
                      )}
                      {!!roundCardIdolImage && (
                        <TurboImage
                          className="h-8 w-8"
                          source={{uri: roundCardIdolImage}}
                        />
                      )}
                    </View>
                    <Text>{cardItem.idol.name}</Text>
                    {cardItem.other_event && <Text>(Worldwide only)</Text>}
                  </>
                </PressableFeedback>
              );
            })}
          </View>
        </>
      )}
    </ScrollViewWithBackButton>
  );
};

export default EventDetailScreen;
