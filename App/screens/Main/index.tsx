import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import { Text, Title, Divider, TouchableRipple } from 'react-native-paper';
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
  const [imgSize, setImgSize] = useState({ width: 1, height: 1 });

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
    const pa = appVersion.split('.');
    const pb = gitVersion.split('.');
    for (let i = 0; i < 3; i++) {
      const na = Number(pa[i]);
      const nb = Number(pb[i]);
      if (na > nb) return false;
      if (nb > na) return true;
      if (!isNaN(na) && isNaN(nb)) return false;
      if (isNaN(na) && !isNaN(nb)) return true;
    }
    return false;
  };

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
  const navigateToEventDetail = (event: EventObject) => {
    navigation.navigate('EventDetailScreen', { event });
  };

  const goToENEvent = () => navigateToEventDetail(ENEvent);

  const goToJPEvent = () => navigateToEventDetail(JPEvent);
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
        <TouchableRipple style={styles.block} onPress={goToENEvent}>
          <>
            <Text>{`Worldwide Event: ${ENEvent.english_status || ''}`}</Text>
            <Title>{ENEvent.english_name}</Title>
            <FastImage
              source={{ uri: AddHTTPS(ENEvent.english_image || '') }}
              onLoad={onLoadFastImage}
              resizeMode='contain'
              style={{
                width: Metrics.widthBanner,
                height: (Metrics.widthBanner * imgSize.height) / imgSize.width
              }}
            />
            <Text>{`Start: ${ENEventStart.format('LLL')}`}</Text>
            <Text>{`End: ${ENEventEnd.format('LLL')}`}</Text>
            {ENEvent.world_current && (
              <Text>
                <TimerCountdown
                  initialSecondsRemaining={ENEventEnd.diff(dayjs())}
                />
                {' left'}
              </Text>
            )}
            {ENEvent.english_status === EventStatus.ANNOUNCED && (
              <Text>
                {'Starts in '}
                <TimerCountdown
                  initialSecondsRemaining={ENEventStart.diff(dayjs())}
                />
              </Text>
            )}
          </>
        </TouchableRipple>
        <Divider />
        {/* JAPANESE BLOCK */}
        <TouchableRipple style={styles.block} onPress={goToJPEvent}>
          <>
            <Text>{`Japanese Event: ${JPEvent.japan_status || ''}`}</Text>
            <Title>{JPEvent.romaji_name}</Title>
            <FastImage
              source={{ uri: AddHTTPS(JPEvent.image) }}
              resizeMode='contain'
              style={{
                width: Metrics.widthBanner,
                height: (Metrics.widthBanner * imgSize.height) / imgSize.width
              }}
            />
            <Text>{`Start: ${JPEventStart.format('LLL')}`}</Text>
            <Text>{`End: ${JPEventEnd.format('LLL')}`}</Text>
            {JPEvent.japan_current && (
              <Text>
                <TimerCountdown
                  initialSecondsRemaining={JPEventEnd.diff(dayjs())}
                />
                {' left'}
              </Text>
            )}
            {JPEvent.japan_status === EventStatus.ANNOUNCED && (
              <Text>
                {'Starts in '}
                <TimerCountdown
                  initialSecondsRemaining={JPEventStart.diff(dayjs())}
                />
              </Text>
            )}
          </>
        </TouchableRipple>
      </ScrollView>
    </View>
  );
};

export default MainScreen;
