import messaging from '@react-native-firebase/messaging';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';
import {Button, Text} from 'react-native-paper';
import {FirebaseTopic} from '~/Config';
import LLSIFService from '~/Services/LLSIFService';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import {AppStyles, Metrics} from '~/Theme';
import {useStorage} from '~/Utils';
import {saveCachedData, setAppRoute} from '~/store';
import {initAppOptions, initCachedData} from '~/store/init';
import LoadingScreen from '../Loading';

/** Loading Screen */
const SplashScreen = () => {
  const [settings] = useStorage('settings', initAppOptions);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const [loadedAppOptions, setLoadedAO] = useState(false);
  const [loadedCached, setLoadedC] = useState(false);

  useEffect(() => {
    loadAppOptions();
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (loading) {
      loadCachedData();
    }
  }, [loading]);

  useEffect(() => {
    if (loadedAppOptions) {
      RNBootSplash.hide({fade: true});
    }
    if (loadedAppOptions && loadedCached) {
      setAppRoute('MAIN');
    }
  }, [loadedAppOptions, loadedCached]);

  const loadAppOptions = async () => {
    if (settings.jpEvent) {
      messaging().subscribeToTopic(FirebaseTopic.JP_EVENT);
    } else {
      messaging().unsubscribeFromTopic(FirebaseTopic.JP_EVENT);
    }
    messaging().unsubscribeFromTopic(FirebaseTopic.WW_EVENT);
    setLoadedAO(true);
  };

  const loadCachedData = async () => {
    setError(false);
    try {
      const cachedData: CachedDataObject = {...initCachedData};
      const enParams: EventSearchParams = {
        page: 1,
        ordering: '-english_beginning',
        page_size: 1,
      };
      const jpParams: EventSearchParams = {
        page: 1,
        ordering: '-beginning',
        page_size: 1,
      };
      const [data, eventEN, eventJP, evInfo] = await Promise.all([
        LLSIFService.fetchCachedData(),
        LLSIFService.fetchEventList(enParams),
        LLSIFService.fetchEventList(jpParams),
        LLSIFdotnetService.fetchEventInfo(),
      ]);
      if (data) {
        const cardsInfo = data.cards_info;
        const idols = cardsInfo.idols.map(({name}) => name);
        cachedData.idols = idols;
        const skills = cardsInfo.skills.map(({skill}) => skill);
        cachedData.skills = skills;
        const subUnits = cardsInfo.sub_units.map(
          value => value,
        ) as SubUnitNames[];
        cachedData.subUnits = subUnits;
        const schools = cardsInfo.schools.map((value: string) => value);
        cachedData.schools = schools;
        cachedData.maxStats = cardsInfo.max_stats;
        cachedData.songsMaxStats = cardsInfo.songs_max_stats;

        if (Array.isArray(eventEN)) {
          cachedData.ENEvent = eventEN[0];
        }
        if (Array.isArray(eventJP)) {
          cachedData.JPEvent = eventJP[0];
        }
        cachedData.eventInfo = evInfo;
        saveCachedData(cachedData);
        setLoadedC(true);
      } else {
        throw new Error('data = null');
      }
    } catch (e) {
      // console.log(e);
      setError(true);
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return (
      <View style={[AppStyles.screen, AppStyles.center]}>
        <View style={styles.textBox}>
          <Text>{"Can't get data.\nCheck internet connection and retry."}</Text>
        </View>
        <Button onPress={loadCachedData}>Retry</Button>
      </View>
    );
  }
  return <View />;
};

const styles = StyleSheet.create({
  textBox: {
    marginHorizontal: Metrics.baseMargin,
  },
});

export default SplashScreen;
