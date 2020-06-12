import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';

import useStatusBar from '~/hooks/useStatusBar';
import LLSIFService from '~/Services/LLSIFService';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import SplashScreen from '../SplashScreen/SplashScreen';
import UserContext from '~/Context/UserContext';
import { actions } from '~/Context/Reducer';
import { Colors, ApplicationStyles, Fonts } from '~/Theme';
import styles from './styles';

/**
 * Loading Screen
 *
 * @returns
 */
function LoadingScreen() {
  useStatusBar('light-content', Colors.pink);
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCachedData();
  }, []);

  const loadCachedData = async () => {
    setError(false);
    try {
      const cachedData = {};
      const enParams = {
        ordering: '-english_beginning',
        page_size: 1,
      };
      const jpParams = {
        ordering: '-beginning',
        page_size: 1,
      };
      const [data, eventEN, eventJP, randomCard, eventInfo] = await Promise.all([
        LLSIFService.fetchCachedData(),
        LLSIFService.fetchEventList(enParams),
        LLSIFService.fetchEventList(jpParams),
        LLSIFService.fetchRandomCard(),
        LLSIFdotnetService.fetchEventInfo(),
      ]);

      const cardsInfo = data.cards_info;
      const idols = cardsInfo.idols.map((value) => ({
        label: value.name,
        value: value.name,
      }));
      cachedData.idols = idols;
      const skills = cardsInfo.skills.map((value) => ({
        label: value.skill,
        value: value.skill,
      }));
      cachedData.skills = skills;
      const subUnits = cardsInfo.sub_units.map((value) => ({
        label: value,
        value,
      }));
      cachedData.subUnits = subUnits;
      const schools = cardsInfo.schools.map((value) => ({
        label: value,
        value,
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
        type: actions.DONE_LOADING,
        data: cachedData,
      });
    } catch (e) {
      setError(true);
    }
  };

  if (error) {
    return <View style={[
      ApplicationStyles.screen,
      ApplicationStyles.center,
      styles.bg,
    ]}>
      <View style={styles.textBox}>
        <Text style={styles.text}>
          {'Can\'t get data.\nCheck internet connection and retry.'}
        </Text>
      </View>
      <TouchableOpacity onPress={loadCachedData}>
        <View style={styles.button}>
          <Text style={Fonts.style.normal}>Retry</Text>
        </View>
      </TouchableOpacity>
    </View>;
  }
  return <SplashScreen bgColor={Colors.pink} />;
}

export default LoadingScreen;
