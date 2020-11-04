import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

import { initCachedData } from '~/Context/Reducer';
import LLSIFService from '~/Services/LLSIFService';
import SplashScreen from '../Splash';
import UserContext from '~/Context/UserContext';
import { Colors, AppStyles } from '~/Theme';
import type { LoadingScreenProps, CachedDataObject } from '~/Utils/types';

/**
 * Loading Screen
 *
 */
const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => () => setIsMounted(false), []);

  useEffect(() => {
    if (loading) {
      void loadCachedData();
    }
  }, [loading]);

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
          type: 'DONE_LOADING',
          data: cachedData
        });
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
    return <SplashScreen bgColor={Colors.pink} />;
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

export default LoadingScreen;
