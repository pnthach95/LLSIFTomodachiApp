import React, { useState, useEffect, useContext } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import useStatusBar from '~/hooks/useStatusBar';
import UserContext from '~/Context/UserContext';
import StarBar from '~/Components/StarBar';
import ProgressBar from '~/Components/ProgressBar';
import TextRow from '~/Components/TextRow';
import LoadingScreen from '../Loading';
import { findColorByAttribute, AddHTTPS, findMainUnit } from '~/Utils';
import { Metrics, AppStyles, Colors, Images } from '~/Theme';
import styles from './styles';

/**
 * Song Detail Screen
 *
 * From parent screen, pass `item` (Song object) to show detail
 *
 * State:
 * - `item`: [Song object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#objects)
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `colors`: Color array
 * - `currentStats`: To show stats when choosing Mode
 * - `buttonID`: ID for choosing Mode button
 * - `easy`: [note number, stars]
 * - `normal`: [note number, stars]
 * - `hard`: [note number, stars]
 * - `expert`: [note number, stars]
 * - `random`: [note number, stars]
 * - `master`: [note number, stars]
 * - `isLoading`: Loading state
 *
 */
function SongDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const { state } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [imgSize, setImgSize] = useState({
    height: 0,
    width: 1
  });
  const [buttonID, setButtonID] = useState(0);
  const [currentStats, setCurrentStats] = useState([]);
  const name =
    item.name + (item.romaji_name !== null ? `\n${item.romaji_name}` : '');
  const colors = findColorByAttribute(item.attribute);
  const [easy, setEasy] = useState([]);
  const [normal, setNormal] = useState([]);
  const [hard, setHard] = useState([]);
  const [expert, setExpert] = useState([]);
  const [random, setRandom] = useState([]);
  const [master, setMaster] = useState([]);

  useEffect(() => {
    const easyArray = [];
    for (let i = 0; i < item.easy_difficulty; i += 1) {
      easyArray.push(setColor(i));
    }
    setEasy([item.easy_notes, easyArray]);
    const normalArray = [];
    for (let i = 0; i < item.normal_difficulty; i += 1) {
      normalArray.push(setColor(i));
    }
    setNormal([item.normal_notes, normalArray]);
    const hardArray = [];
    for (let i = 0; i < item.hard_difficulty; i += 1) {
      hardArray.push(setColor(i));
    }
    setHard([item.hard_notes, hardArray]);
    const expertArray = [];
    for (let i = 0; i < item.expert_difficulty; i += 1) {
      expertArray.push(setColor(i));
    }
    setExpert([item.expert_notes, expertArray]);
    const expertRandomArray = [];
    if (item.expert_random_difficulty) {
      for (let i = 0; i < item.expert_random_difficulty; i += 1) {
        expertRandomArray.push(setColor(i));
      }
    }
    setRandom([item.expert_notes, expertRandomArray]);
    const masterArray = [];
    if (item.master_difficulty) {
      for (let i = 0; i < item.master_difficulty; i += 1) {
        masterArray.push(setColor(i));
      }
    }
    setMaster([item.master_notes, masterArray]);
    setCurrentStats([item.easy_notes, easyArray]);
    const mainunit = findMainUnit(item.main_unit);
    const unitIcon = () =>
      mainunit && (
        <FastImage
          source={Images.mainUnit[mainunit]}
          resizeMode='contain'
          style={styles.rightHeaderImage}
        />
      );
    navigation.setOptions({
      headerStyle: { backgroundColor: colors[1] },
      headerTitle: name,
      headerRight: unitIcon
    });
    setIsLoading(false);
  }, []);

  /**
   * Get width, height of image in FastImage
   *
   * @param {*} e
   */
  const onLoadFastImage = (e) => {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  };

  /**
   * Set color for star
   *
   * @param {Number} index
   */
  function setColor(index) {
    if (index < 3) return 0;
    if (index < 6) return 1;
    if (index < 9) return 2;
    return 3;
  }

  /**
   * Convert seconds to m:ss
   *
   * @param {Number} time
   */
  function formatTime(time) {
    const minutes = parseInt(((time / 60) % 60).toString(), 10);
    let seconds = time % 60;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  /**
   * Navigate to Event Detail Screen
   *
   */
  const navigateToEventDetail = () => {
    navigation.navigate('EventDetailScreen', { event: item.event });
  };

  /**
   * Render choosing stat button
   *
   * @param {Number} id
   * @param {String} text
   * @param {Array} stat
   * @param {Object} style
   */
  function statButton(id, text, stat, style) {
    const white = { color: 'white' };
    const onPress = () => {
      setButtonID(id);
      setCurrentStats(stat);
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          style,
          { backgroundColor: buttonID === id ? Colors.violet : Colors.inactive }
        ]}>
        <Text style={white}>{text}</Text>
      </TouchableOpacity>
    );
  }

  const progressStat = (stat) => (100 * stat) / state.cachedData.songsMaxStats;

  if (isLoading) return <LoadingScreen />;

  return (
    <LinearGradient colors={[colors[1], colors[1]]} style={styles.content}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
        style={AppStyles.screen}>
        <FastImage
          source={{ uri: AddHTTPS(item.image) }}
          onLoad={onLoadFastImage}
          resizeMode='contain'
          style={{
            width: Metrics.screenWidth / 2,
            height: ((Metrics.screenWidth / 2) * imgSize.height) / imgSize.width
          }}
        />
        <View style={styles.height10} />

        <TextRow
          item1={{ text: 'Attribute', flex: 1 }}
          item2={{ text: item.attribute, flex: 1 }}
        />
        {Boolean(item.rank) && (
          <View style={styles.event}>
            <TextRow
              item1={{ text: 'Unlock', flex: 1 }}
              item2={{ text: item.rank, flex: 1 }}
            />
          </View>
        )}
        <TextRow
          item1={{ text: 'Beats per minute', flex: 1 }}
          item2={{ text: item.BPM, flex: 1 }}
        />
        <TextRow
          item1={{ text: 'Length', flex: 1 }}
          item2={{ text: formatTime(item.time), flex: 1 }}
        />
        {item.event && (
          <View style={styles.event}>
            <TextRow
              item1={{ text: 'Event', flex: 1 }}
              item2={{ text: item.event.japanese_name, flex: 1 }}
            />
            <TextRow
              item1={{ text: '', flex: 1 }}
              item2={{ text: item.event.english_name, flex: 1 }}
            />
            <TouchableOpacity
              onPress={navigateToEventDetail}
              style={styles.eventButton}>
              <FastImage
                source={{ uri: AddHTTPS(item.event.image) }}
                resizeMode={FastImage.resizeMode.contain}
                style={styles.eventImage}
              />
            </TouchableOpacity>
          </View>
        )}
        {Boolean(item.daily_rotation) && (
          <View style={styles.event}>
            <TextRow
              item1={{ text: 'Daily rotation', flex: 1 }}
              item2={{
                text: `${item.daily_rotation} - ${item.daily_rotation_position}`,
                flex: 1
              }}
            />
          </View>
        )}
        <TextRow
          item1={{ text: 'Currently available', flex: 1 }}
          item2={{ text: item.available ? 'Yes' : 'No', flex: 1 }}
        />
        <View style={styles.buttonRow}>
          {statButton(0, 'Easy', easy, styles.leftRadius)}
          {statButton(1, 'Normal', normal)}
          {statButton(2, 'Hard', hard)}
          {statButton(
            3,
            'Expert',
            expert,
            random[1].length === 0 && !master[0] && styles.rightRadius
          )}
          {random[1].length !== 0 &&
            statButton(4, 'Random', random, !master[0] && styles.rightRadius)}
          {master[0] && statButton(5, 'Master', master, styles.rightRadius)}
        </View>
        <ProgressBar
          number={currentStats[0] || 0}
          progress={progressStat(currentStats[0] || 0)}
          fillStyle={{ backgroundColor: colors[0] }}
        />
        <StarBar array={currentStats[1]} />
      </ScrollView>
    </LinearGradient>
  );
}

SongDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      item: PropTypes.shape({
        name: PropTypes.string,
        romaji_name: PropTypes.string,
        main_unit: PropTypes.string,
        attribute: PropTypes.string,
        easy_notes: PropTypes.number,
        normal_notes: PropTypes.number,
        hard_notes: PropTypes.number,
        expert_notes: PropTypes.number,
        master_notes: PropTypes.number,
        easy_difficulty: PropTypes.number,
        normal_difficulty: PropTypes.number,
        hard_difficulty: PropTypes.number,
        expert_difficulty: PropTypes.number,
        master_difficulty: PropTypes.any,
        expert_random_difficulty: PropTypes.any,
        image: PropTypes.string,
        rank: PropTypes.string,
        event: PropTypes.object,
        BPM: PropTypes.number,
        time: PropTypes.number,
        daily_rotation: PropTypes.string,
        daily_rotation_position: PropTypes.any,
        available: PropTypes.bool
      })
    })
  })
};

export default SongDetailScreen;
