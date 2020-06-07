import React, { useContext, useState, useEffect } from 'react';
import {
  Text, View, Image, ScrollView,
  TouchableNativeFeedback, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import VersionNumber from 'react-native-version-number';
import moment from 'moment';

import ConnectStatus from '~/Components/ConnectStatus';
import Seperator from '~/Components/Seperator/Seperator';
import Touchable from '~/Components/Touchable/Touchable';
import SquareButton from '~/Components/SquareButton/SquareButton';
import TimerCountdown from '~/Components/TimerCountdown/Timer';
import useStatusBar from '~/hooks/useStatusBar';
import { AddHTTPS, openLink } from '~/Utils';
import { Config, EventStatus } from '~/Config';
import GithubService from '~/Services/GithubService';
import {
  Metrics, Colors, Images, ApplicationStyles,
} from '~/Theme';
import UserContext from '~/Context/UserContext';
import styles from './styles';

/**
 * Main Screen
 *
 * State:
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `ENEvent`: Worldwide event
 * - `JPEvent`: Japanese event
 * - `currentContests`: Contest array
 *
 */
function MainScreen({ navigation }) {
  useStatusBar('dark-content');
  const { state } = useContext(UserContext);
  const [version, setVersion] = useState(null);
  const [imgSize, setImgSize] = useState({
    width: 1,
    height: 0,
  });
  const [ENEvent, setENEvent] = useState(state.cachedData.ENEvent);
  const [JPEvent, setJPEvent] = useState(state.cachedData.JPEvent);
  const [currentContests, setCurrentContests] = useState(state.cachedData.current_contests);

  useEffect(() => {
    if (Platform.OS === 'android') {
      GithubService.fetchLatestVersion().then((result) => {
        // console.log('github', result);
        if (compareVersion(VersionNumber.appVersion, result.tag_name)) {
          setVersion({
            tag: result.tag_name,
            filename: result.assets[0].name,
            link: result.assets[0].browser_download_url,
          });
        }
      });
    }
  }, []);

  function compareVersion(appVersion, gitVersion) {
    const appVersionArr = appVersion.split(/\D|[a-zA-Z]/);
    const gitVersionArr = gitVersion.split(/\./);
    if (appVersionArr[0] < gitVersionArr[0]) {
      return true;
    }
    if (appVersionArr[0] === gitVersionArr[0] && appVersionArr[1] < gitVersionArr[1]) {
      return true;
    }
    if (appVersionArr[0] === gitVersionArr[0] && appVersionArr[1] === gitVersionArr[1]
      && appVersionArr[2] < gitVersionArr[2]) {
      return true;
    }
    return false;
  }

  /**
   * Countdown timer for ongoing event
   *
   * @param {Number} time Remaining time (miliseconds)
   * @returns
   * @memberof MainScreen
   */
  function timer(time) {
    return <TimerCountdown initialSecondsRemaining={time}
      allowFontScaling={true} style={styles.text} />;
  }

  /**
   * Get width, height of image in FastImage
   *
   * @param {*} e
   * @memberof MainScreen
   */
  const onLoadFastImage = (e) => {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  };

  /**
   * Navigate to Event Detail Screen
   *
   * @param {Object} event Event object
   * @memberof MainScreen
   */
  function navigateToEventDetail(event) {
    navigation.navigate('EventDetailScreen', { event });
  }

  const openDrawer = () => navigation.openDrawer();

  const data = state.cachedData;
  if (data === null) {
    return <View style={styles.blank} />;
  }

  // const currentContests = data.current_contests;
  /** Start time of Worldwide event */
  const ENEventStart = moment(ENEvent.english_beginning);
  /** End time of Worldwide event */
  const ENEventEnd = moment(ENEvent.english_end);
  /** Start time of Japanese event */
  const JPEventStart = moment(JPEvent.beginning, Config.DATETIME_FORMAT_INPUT);
  /** End time of Japanese event */
  const JPEventEnd = moment(JPEvent.end, Config.DATETIME_FORMAT_INPUT);

  return <View style={styles.container}>
    {/* HEADER */}
    <View style={ApplicationStyles.header}>
      <SquareButton name={'ios-menu'} onPress={openDrawer} color={'white'} />
      <Image source={Images.logo} style={ApplicationStyles.imageHeader} />
      <SquareButton name={'ios-menu'} color={Colors.pink} />
    </View>
    {version !== null
      && <Touchable useForeground style={styles.update}
        background={TouchableNativeFeedback.Ripple('white', false)}
        onLongPress={() => { }}
        onPress={() => openLink(version.link)}>
        <Text>{`Download new version ${version.tag} on Github!`}</Text>
      </Touchable>}
    <ConnectStatus />
    {/* BODY */}
    <ScrollView showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {/* ENGLISH BLOCK */}
      <Touchable useForeground style={styles.block}
        background={TouchableNativeFeedback.Ripple('white', false)}
        onLongPress={() => { }}
        onPress={() => navigateToEventDetail(ENEvent)}>
        <Text style={styles.text}>
          {`Worldwide Event: ${ENEvent.english_status}`}
        </Text>
        <View style={styles.textbox}>
          <Text style={styles.title}>{ENEvent.english_name}</Text>
        </View>
        <FastImage source={{ uri: AddHTTPS(ENEvent.english_image) }}
          onLoad={onLoadFastImage}
          style={{
            width: Metrics.widthBanner,
            height: (Metrics.widthBanner * imgSize.height) / imgSize.width,
          }} />
        <View style={styles.textbox}>
          <Text style={styles.text}>
            {`Start: ${ENEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${ENEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
          </Text>
        </View>
        {ENEvent.world_current
          && <View style={styles.textbox}>
            <Text style={styles.text}>
              {timer(ENEventEnd.diff(moment()))}{' left'}
            </Text>
          </View>}
        {ENEvent.english_status === EventStatus.ANNOUNCED
          && <View style={styles.textbox}>
            <Text style={styles.text}>
              {'Starts in '}{timer(ENEventStart.diff(moment()))}
            </Text>
          </View>}
      </Touchable>
      <Seperator style={styles.bgWhite} />
      {/* JAPANESE BLOCK */}
      <Touchable useForeground style={styles.block}
        background={TouchableNativeFeedback.Ripple('white', false)}
        onLongPress={() => { }}
        onPress={() => navigateToEventDetail(JPEvent)}>
        <Text style={styles.text}>
          {`Japanese Event: ${JPEvent.japan_status}`}
        </Text>
        <View style={styles.textbox}>
          <Text style={styles.title}>{JPEvent.romaji_name}</Text>
        </View>
        <FastImage source={{ uri: AddHTTPS(JPEvent.image) }}
          onLoad={onLoadFastImage}
          style={{
            width: Metrics.widthBanner,
            height: (Metrics.widthBanner * imgSize.height) / imgSize.width,
          }} />
        <View style={styles.textbox}>
          <Text style={styles.text}>
            {`Start: ${JPEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
          </Text>
        </View>
        {JPEvent.japan_current
          && <View style={styles.textbox}>
            <Text style={styles.text}>
              {timer(JPEventEnd.diff(moment()))}{' left'}
            </Text>
          </View>}
        {JPEvent.japan_status === EventStatus.ANNOUNCED
          && <View style={styles.textbox}>
            <Text style={styles.text}>
              {'Starts in '}{timer(JPEventStart.diff(moment()))}
            </Text>
          </View>}
      </Touchable>
      {/* <Seperator style={{ backgroundColor: 'white' }} /> */}

      {/* CONTEST BLOCK */}
      {/* {currentContests.map((item, id) => (
            <View key={'contest' + id}>
              <Text style={styles.text}>{item.name}</Text>
              <FastImage source={{ uri: AddHTTPS(item.image)) }}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Metrics.widthBanner,
                  height: Metrics.widthBanner / 3,
                  alignSelf: 'center',
                }} />
            </View>
          ))} */}
    </ScrollView>
  </View>;
}

export default MainScreen;
