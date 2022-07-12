import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Platform, ScrollView, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, Title, TouchableRipple} from 'react-native-paper';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VersionNumber from 'react-native-version-number';
import ConnectStatus from '~/Components/ConnectStatus';
import TimerCountdown from '~/Components/TimerCountdown';
import {Config, EventStatus} from '~/Config';
import GithubService from '~/Services/GithubService';
import {AppStyles, Colors, Images, Metrics} from '~/Theme';
import {AddHTTPS, openLink} from '~/Utils';
import useStore from '~/store';
import type {MainTabScreenProps} from '~/typings/navigation';
import type {OnLoadEvent} from 'react-native-fast-image';

type GithubVersion = {
  tag: string;
  filename: string;
  link: string;
};

/** Main Screen */
const MainScreen = ({navigation}: MainTabScreenProps<'MainScreen'>) => {
  const {top} = useSafeAreaInsets();
  const {ENEvent, JPEvent} = useStore(s => s.cachedData);
  const [version, setVersion] = useState<GithubVersion | null>(null);
  const [imgSize, setImgSize] = useState({width: 1, height: 1});
  const padding = {paddingTop: top};

  /** Start time of event */
  const eventStart = dayjs(JPEvent.beginning, Config.DATETIME_FORMAT_INPUT);
  /** End time of event */
  const eventEnd = dayjs(JPEvent.end, Config.DATETIME_FORMAT_INPUT);

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkVersion();
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
          link: result.assets[0].browser_download_url,
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
      if (na > nb) {
        return false;
      }
      if (nb > na) {
        return true;
      }
      if (!isNaN(na) && isNaN(nb)) {
        return false;
      }
      if (isNaN(na) && !isNaN(nb)) {
        return true;
      }
    }
    return false;
  };

  /** Get width, height of image in FastImage */
  const onLoadFastImage = (e: OnLoadEvent) => {
    const {width, height} = e.nativeEvent;
    setImgSize({width, height});
  };

  /** Navigate to Event Detail Screen */
  const navigateToEventDetail = (event: EventObject) => {
    navigation.navigate('EventDetailScreen', {
      eventName: event.japanese_name,
    });
  };

  const goToEvent = () => navigateToEventDetail(JPEvent);

  const onOpenLink = () => version && openLink(version.link);

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <View style={[styles.header, padding]}>
        <FastImage
          resizeMode="contain"
          source={Images.logo}
          style={AppStyles.imageHeader}
        />
      </View>
      {version !== null && (
        <TouchableRipple style={styles.update} onPress={onOpenLink}>
          <Text>{`Download new version ${version.tag} on Github!`}</Text>
        </TouchableRipple>
      )}
      <ConnectStatus />
      {/* BODY */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <TouchableRipple style={styles.block} onPress={goToEvent}>
          <>
            <Text>{`Event: ${ENEvent.english_status || ''}`}</Text>
            <Title>{ENEvent.english_name}</Title>
            <Title>{JPEvent.romaji_name}</Title>
            <View style={styles.space} />
            <FastImage
              resizeMode="contain"
              source={{uri: AddHTTPS(ENEvent.english_image || '')}}
              style={{
                width: Metrics.widthBanner,
                height: (Metrics.widthBanner * imgSize.height) / imgSize.width,
              }}
              onLoad={onLoadFastImage}
            />
            <View style={styles.space} />
            <FastImage
              resizeMode="contain"
              source={{uri: AddHTTPS(JPEvent.image)}}
              style={{
                width: Metrics.widthBanner,
                height: (Metrics.widthBanner * imgSize.height) / imgSize.width,
              }}
            />
            <View style={styles.space} />
            <Text>{`Start: ${eventStart.format('LLL')}`}</Text>
            <Text>{`End: ${eventEnd.format('LLL')}`}</Text>
            {JPEvent.japan_current && (
              <Text>
                <TimerCountdown seconds={eventEnd.diff(dayjs())} />
                {' left'}
              </Text>
            )}
            {JPEvent.japan_status === EventStatus.ANNOUNCED && (
              <Text>
                {'Starts in '}
                <TimerCountdown seconds={eventStart.diff(dayjs())} />
              </Text>
            )}
          </>
        </TouchableRipple>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    width: responsiveWidth(100),
  },
  content: {
    alignItems: 'center',
    padding: Metrics.baseMargin,
  },
  header: {
    alignItems: 'center',
  },
  space: {
    height: Metrics.baseMargin,
  },
  update: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.lightGreen,
    padding: Metrics.smallMargin,
    width: responsiveWidth(90),
  },
});

export default MainScreen;
