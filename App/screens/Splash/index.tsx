import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import firebase from 'react-native-firebase';
import RNBootSplash from 'react-native-bootsplash';

import { initCachedData } from '~/Context/Reducer';
import LLSIFService from '~/Services/LLSIFService';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import LoadingScreen from '../Loading';
import UserContext from '~/Context/UserContext';
import { AppStyles, Metrics } from '~/Theme';
import { loadSettings } from '~/Utils';
import { FirebaseTopic } from '~/Config';

import type {
  CachedDataObject,
  SubUnitNames,
  EventSearchParams,
} from '~/typings';

/** Loading Screen */
const SplashScreen = (): JSX.Element => {
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const [loadedAppOptions, setLoadedAO] = useState(false);
  const [loadedCached, setLoadedC] = useState(false);

  useEffect(() => {
    void loadAppOptions();
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (loading) {
      void loadCachedData();
    }
  }, [loading]);

  useEffect(() => {
    if (loadedAppOptions) {
      void RNBootSplash.hide({ fade: true });
    }
    if (loadedAppOptions && loadedCached) {
      dispatch({ type: 'LOADING', loading: false });
    }
  }, [loadedAppOptions, loadedCached]);

  const loadAppOptions = async () => {
    const res = await loadSettings();
    if (res.jpEvent) {
      firebase.messaging().subscribeToTopic(FirebaseTopic.JP_EVENT);
    } else {
      firebase.messaging().unsubscribeFromTopic(FirebaseTopic.JP_EVENT);
    }
    if (res.wwEvent) {
      firebase.messaging().subscribeToTopic(FirebaseTopic.WW_EVENT);
    } else {
      firebase.messaging().unsubscribeFromTopic(FirebaseTopic.WW_EVENT);
    }
    dispatch({ type: 'SAVE_OPTIONS', data: res });
    setLoadedAO(true);
  };

  const loadCachedData = async () => {
    setError(false);
    try {
      const cachedData: CachedDataObject = { ...initCachedData };
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
        const idols = cardsInfo.idols.map(({ name }) => name);
        cachedData.idols = idols;
        const skills = cardsInfo.skills.map(({ skill }) => skill);
        cachedData.skills = skills;
        const subUnits = cardsInfo.sub_units.map(
          (value) => value,
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
        dispatch({
          type: 'SAVE_CACHED_DATA',
          data: cachedData,
        });
        setLoadedC(true);
      } else {
        throw Error('data = null');
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
