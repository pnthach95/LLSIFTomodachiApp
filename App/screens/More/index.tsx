import messaging from '@react-native-firebase/messaging';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Switch, Text, TouchableRipple} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VersionNumber from 'react-native-version-number';
import {Colors, Fonts, Metrics} from '~/Theme';
import {useStorage} from '~/Utils';
import {initAppOptions} from '~/store/init';
import type {MainTabScreenProps} from '~/typings/navigation';

const iconSize = 30;

const MoreScreen = ({navigation}: MainTabScreenProps<'MoreScreen'>) => {
  const [settings, setSettings] = useStorage('settings', initAppOptions);
  const insets = useSafeAreaInsets();
  const top = {paddingTop: insets.top};

  /** Toggle worldwide option */
  const worldwideToggle = () => {
    const data: AppOptions = {
      ...settings,
      worldwideOnly: !settings.worldwideOnly,
    };
    setSettings(data);
  };

  /** Toggle receiving event notification option */
  const eventToggle = () => {
    const data: AppOptions = {
      ...settings,
      jpEvent: !settings.jpEvent,
    };
    if (data.jpEvent) {
      messaging().subscribeToTopic('jp_event');
    } else {
      messaging().unsubscribeFromTopic('jp_event');
    }
    setSettings(data);
  };

  /** Toggle dark theme */
  const themeToggle = () => {
    const data: AppOptions = {
      ...settings,
      isDark: !settings.isDark,
    };
    setSettings(data);
  };

  const goToIdols = () => navigation.navigate('IdolsScreen');
  const goToSongs = () => navigation.navigate('SongsScreen');
  const goToAboutMe = () => navigation.navigate('AboutMeScreen');

  return (
    <ScrollView
      contentContainerStyle={top}
      showsVerticalScrollIndicator={false}>
      <View style={styles.group}>
        <Text style={styles.headline}>Options</Text>
      </View>
      <TouchableRipple onPress={worldwideToggle}>
        <View style={styles.settingRow}>
          <Text>Search Worldwide only</Text>
          <Switch
            value={settings.worldwideOnly}
            onValueChange={worldwideToggle}
          />
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={eventToggle}>
        <View style={styles.settingRow}>
          <Text>Notify event</Text>
          <Switch value={settings.jpEvent} onValueChange={eventToggle} />
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={themeToggle}>
        <View style={styles.settingRow}>
          <Text>Dark theme</Text>
          <Switch value={settings.isDark} onValueChange={themeToggle} />
        </View>
      </TouchableRipple>
      <View style={styles.group}>
        <Text style={styles.headline}>Navigation</Text>
      </View>
      <TouchableRipple onPress={goToIdols}>
        <View style={styles.button}>
          <Icon color={Colors.pink} name="face-woman" size={iconSize} />
          <View style={styles.space} />
          <Text>Idols</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={goToSongs}>
        <View style={styles.button}>
          <Icon
            color={Colors.green}
            name="music-box-multiple"
            size={iconSize}
          />
          <View style={styles.space} />
          <Text>Songs</Text>
        </View>
      </TouchableRipple>
      <TouchableRipple onPress={goToAboutMe}>
        <View style={styles.button}>
          <Icon color={Colors.blue} name="help-circle" size={iconSize} />
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
    padding: Metrics.baseMargin,
  },
  group: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    paddingTop: Metrics.doubleBaseMargin,
  },
  headline: {
    color: Colors.blue600,
    fontWeight: 'bold',
  },
  settingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrics.baseMargin,
  },
  space: {
    width: Metrics.baseMargin,
  },
});

export default MoreScreen;
