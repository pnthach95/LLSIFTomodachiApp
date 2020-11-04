import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import firebase from 'react-native-firebase';

import { initCachedData } from '~/Context/Reducer';
import LLSIFService from '~/Services/LLSIFService';
import LoadingScreen from '../Loading';
import UserContext from '~/Context/UserContext';
import { AppStyles } from '~/Theme';
import { loadSettings } from '~/Utils';
import { FirebaseTopic } from '~/Config';
import type { SplashScreenProps, CachedDataObject } from '~/Utils/types';

/**
 * Loading Screen
 *
 */
const SplashScreen: React.FC<SplashScreenProps> = () => {
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);
  const [loaded, setLoaded] = useState(0);

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
    if (loaded === 2) {
      dispatch({ type: 'LOADING', loading: false });
    }
  }, [loaded]);

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
    setLoaded(loaded + 1);
  };

  const loadCachedData = async () => {
    setError(false);
    try {
      const cachedData: CachedDataObject = { ...initCachedData };
      const enParams = {
        ordering: '-english_beginning',
        page_size: 1
      };
      const jpParams = {
        ordering: '-beginning',
        page_size: 1
      };
      const [data, eventEN, eventJP] = await Promise.all([
        LLSIFService.fetchCachedData(),
        LLSIFService.fetchEventList(enParams),
        LLSIFService.fetchEventList(jpParams)
      ]);
      if (data) {
        const cardsInfo = data.cards_info;
        const idols = cardsInfo.idols.map((value: { name: string }) => ({
          label: value.name,
          value: value.name
        }));
        cachedData.idols = idols;
        const skills = cardsInfo.skills.map((value: { skill: string }) => ({
          label: value.skill,
          value: value.skill
        }));
        cachedData.skills = skills;
        const subUnits = cardsInfo.sub_units.map((value: string) => ({
          label: value,
          value
        }));
        cachedData.subUnits = subUnits;
        const schools = cardsInfo.schools.map((value: string) => ({
          label: value,
          value
        }));
        cachedData.schools = schools;
        cachedData.maxStats = cardsInfo.max_stats;
        cachedData.songsMaxStats = cardsInfo.songs_max_stats;

        if (Array.isArray(eventEN)) {
          cachedData.ENEvent = eventEN[0];
        }
        if (Array.isArray(eventJP)) {
          cachedData.JPEvent = eventJP[0];
        }
        dispatch({
          type: 'SAVE_CACHED_DATA',
          data: cachedData
        });
        setLoaded(loaded + 1);
      } else {
        throw Error('data = null');
      }
    } catch (e) {
      console.log(e);
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
    marginHorizontal: 10
  }
});

export default SplashScreen;
