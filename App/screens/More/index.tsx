import React, { useContext, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Switch, TouchableRipple, useTheme } from 'react-native-paper';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VersionNumber from 'react-native-version-number';

import UserContext from '~/Context/UserContext';
import { Fonts, Metrics, Colors } from '~/Theme';
import { saveSettings, setStatusBar } from '~/Utils';
import type { AppOptions, MoreScreenProps } from '~/Utils/types';

const iconSize = 30;

const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useContext(UserContext);
  const { colors } = useTheme();

  useEffect(() => {
    setStatusBar(colors.card);
  }, [state.options.isDark]);

  /**
   * Toggle worldwide option
   */
  const worldwideToggle = () => {
    const data: AppOptions = {
      ...state.options,
      worldwideOnly: !state.options.worldwideOnly
    };
    dispatch({ type: 'SAVE_OPTIONS', data });
    saveSettings(data);
  };

  /**
   * Toggle receiving worldwide event notification option
   */
  const wwEventToggle = () => {
    const data: AppOptions = {
      ...state.options,
      wwEvent: !state.options.wwEvent
    };
    if (data.wwEvent) {
      firebase.messaging().subscribeToTopic('ww_event');
    } else {
      firebase.messaging().unsubscribeFromTopic('ww_event');
    }
    dispatch({ type: 'SAVE_OPTIONS', data });
    saveSettings(data);
  };

  /**
   * Toggle receiving japanese event notification option
   */
  const jpEventToggle = () => {
    const data: AppOptions = {
      ...state.options,
      jpEvent: !state.options.jpEvent
    };
    if (data.jpEvent) {
      firebase.messaging().subscribeToTopic('jp_event');
    } else {
      firebase.messaging().unsubscribeFromTopic('jp_event');
    }
    dispatch({ type: 'SAVE_OPTIONS', data });
    saveSettings(data);
  };

  /**
   * Toggle dark theme
   */
  const themeToggle = () => {
    const data: AppOptions = {
      ...state.options,
      isDark: !state.options.isDark
    };
    dispatch({ type: 'SAVE_OPTIONS', data });
    saveSettings(data);
  };

  const goToIdols = () => navigation.navigate('IdolsScreen');
  const goToSongs = () => navigation.navigate('SongsScreen');
  const goToAboutMe = () => navigation.navigate('AboutMeScreen');

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.group}>
        <Text style={styles.headline}>Options</Text>
      </View>
      <TouchableRipple onPress={worldwideToggle}>
        <View style={styles.settingRow}>
          <Text>Search Worldwide only</Text>
          <Switch
            value={state.options.worldwideOnly}
            onValueChange={worldwideToggle}
          />
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={wwEventToggle}>
        <View style={styles.settingRow}>
          <Text>Notify WW event</Text>
          <Switch value={state.options.wwEvent} onValueChange={wwEventToggle} />
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={jpEventToggle}>
        <View style={styles.settingRow}>
          <Text>Notify JP event</Text>
          <Switch value={state.options.jpEvent} onValueChange={jpEventToggle} />
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={themeToggle}>
        <View style={styles.settingRow}>
          <Text>Dark theme</Text>
          <Switch value={state.options.isDark} onValueChange={themeToggle} />
        </View>
      </TouchableRipple>
      <View style={styles.group}>
        <Text style={styles.headline}>Navigation</Text>
      </View>
      <TouchableRipple onPress={goToIdols}>
        <View style={styles.button}>
          <Icon name='face-woman' color={Colors.pink} size={iconSize} />
          <View style={styles.space} />
          <Text>Idols</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={goToSongs}>
        <View style={styles.button}>
          <Icon
            name='music-box-multiple'
            color={Colors.green}
            size={iconSize}
          />
          <View style={styles.space} />
          <Text>Songs</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={goToAboutMe}>
        <View style={styles.button}>
          <Icon name='help-circle' color={Colors.blue} size={iconSize} />
          <View style={styles.space} />
          <Text>About me</Text>
        </View>
      </TouchableRipple>
      <Text style={Fonts.style.center}>Version {VersionNumber.appVersion}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: Metrics.baseMargin
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingTop: Metrics.doubleBaseMargin
  },
  headline: {
    color: Colors.blue600,
    fontWeight: 'bold'
  },
  settingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.baseMargin
  },
  space: {
    width: Metrics.baseMargin
  }
});

export default MoreScreen;
