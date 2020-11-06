import React, { useState } from 'react';
import { View, ScrollView, Image, StyleProp, StyleSheet } from 'react-native';
import {
  Divider,
  Text,
  Title,
  TouchableRipple,
  useTheme
} from 'react-native-paper';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import FastImage, { ImageStyle } from 'react-native-fast-image';
import dayjs, { Dayjs } from 'dayjs';

import TimerCountdown from '~/Components/TimerCountdown';
import { AddHTTPS } from '~/Utils';
import { EventStatus } from '~/Config';
import { Metrics, Images, Fonts, AppStyles } from '~/Theme';
import type { CardObject, EventObject, SongObject } from '~/Utils/types';

type Props = {
  item: EventObject | null;
  WWEventStart: Dayjs;
  WWEventEnd: Dayjs;
  JPEventStart: Dayjs;
  JPEventEnd: Dayjs;
  cards: CardObject[];
  songs: SongObject[];
};

const Information: React.FC<Props> = ({
  item,
  WWEventStart,
  WWEventEnd,
  JPEventStart,
  JPEventEnd,
  cards,
  songs
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
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

  if (!item) return <View />;
  return (
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
                onPress={navigateTo('SongDetailScreen', songItem)}
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
            onPress={navigateTo('CardDetailScreen', cardItem)}
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

Information.propTypes = {
  item: PropTypes.any,
  WWEventStart: PropTypes.any,
  WWEventEnd: PropTypes.any,
  JPEventStart: PropTypes.any,
  JPEventEnd: PropTypes.any,
  cards: PropTypes.any,
  songs: PropTypes.any
};

export default Information;
