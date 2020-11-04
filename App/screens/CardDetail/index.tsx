/* eslint-disable react/prop-types */
import React, { useContext, useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ViewStyle
} from 'react-native';
import { Text, Appbar, ProgressBar } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import LoadingScreen from '../Loading';
import UserContext from '~/Context/UserContext';
import TextRow from '~/Components/TextRow';
import { findColorByAttribute, AddHTTPS, setStatusBar } from '~/Utils';
import { Metrics, Fonts, AppStyles, Colors, Images } from '~/Theme';
import type { AttributeType, CardDetailScreenProps } from '~/Utils/types';

/**
 * Card detail screen
 *
 */
const CardDetailScreen: React.FC<CardDetailScreenProps> = ({
  navigation,
  route
}) => {
  const { item } = route.params;
  const { state } = useContext(UserContext);
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
  const maxStats = [
    state.cachedData?.maxStats?.Smile || 0,
    state.cachedData?.maxStats?.Pure || 0,
    state.cachedData?.maxStats?.Cool || 0
  ];
  const [done, setDone] = useState(false);
  const [imgViewer, setImgViewer] = useState({
    visible: false,
    index: 0
  });
  const [propertyLine, setPropertyLine] = useState('');
  const [images, setImages] = useState<{ uri: string }[]>([]);
  const [buttonID, setButtonID] = useState(0);
  const [currentStats, setCurrentStats] = useState(minStats);
  const [imgSize, setImgSize] = useState({
    width: 1,
    height: 0
  });
  const cardColors = findColorByAttribute(item.attribute);

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
    return () => setStatusBar(Colors.white);
  }, []);

  const ProgressUnit = ({
    text,
    stat,
    color
  }: {
    text: AttributeType;
    stat: number;
    color: string;
  }) => {
    let progress = 0;
    switch (text) {
      case 'Smile':
        progress = stat / maxStats[0];
        break;
      case 'Pure':
        progress = stat / maxStats[1];
        break;
      default:
        progress = stat / maxStats[2];
        break;
    }
    return (
      <View style={styles.progressRow}>
        <Text>{text}</Text>
        <View style={AppStyles.row}>
          <FastImage
            source={Images.attribute[text]}
            resizeMode='contain'
            style={[AppStyles.mediumIcon, styles.marginRight10]}
          />
          <View style={AppStyles.screen}>
            <Text>{stat}</Text>
            <ProgressBar progress={progress} color={color} />
          </View>
        </View>
      </View>
    );
  };

  function statButton(
    id: number,
    text: string,
    stats: number[],
    style?: ViewStyle
  ) {
    const white = { color: 'white' };

    const saveStat = () => {
      setCurrentStats(stats);
      setButtonID(id);
    };

    return (
      <TouchableOpacity
        onPress={saveStat}
        style={[
          styles.button,
          style,
          { backgroundColor: buttonID === id ? Colors.violet : Colors.inactive }
        ]}>
        <Text style={[Fonts.style.normal, white]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  function onLoadFastImage(e: OnLoadEvent) {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  }

  /**
   * Navigate to Event Detail Screen
   */
  const navigateToEventDetail = (name: string) => () => {
    navigation.navigate('EventDetailScreen', { eventName: name });
  };

  /**
   * Navigate to Idol Detail Screen
   */
  const navigateToIdolDetail = () => {
    navigation.navigate('IdolDetailScreen', { name: item.idol.name });
  };

  function renderImage(index: number, value: { uri: string }) {
    const onPressImg = () => setImgViewer({ visible: true, index });

    return (
      <TouchableOpacity key={index} onPress={onPressImg}>
        <FastImage
          source={{ uri: value.uri }}
          resizeMode='contain'
          style={{
            width: Metrics.images.itemWidth,
            height: (Metrics.images.itemWidth * imgSize.height) / imgSize.width
          }}
          onLoad={(e) => onLoadFastImage(e)}
        />
      </TouchableOpacity>
    );
  }

  const closeImgViewer = useCallback(
    () =>
      setImgViewer({
        ...imgViewer,
        visible: false
      }),
    []
  );

  return (
    <>
      <Appbar.Header style={{ backgroundColor: cardColors[1] }}>
        <Appbar.BackAction />
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
          style={styles.container}>
          {/* CARD IMAGES */}
          <View style={styles.imageRow}>
            {done && images.map((value, index) => renderImage(index, value))}
          </View>

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
          {Boolean(propertyLine) && <Text>{propertyLine}</Text>}

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
                  text: item.skill_details || '',
                  textStyle: styles.subtitleText
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
                  text: item.center_skill_details || '',
                  textStyle: styles.subtitleText
                }}
              />
            </>
          )}

          {!!item.event && (
            <>
              <TextRow
                item1={{
                  text: 'Event',
                  flex: 1,
                  textStyle: Fonts.style.normal
                }}
                item2={{
                  text: item.event.japanese_name,
                  flex: 4,
                  textStyle: Fonts.style.normal
                }}
              />
              {item.event.english_name !== null && (
                <TextRow
                  item1={{ text: '', flex: 1, textStyle: Fonts.style.normal }}
                  item2={{
                    text: item.event.english_name || '',
                    flex: 4,
                    textStyle: Fonts.style.normal
                  }}
                />
              )}
              <TouchableOpacity
                style={AppStyles.center}
                onPress={navigateToEventDetail(item.event.japanese_name)}>
                <FastImage
                  source={{ uri: AddHTTPS(item.event.image) }}
                  style={styles.banner}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </TouchableOpacity>
              {!!item.other_event && (
                <View>
                  <TextRow
                    item1={{
                      text: '',
                      flex: 1,
                      textStyle: Fonts.style.normal
                    }}
                    item2={{
                      text: item.other_event.english_name || '',
                      flex: 4,
                      textStyle: Fonts.style.normal
                    }}
                  />
                  <TouchableOpacity
                    style={AppStyles.center}
                    onPress={navigateToEventDetail(
                      item.other_event.japanese_name
                    )}>
                    <FastImage
                      source={{ uri: AddHTTPS(item.other_event.image) }}
                      style={styles.banner}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </>
          )}

          {item.hp !== 0 && done && (
            <>
              <View style={AppStyles.row}>
                <Icon
                  name='ios-heart'
                  size={Metrics.icons.medium}
                  color={'red'}
                />
                <Text style={Fonts.style.normal}> : {item.hp}</Text>
              </View>
            </>
          )}

          {/* STATS */}
          {item.hp !== 0 && done && (
            <View>
              <View style={styles.buttonRow}>
                {statButton(0, 'Level 1', minStats, styles.leftRadius)}
                {item.non_idolized_maximum_statistics_smile !== 0 &&
                  statButton(
                    1,
                    `Level ${item.non_idolized_max_level || 0}`,
                    nonIdolMaxStats
                  )}
                {item.idolized_max_level !== 0 &&
                  statButton(
                    2,
                    `Level ${item.idolized_max_level || 0}`,
                    idolMaxStats,
                    styles.rightRadius
                  )}
              </View>
              <ProgressUnit
                text='Smile'
                stat={currentStats[0]}
                color={Colors.pink}
              />
              <ProgressUnit
                text='Pure'
                stat={currentStats[1]}
                color={Colors.green}
              />
              <ProgressUnit
                text='Cool'
                stat={currentStats[2]}
                color={Colors.blue}
              />
            </View>
          )}
          <View style={{ height: Metrics.doubleBaseMargin }} />
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
  button: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 1,
    paddingVertical: Metrics.baseMargin
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Metrics.baseMargin
  },
  container: {
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Metrics.doubleBaseMargin
  },
  leftRadius: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
  },
  marginRight10: {
    marginRight: Metrics.baseMargin
  },
  progressRow: {
    paddingVertical: Metrics.baseMargin
  },
  rightHeaderImage: {
    height: 70,
    width: 70
  },
  rightRadius: {
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  },
  subtitleText: {
    fontSize: Fonts.size.medium
  }
});

export default CardDetailScreen;
