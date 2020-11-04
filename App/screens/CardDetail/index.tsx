import React, { useContext, useState, useEffect, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';

import useStatusBar from '~/hooks/useStatusBar';
import UserContext from '~/Context/UserContext';
import TextRow from '~/Components/TextRow';
import ProgressBar from '~/Components/ProgressBar';
import {
  findColorByAttribute,
  AddHTTPS,
  findMainUnit,
  findSubUnit
} from '~/Utils';
import { Metrics, Fonts, AppStyles, Colors, Images } from '~/Theme';
import { Config } from '~/Config';
import styles from './styles';
import type { CardDetailScreenProps } from '~/Utils/types';

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
  const colors = findColorByAttribute(route.params.item.attribute);

  useEffect(() => {
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

    const mainUnit = findMainUnit(item.idol.main_unit || '');
    const subUnit = findSubUnit(item.idol.sub_unit || '');

    const headerTitle = () => (
      <TouchableOpacity onPress={navigateToIdolDetail}>
        <Text style={Fonts.style.normal}>{item.idol.name}</Text>
      </TouchableOpacity>
    );

    const headerRight = () => (
      <View style={styles.rightRow}>
        {mainUnit && (
          <FastImage
            source={Images.mainUnit[mainUnit]}
            resizeMode='contain'
            style={styles.rightHeaderImage}
          />
        )}
        {subUnit && (
          <FastImage
            source={Images.subUnit[subUnit]}
            resizeMode='contain'
            style={styles.rightHeaderImage}
          />
        )}
      </View>
    );

    navigation.setOptions({
      headerStyle: { backgroundColor: colors[1] },
      headerTitle,
      headerRight
    });
    setDone(true);
  }, []);

  function progressSmile(stat: number) {
    return (100 * stat) / maxStats[0];
  }

  function progressPure(stat: number) {
    return (100 * stat) / maxStats[1];
  }

  function progressCool(stat: number) {
    return (100 * stat) / maxStats[2];
  }

  function progressUnit(text: string, stat: number, color: string) {
    let icon = 2;
    let progress = 0;
    switch (text) {
      case 'Smile':
        icon = 0;
        progress = progressSmile(stat);
        break;
      case 'Pure':
        icon = 1;
        progress = progressPure(stat);
        break;
      default:
        icon = 2;
        progress = progressCool(stat);
        break;
    }
    return (
      <View style={{ width: Metrics.screenWidth }}>
        <Text style={[Fonts.style.normal, styles.progressText]}>{text}</Text>
        <View style={styles.progressRow}>
          <FastImage
            source={Images.attribute[icon]}
            resizeMode='contain'
            style={[AppStyles.mediumIcon, styles.marginRight10]}
          />
          <ProgressBar
            number={stat}
            progress={progress}
            fillStyle={{ backgroundColor: color }}
          />
        </View>
      </View>
    );
  }

  function progressView(stats: number[]) {
    return (
      <View>
        {progressUnit('Smile', stats[0], Colors.pink)}
        {progressUnit('Pure', stats[1], Colors.green)}
        {progressUnit('Cool', stats[2], Colors.blue)}
      </View>
    );
  }

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
   *
   */
  const navigateToEventDetail = (name: string) => () => {
    navigation.navigate('EventDetailScreen', { eventName: name });
  };

  /**
   * Navigate to Idol Detail Screen
   *
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

  if (done) {
    return <View />;
  }

  return (
    <>
      <LinearGradient style={AppStyles.screen} colors={[colors[1], colors[0]]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}>
          {/* CARD IMAGES */}
          {done && images.map((value, index) => renderImage(index, value))}

          {/* INFORMATION */}
          <View style={styles.informationBlock}>
            {done && (
              <>
                <TextRow
                  item1={{ flex: 1, text: 'Card ID' }}
                  item2={{ flex: 2, text: item.game_id }}
                />
                <TextRow
                  item1={{ flex: 1, text: 'Release date' }}
                  item2={{
                    flex: 2,
                    text: dayjs(item.release_date).format(
                      Config.DATE_FORMAT_OUTPUT
                    )
                  }}
                />
              </>
            )}
            {Boolean(propertyLine) && <Text>{propertyLine}</Text>}

            {!!item.skill && (
              <View>
                <Divider />
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
              </View>
            )}

            {!!item.center_skill && (
              <View>
                <Divider />
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
              </View>
            )}

            {!!item.event && (
              <View>
                <Divider />
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
              </View>
            )}

            {item.hp !== 0 && done && (
              <View>
                <Divider />
                <View style={AppStyles.row}>
                  <Icon
                    name='ios-heart'
                    size={Metrics.icons.medium}
                    color={'red'}
                  />
                  <Text style={Fonts.style.normal}> : {item.hp}</Text>
                </View>
              </View>
            )}
          </View>

          {/* STATS */}
          {item.hp !== 0 && done && (
            <View>
              <View style={styles.buttonRow}>
                {statButton(0, 'Level 1', minStats, styles.leftRadius)}
                {item.non_idolized_maximum_statistics_smile !== 0 &&
                  statButton(
                    1,
                    `Level ${item.non_idolized_max_level}`,
                    nonIdolMaxStats
                  )}
                {item.idolized_max_level !== 0 &&
                  statButton(
                    2,
                    `Level ${item.idolized_max_level}`,
                    idolMaxStats,
                    styles.rightRadius
                  )}
              </View>
              {progressView(currentStats)}
            </View>
          )}
          <View style={{ height: Metrics.doubleBaseMargin }} />
        </ScrollView>
      </LinearGradient>
      <ImageView
        images={images}
        imageIndex={imgViewer.index}
        visible={imgViewer.visible}
        onRequestClose={closeImgViewer}
      />
    </>
  );
};

export default CardDetailScreen;
