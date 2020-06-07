import React, { useState, useEffect, useContext } from 'react';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import LLSIFService from '~/Services/LLSIFService';
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
  const { dispatch } = useContext(UserContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadCachedData();
  }, []);

  const loadCachedData = async () => {
    const cachedData = await LLSIFService.fetchCachedData();
    if (cachedData) {
      dispatch({
        type: actions.DONE_LOADING,
        data: cachedData,
      });
    } else { setError(true); }
  };

  if (error) {
    return (
      <View style={[
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
      </View>
    );
  }
  return <SplashScreen bgColor={Colors.pink} />;
}

export default LoadingScreen;
