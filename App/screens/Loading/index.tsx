import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

import useStatusBar from '~/hooks/useStatusBar';
import LLSIFService from '~/Services/LLSIFService';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import SplashScreen from '../Splash';
import UserContext from '~/Context/UserContext';
import { Colors, AppStyles, Fonts } from '~/Theme';
import type { LoadingScreenProps, CachedDataObject } from '~/Utils/type';

/**
 * Loading Screen
 *
 */
const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  useStatusBar('light-content', Colors.pink);
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => () => setIsMounted(false), []);

  useEffect(() => {
    if (loading) {
      loadCachedData();
    }
  }, [loading]);

  const loadCachedData = async () => {
    setError(false);
    try {
      const cachedData: CachedDataObject = {};
      const enParams = {
        ordering: '-english_beginning',
        page_size: 1
      };
      const jpParams = {
        ordering: '-beginning',
        page_size: 1
      };
      const [
        data,
        eventEN,
        eventJP,
        randomCard,
        eventInfo
      ] = await Promise.all([
        LLSIFService.fetchCachedData(),
        LLSIFService.fetchEventList(enParams),
        LLSIFService.fetchEventList(jpParams),
        LLSIFService.fetchRandomCard(),
        LLSIFdotnetService.fetchEventInfo()
      ]);

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

      const [eventEN0] = eventEN;
      const [eventJP0] = eventJP;
      cachedData.ENEvent = eventEN0;
      cachedData.JPEvent = eventJP0;
      const r = Math.floor(Math.random() * 10);
      let bgImage = '';
      if (randomCard.clean_ur !== null && r < 6) {
        bgImage = randomCard.clean_ur;
      } else {
        bgImage = randomCard.clean_ur_idolized;
      }
      cachedData.randomCard = randomCard;
      cachedData.bgImage = bgImage;
      cachedData.eventInfo = eventInfo;
      dispatch({
        type: 'DONE_LOADING',
        data: cachedData
      });
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
      <View style={[AppStyles.screen, AppStyles.center, styles.bg]}>
        <View style={styles.textBox}>
          <Text style={styles.text}>
            {"Can't get data.\nCheck internet connection and retry."}
          </Text>
        </View>
        <Button onPress={loadCachedData}>Retry</Button>
      </View>
    );
  }
  return <View />;
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: Colors.pink
  },
  button: {
    backgroundColor: Colors.white,
    margin: 10,
    padding: 10
  },
  text: {
    ...Fonts.style.normal,
    ...Fonts.style.white,
    ...Fonts.style.center
  },
  textBox: {
    marginHorizontal: 10
  }
});

export default LoadingScreen;
