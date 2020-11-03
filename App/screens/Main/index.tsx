import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { Text, Divider, TouchableRipple } from 'react-native-paper';
import FastImage, { OnLoadEvent } from 'react-native-fast-image';
import VersionNumber from 'react-native-version-number';
import dayjs from 'dayjs';

import ConnectStatus from '~/Components/ConnectStatus';
import TimerCountdown from '~/Components/TimerCountdown';
import useStatusBar from '~/hooks/useStatusBar';
import { AddHTTPS, openLink } from '~/Utils';
import { Config, EventStatus } from '~/Config';
import GithubService from '~/Services/GithubService';
import { Metrics, Colors, Images, AppStyles } from '~/Theme';
import UserContext from '~/Context/UserContext';
import styles from './styles';
import { EventObject, MainScreenProps } from '~/Utils/type';

/**
 * Main Screen
 */
const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  useStatusBar('light-content', Colors.pink);
  const { state } = useContext(UserContext);
  const { ENEvent, JPEvent } = state.cachedData;
  const [version, setVersion] = useState<{
    tag: string;
    filename: string;
    link: string;
  } | null>(null);
  const [imgSize, setImgSize] = useState({ width: 1, height: 0 });

  /** Start time of Worldwide event */
  const ENEventStart = dayjs(ENEvent.english_beginning);
  /** End time of Worldwide event */
  const ENEventEnd = dayjs(ENEvent.english_end);
  /** Start time of Japanese event */
  const JPEventStart = dayjs(JPEvent.beginning, Config.DATETIME_FORMAT_INPUT);
  /** End time of Japanese event */
  const JPEventEnd = dayjs(JPEvent.end, Config.DATETIME_FORMAT_INPUT);

  useEffect(() => {
    if (Platform.OS === 'android') {
      void checkVersion();
    }
  }, []);

  const checkVersion = async () => {
    try {
      const result = await GithubService.fetchLatestVersion();
      // console.log('github', result);
      if (compareVersion(VersionNumber.appVersion, result.tag_name)) {
        setVersion({
          tag: result.tag_name,
          filename: result.assets[0].name,
          link: result.assets[0].browser_download_url
        });
      }
    } catch (error) {
      //
    }
  };

  const compareVersion = (appVersion: string, gitVersion: string) => {
    const appVersionArr = appVersion.split(/\D|[a-zA-Z]/);
    const gitVersionArr = gitVersion.split(/\./);
    if (appVersionArr[0] < gitVersionArr[0]) {
      return true;
    }
    if (
      appVersionArr[0] === gitVersionArr[0] &&
      appVersionArr[1] < gitVersionArr[1]
    ) {
      return true;
    }
    if (
      appVersionArr[0] === gitVersionArr[0] &&
      appVersionArr[1] === gitVersionArr[1] &&
      appVersionArr[2] < gitVersionArr[2]
    ) {
      return true;
    }
    return false;
  };

  /**
   * Countdown timer for ongoing event
   */
  function timer(time: number) {
    return (
      <TimerCountdown initialSecondsRemaining={time} style={styles.text} />
    );
  }

  /**
   * Get width, height of image in FastImage
   */
  const onLoadFastImage = (e: OnLoadEvent) => {
    const { width, height } = e.nativeEvent;
    setImgSize({ width, height });
  };

  /**
   * Navigate to Event Detail Screen
   */
  function navigateToEventDetail(event: EventObject) {
    navigation.navigate('EventDetailScreen', { event });
  }

  const data = state.cachedData;
  if (data === null) {
    return <View style={styles.blank} />;
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={{ alignItems: 'center' }}>
        <FastImage
          source={Images.logo}
          resizeMode='contain'
          style={AppStyles.imageHeader}
        />
      </View>
      {version !== null && (
        <TouchableRipple
          style={styles.update}
          onPress={() => openLink(version.link)}>
          <Text>{`Download new version ${version.tag} on Github!`}</Text>
        </TouchableRipple>
      )}
      <ConnectStatus />
      {/* BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {/* ENGLISH BLOCK */}
        <TouchableRipple
          style={styles.block}
          onPress={() => navigateToEventDetail(ENEvent)}>
          <>
            <Text style={styles.text}>
              {`Worldwide Event: ${ENEvent.english_status || ''}`}
            </Text>
            <View style={styles.textbox}>
              <Text style={styles.title}>{ENEvent.english_name}</Text>
            </View>
            <FastImage
              source={{ uri: AddHTTPS(ENEvent.english_image || '') }}
              onLoad={onLoadFastImage}
              resizeMode='contain'
              style={{
                width: Metrics.widthBanner,
                height: (Metrics.widthBanner * imgSize.height) / imgSize.width
              }}
            />
            <View style={styles.textbox}>
              <Text style={styles.text}>
                {`Start: ${ENEventStart.format(
                  Config.DATETIME_FORMAT_OUTPUT
                )}\nEnd: ${ENEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
              </Text>
            </View>
            {ENEvent.world_current && (
              <View style={styles.textbox}>
                <Text style={styles.text}>
                  {timer(ENEventEnd.diff(dayjs()))}
                  {' left'}
                </Text>
              </View>
            )}
            {ENEvent.english_status === EventStatus.ANNOUNCED && (
              <View style={styles.textbox}>
                <Text style={styles.text}>
                  {'Starts in '}
                  {timer(ENEventStart.diff(dayjs()))}
                </Text>
              </View>
            )}
          </>
        </TouchableRipple>
        <Divider style={styles.bgWhite} />
        {/* JAPANESE BLOCK */}
        <TouchableRipple
          style={styles.block}
          onPress={() => navigateToEventDetail(JPEvent)}>
          <>
            <Text style={styles.text}>
              {`Japanese Event: ${JPEvent.japan_status || ''}`}
            </Text>
            <View style={styles.textbox}>
              <Text style={styles.title}>{JPEvent.romaji_name}</Text>
            </View>
            <FastImage
              source={{ uri: AddHTTPS(JPEvent.image) }}
              onLoad={onLoadFastImage}
              resizeMode='contain'
              style={{
                width: Metrics.widthBanner,
                height: (Metrics.widthBanner * imgSize.height) / imgSize.width
              }}
            />
            <View style={styles.textbox}>
              <Text style={styles.text}>
                {`Start: ${JPEventStart.format(
                  Config.DATETIME_FORMAT_OUTPUT
                )}\nEnd: ${JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
              </Text>
            </View>
            {JPEvent.japan_current && (
              <View style={styles.textbox}>
                <Text style={styles.text}>
                  {timer(JPEventEnd.diff(dayjs()))}
                  {' left'}
                </Text>
              </View>
            )}
            {JPEvent.japan_status === EventStatus.ANNOUNCED && (
              <View style={styles.textbox}>
                <Text style={styles.text}>
                  {'Starts in '}
                  {timer(JPEventStart.diff(dayjs()))}
                </Text>
              </View>
            )}
          </>
        </TouchableRipple>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
