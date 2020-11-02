import React, {
  useContext, useState, useEffect, useCallback,
} from 'react';
import {
  Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import useStatusBar from '~/hooks/useStatusBar';
import UserContext from '~/Context/UserContext';
import TextRow from '~/Components/TextRow/TextRow';
import Seperator from '~/Components/Seperator/Seperator';
import ProgressBar from '~/Components/ProgressBar/ProgressBar';
import {
  findColorByAttribute, AddHTTPS, findMainUnit, findSubUnit,
} from '~/Utils';
import {
  Metrics, Fonts, ApplicationStyles, Colors, Images,
} from '~/Theme';
import { Config } from '~/Config';
import styles from './styles';

/**
 * Card detail screen
 *
 */
function CardDetailScreen({ navigation, route }) {
  const { item } = route.params;
  const { state } = useContext(UserContext);
  const minStats = [
    item.minimum_statistics_smile,
    item.minimum_statistics_pure,
    item.minimum_statistics_cool,
  ];
  const nonIdolMaxStats = [
    item.non_idolized_maximum_statistics_smile,
    item.non_idolized_maximum_statistics_pure,
    item.non_idolized_maximum_statistics_cool,
  ];
  const idolMaxStats = [
    item.idolized_maximum_statistics_smile,
    item.idolized_maximum_statistics_pure,
    item.idolized_maximum_statistics_cool,
  ];
  const maxStats = [
    state.cachedData.maxStats.Smile,
    state.cachedData.maxStats.Pure,
    state.cachedData.maxStats.Cool,
  ];
  const [done, setDone] = useState(false);
  const [imgViewer, setImgViewer] = useState({
    visible: false,
    index: 0,
  });
  const [propertyLine, setPropertyLine] = useState('');
  const [images, setImages] = useState([]);
  const [buttonID, setButtonID] = useState(0);
  const [currentStats, setCurrentStats] = useState(minStats);
  const [imgSize, setImgSize] = useState({
    width: 1,
    height: 0,
  });
  const colors = findColorByAttribute(route.params.item.attribute);
  useStatusBar('dark-content', colors[1]);

  useEffect(() => {
    const tmpImages = [];
    if (item.card_image !== null) {
      tmpImages.push({ uri: AddHTTPS(item.card_image) });
    }
    tmpImages.push({ uri: AddHTTPS(item.card_idolized_image) });
    setImages(tmpImages);
    const tmp = [];
    if (item.is_promo) tmp.push('Promo card');
    if (item.japan_only) tmp.push('Japan only');
    setPropertyLine(tmp.join(' - '));

    const mainUnit = findMainUnit(item.idol.main_unit);
    const subUnit = findSubUnit(item.idol.sub_unit);

    const headerTitle = () => <TouchableOpacity onPress={navigateToIdolDetail}>
      <Text style={Fonts.style.normal}>{item.idol.name}</Text>
    </TouchableOpacity>;

    const headerRight = () => <View style={styles.rightRow}>
      <FastImage source={mainUnit}
        resizeMode='contain'
        style={styles.rightHeaderImage} />
      <FastImage source={subUnit}
        resizeMode='contain'
        style={styles.rightHeaderImage} />
    </View>;

    navigation.setOptions({
      headerStyle: { backgroundColor: colors[1] },
      headerTitle,
      headerRight,
    });
    setDone(true);
  }, []);

  function progressSmile(stat) {
    return (100 * stat) / maxStats[0];
  }

  function progressPure(stat) {
    return (100 * stat) / maxStats[1];
  }

  function progressCool(stat) {
    return (100 * stat) / maxStats[2];
  }

  function progressUnit(text, stat, color) {
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
          <FastImage source={Images.attribute[icon]}
            resizeMode='contain'
            style={[ApplicationStyles.mediumIcon, styles.marginRight10]} />
          <ProgressBar number={stat}
            progress={progress}
            fillStyle={{ backgroundColor: color }} />
        </View>
      </View>
    );
  }

  function progressView(stats) {
    return <View>
      {progressUnit('Smile', stats[0], Colors.pink)}
      {progressUnit('Pure', stats[1], Colors.green)}
      {progressUnit('Cool', stats[2], Colors.blue)}
    </View>;
  }

  function statButton(id, text, stats, style) {
    const white = { color: 'white' };

    const saveStat = () => {
      setCurrentStats(stats);
      setButtonID(id);
    };

    return <TouchableOpacity onPress={saveStat}
      style={[
        styles.button, style,
        { backgroundColor: buttonID === id ? Colors.violet : Colors.inactive },
      ]}>
      <Text style={[Fonts.style.normal, white]}>{text}</Text>
    </TouchableOpacity>;
  }

  function onLoadFastImage(e) {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  }

  /**
   * Navigate to Event Detail Screen
   *
   */
  const navigateToEventDetail = (name) => () => {
    navigation.navigate('EventDetailScreen', { eventName: name });
  };

  /**
   * Navigate to Idol Detail Screen
   *
   */
  const navigateToIdolDetail = () => {
    navigation.navigate('IdolDetailScreen', { name: item.idol.name });
  };

  function renderImage(index, value) {
    const onPressImg = () => setImgViewer({ visible: true, index });

    return <TouchableOpacity key={index} onPress={onPressImg}>
      <FastImage source={{ uri: value.uri }}
        resizeMode='contain'
        style={{
          width: Metrics.images.itemWidth,
          height: (Metrics.images.itemWidth * imgSize.height) / imgSize.width,
        }}
        onLoad={(e) => onLoadFastImage(e)} />
    </TouchableOpacity>;
  }

  const closeImgViewer = useCallback(() => setImgViewer({
    ...imgViewer,
    visible: false,
  }), []);

  if (!done) {
    return <View />;
  }

  return <>
    <LinearGradient style={ApplicationStyles.screen}
      colors={[colors[1], colors[0]]}>
      <ScrollView showsVerticalScrollIndicator={false}
        style={styles.scrollView}>
        {/* CARD IMAGES */}
        <SkeletonContent isLoading={!done}
          containerStyle={styles.imageRow}
          layout={[styles.skCard, styles.skCard]}>
          {images.map((value, index) => renderImage(index, value))}
        </SkeletonContent>

        {/* INFORMATION */}
        <View style={styles.informationBlock}>
          <SkeletonContent isLoading={!done}
            containerStyle={styles.skFlexStart}
            layout={[styles.skText1, styles.skText2]}>
            <TextRow item1={{ flex: 1, text: 'Card ID' }}
              item2={{ flex: 2, text: item.game_id }} />
            <TextRow item1={{ flex: 1, text: 'Release date' }}
              item2={{
                flex: 2,
                text: moment(item.release_date).format(Config.DATE_FORMAT_OUTPUT),
              }} />
          </SkeletonContent>
          {Boolean(propertyLine) && <Text>{propertyLine}</Text>}

          {(item.skill !== null && item.skill.length !== 0)
            && <View>
              <Seperator />
              <TextRow item1={{ flex: 1, text: 'Skill' }}
                item2={{ flex: 2, text: item.skill }} />
              <TextRow item1={{ flex: 1, text: '' }}
                item2={{
                  flex: 2,
                  text: item.skill_details,
                  textStyle: styles.subtitleText,
                }} />
            </View>}

          {(item.center_skill !== null
            && item.center_skill.length !== 0)
            && <View>
              <Seperator />
              <TextRow item1={{ flex: 1, text: 'Center skill' }}
                item2={{ flex: 2, text: item.center_skill }} />
              <TextRow item1={{ flex: 1, text: '' }}
                item2={{
                  flex: 2,
                  text: item.center_skill_details,
                  textStyle: styles.subtitleText,
                }} />
            </View>}

          {item.event !== null
            && <View>
              <Seperator />
              <TextRow item1={{ text: 'Event', flex: 1, textStyle: Fonts.style.normal }}
                item2={{
                  text: item.event.japanese_name,
                  flex: 4,
                  textStyle: Fonts.style.normal,
                }} />
              {item.event.english_name !== null
                && <TextRow item1={{ text: '', flex: 1, textStyle: Fonts.style.normal }}
                  item2={{
                    text: item.event.english_name,
                    flex: 4,
                    textStyle: Fonts.style.normal,
                  }} />}
              <TouchableOpacity style={ApplicationStyles.center}
                onPress={navigateToEventDetail(item.event.japanese_name)}>
                <FastImage source={{ uri: AddHTTPS(item.event.image) }}
                  style={styles.banner}
                  resizeMode={FastImage.resizeMode.contain} />
              </TouchableOpacity>
              {item.other_event !== null
                && <View>
                  <TextRow item1={{ text: '', flex: 1, textStyle: Fonts.style.normal }}
                    item2={{
                      text: item.other_event.english_name,
                      flex: 4,
                      textStyle: Fonts.style.normal,
                    }} />
                  <TouchableOpacity style={ApplicationStyles.center}
                    onPress={navigateToEventDetail(item.other_event.japanese_name)}>
                    <FastImage source={{ uri: AddHTTPS(item.other_event.image) }}
                      style={styles.banner}
                      resizeMode={FastImage.resizeMode.contain} />
                  </TouchableOpacity>
                </View>}
            </View>}

          {item.hp !== 0 && done
            && <View>
              <Seperator />
              <View style={ApplicationStyles.row}>
                <Icon name='ios-heart' size={Metrics.icons.medium} color={'red'} />
                <Text style={Fonts.style.normal}> : {item.hp}</Text>
              </View>
            </View>}
        </View>

        {/* STATS */}
        {item.hp !== 0 && done
          && <View>
            <View style={styles.buttonRow}>
              {statButton(0, 'Level 1', minStats, styles.leftRadius)}
              {item.non_idolized_maximum_statistics_smile !== 0
                && statButton(1, `Level ${item.non_idolized_max_level}`, nonIdolMaxStats)}
              {item.idolized_max_level !== 0
                && statButton(2, `Level ${item.idolized_max_level}`, idolMaxStats, styles.rightRadius)}
            </View>
            {progressView(currentStats)}
          </View>}
        <View style={{ height: Metrics.doubleBaseMargin }} />
      </ScrollView>
    </LinearGradient>
    <ImageView
      images={images}
      imageIndex={imgViewer.index}
      visible={imgViewer.visible}
      onRequestClose={closeImgViewer} />
  </>;
}

CardDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        attribute: PropTypes.any,
        card_image: PropTypes.string,
        card_idolized_image: PropTypes.string,
        is_promo: PropTypes.bool,
        japan_only: PropTypes.bool,
        minimum_statistics_smile: PropTypes.any,
        minimum_statistics_pure: PropTypes.any,
        minimum_statistics_cool: PropTypes.any,
        non_idolized_maximum_statistics_smile: PropTypes.any,
        non_idolized_maximum_statistics_pure: PropTypes.any,
        non_idolized_maximum_statistics_cool: PropTypes.any,
        idolized_maximum_statistics_smile: PropTypes.any,
        idolized_maximum_statistics_pure: PropTypes.any,
        idolized_maximum_statistics_cool: PropTypes.any,
        idol: PropTypes.shape({
          name: PropTypes.string,
          main_unit: PropTypes.string,
          sub_unit: PropTypes.string,
        }),
        game_id: PropTypes.any,
        release_date: PropTypes.any,
        skill: PropTypes.any,
        skill_details: PropTypes.any,
        center_skill: PropTypes.any,
        center_skill_details: PropTypes.any,
        event: PropTypes.shape({
          japanese_name: PropTypes.string,
          english_name: PropTypes.string,
          image: PropTypes.string,
        }),
        other_event: PropTypes.shape({
          japanese_name: PropTypes.string,
          english_name: PropTypes.string,
          image: PropTypes.string,
        }),
        hp: PropTypes.any,
        non_idolized_max_level: PropTypes.any,
        idolized_max_level: PropTypes.any,
      }),
    }),
  }),
};

export default CardDetailScreen;
