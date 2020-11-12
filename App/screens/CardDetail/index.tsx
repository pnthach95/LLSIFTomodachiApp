import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Text,
  Caption,
  Appbar,
  Button,
  TouchableRipple
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import LoadingScreen from '../Loading';
import SPCStats from '~/Components/SPCStats';
import TextRow from '~/Components/TextRow';
import { findColorByAttribute, AddHTTPS, setStatusBar } from '~/Utils';
import { Metrics, AppStyles, Colors, Images } from '~/Theme';
import type { CardDetailScreenProps } from '~/Utils/types';

const { itemWidth, cardHeight, cardWidth } = Metrics.images;

/**
 * Card detail screen
 */
const CardDetailScreen: React.FC<CardDetailScreenProps> = ({
  navigation,
  route
}) => {
  const { item } = route.params;
  const minStats = [
    item.minimum_statistics_smile || 0,
    item.minimum_statistics_pure || 0,
    item.minimum_statistics_cool || 0
  ];
  const nonIdolMaxStats = [
    item.non_idolized_maximum_statistics_smile || 0,
    item.non_idolized_maximum_statistics_pure || 0,
    item.non_idolized_maximum_statistics_cool || 0
  ];
  const idolMaxStats = [
    item.idolized_maximum_statistics_smile || 0,
    item.idolized_maximum_statistics_pure || 0,
    item.idolized_maximum_statistics_cool || 0
  ];
  const insets = useSafeAreaInsets();
  const [done, setDone] = useState(false);
  const [imgViewer, setImgViewer] = useState({ visible: false, index: 0 });
  const [propertyLine, setPropertyLine] = useState('');
  const [images, setImages] = useState<{ uri: string }[]>([]);
  const [buttonID, setButtonID] = useState(0);
  const [currentStats, setCurrentStats] = useState(minStats);
  const cardColors = findColorByAttribute(item.attribute);
  const bottom = { paddingBottom: insets.bottom };

  useEffect(() => {
    setStatusBar(cardColors[0]);
    const tmpImages = [];
    if (item.card_image) {
      tmpImages.push({ uri: AddHTTPS(item.card_image) });
    }
    tmpImages.push({ uri: AddHTTPS(item.card_idolized_image) });
    setImages(tmpImages);
    const tmp = [];
    if (item.is_promo) tmp.push('Promo card');
    if (item.japan_only) tmp.push('Japan only');
    setPropertyLine(tmp.join(' - '));
    setDone(true);
    return () => setStatusBar(route.params.prevStatusBarColor);
  }, []);

  const StatButton = ({
    id,
    text,
    stats
  }: {
    id: number;
    text: string;
    stats: number[];
  }) => {
    const saveStat = () => {
      setCurrentStats(stats);
      setButtonID(id);
    };

    return (
      <Button
        mode='contained'
        color={buttonID === id ? Colors.violet : Colors.inactive}
        onPress={saveStat}>
        <Text style={styles.whiteText}>{text}</Text>
      </Button>
    );
  };

  const goToEvent = () =>
    navigation.navigate('EventDetailScreen', {
      eventName: item.event?.japanese_name || '',
      prevStatusBarColor: cardColors[0]
    });

  const goToOtherEvent = () =>
    navigation.navigate('EventDetailScreen', {
      eventName: item.other_event?.japanese_name || '',
      prevStatusBarColor: cardColors[0]
    });

  /**
   * Navigate to Idol Detail Screen
   */
  const navigateToIdolDetail = () => {
    navigation.navigate('IdolDetailScreen', {
      name: item.idol.name,
      prevStatusBarColor: cardColors[0]
    });
  };

  const RenderImage = ({
    index,
    value
  }: {
    index: number;
    value: { uri: string };
  }) => {
    const onPressImg = () => setImgViewer({ visible: true, index });

    return (
      <TouchableRipple
        borderless
        onPress={onPressImg}
        rippleColor={cardColors[0]}>
        <FastImage
          source={{ uri: value.uri }}
          resizeMode='contain'
          style={styles.card}
        />
      </TouchableRipple>
    );
  };

  const closeImgViewer = useCallback(
    () =>
      setImgViewer({
        ...imgViewer,
        visible: false
      }),
    []
  );

  const goBack = () => navigation.goBack();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: cardColors[1] }}>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={item.idol.name} onPress={navigateToIdolDetail} />
        {!!item.idol.main_unit && (
          <FastImage
            source={Images.mainUnit[item.idol.main_unit]}
            resizeMode='contain'
            style={styles.rightHeaderImage}
          />
        )}
        {!!item.idol.sub_unit && (
          <FastImage
            source={Images.subUnit[item.idol.sub_unit]}
            resizeMode='contain'
            style={styles.rightHeaderImage}
          />
        )}
      </Appbar.Header>
      {done ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={bottom}>
          {/* CARD IMAGES */}
          <View style={styles.imageRow}>
            {done &&
              images.map((value, index) => (
                <RenderImage key={index} index={index} value={value} />
              ))}
          </View>
          <View style={styles.container}>
            {/* INFORMATION */}
            <TextRow
              item1={{ flex: 1, text: 'Card ID' }}
              item2={{ flex: 2, text: item.game_id }}
            />
            <TextRow
              item1={{ flex: 1, text: 'Release date' }}
              item2={{
                flex: 2,
                text: dayjs(item.release_date).format('LL')
              }}
            />
            {Boolean(propertyLine) && <Caption>{propertyLine}</Caption>}

            {!!item.skill && (
              <>
                <TextRow
                  item1={{ flex: 1, text: 'Skill' }}
                  item2={{ flex: 2, text: item.skill }}
                />
                <TextRow
                  item1={{ flex: 1, text: '' }}
                  item2={{
                    flex: 2,
                    text: item.skill_details || ''
                  }}
                />
              </>
            )}

            {!!item.center_skill && (
              <>
                <TextRow
                  item1={{ flex: 1, text: 'Center skill' }}
                  item2={{ flex: 2, text: item.center_skill }}
                />
                <TextRow
                  item1={{ flex: 1, text: '' }}
                  item2={{
                    flex: 2,
                    text: item.center_skill_details || ''
                  }}
                />
              </>
            )}

            {!!item.event && (
              <>
                <TextRow
                  item1={{
                    text: 'Event',
                    flex: 1
                  }}
                  item2={{
                    text: item.event.japanese_name,
                    flex: 2
                  }}
                />
                {item.event.english_name !== null && (
                  <TextRow
                    item1={{ text: '', flex: 1 }}
                    item2={{
                      text: item.event.english_name || '',
                      flex: 2
                    }}
                  />
                )}
                <TouchableRipple
                  style={[AppStyles.center, styles.bannerContainer]}
                  onPress={goToEvent}>
                  <FastImage
                    source={{ uri: AddHTTPS(item.event.image) }}
                    style={styles.banner}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableRipple>
                {!!item.other_event && (
                  <View>
                    <TextRow
                      item1={{
                        text: '',
                        flex: 1
                      }}
                      item2={{
                        text: item.other_event.english_name || '',
                        flex: 2
                      }}
                    />
                    <TouchableRipple
                      style={[AppStyles.center, styles.bannerContainer]}
                      onPress={goToOtherEvent}>
                      <FastImage
                        source={{ uri: AddHTTPS(item.other_event.image) }}
                        style={styles.banner}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </TouchableRipple>
                  </View>
                )}
              </>
            )}

            {/* STATS */}
            {item.hp !== 0 && (
              <>
                <View style={AppStyles.row}>
                  <Icon
                    name='ios-heart'
                    size={Metrics.icons.small}
                    color={Colors.red600}
                  />
                  <Text>: {item.hp}</Text>
                </View>
                <View style={styles.buttonRow}>
                  <StatButton id={0} text='Level 1' stats={minStats} />
                  {item.non_idolized_maximum_statistics_smile !== 0 && (
                    <StatButton
                      id={1}
                      text={`Level ${item.non_idolized_max_level || 0}`}
                      stats={nonIdolMaxStats}
                    />
                  )}
                  {item.idolized_max_level !== 0 && (
                    <StatButton
                      id={2}
                      text={`Level ${item.idolized_max_level || 0}`}
                      stats={idolMaxStats}
                    />
                  )}
                </View>
                <SPCStats text='Smile' stat={currentStats[0]} />
                <SPCStats text='Pure' stat={currentStats[1]} />
                <SPCStats text='Cool' stat={currentStats[2]} />
              </>
            )}
          </View>
        </ScrollView>
      ) : (
        <LoadingScreen />
      )}
      <ImageView
        images={images}
        imageIndex={imgViewer.index}
        visible={imgViewer.visible}
        onRequestClose={closeImgViewer}
      />
    </>
  );
};

const styles = StyleSheet.create({
  banner: {
    height: 100,
    width: responsiveWidth(80)
  },
  bannerContainer: {
    paddingVertical: Metrics.baseMargin
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Metrics.baseMargin
  },
  card: {
    height: (itemWidth * cardHeight) / cardWidth,
    width: itemWidth
  },
  container: {
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Metrics.doubleBaseMargin
  },
  rightHeaderImage: {
    height: 70,
    width: 70
  },
  whiteText: {
    color: Colors.white
  }
});

CardDetailScreen.propTypes = {
  route: PropTypes.any
};

export default CardDetailScreen;
