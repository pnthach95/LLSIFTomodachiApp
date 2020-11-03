import React, { useContext, useEffect, useState } from 'react';
import {
  View, Text, ImageBackground, TouchableHighlight,
  TouchableOpacity, Switch, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'react-native-firebase';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import VersionNumber from 'react-native-version-number';

import UserContext from '~/Context/UserContext';
import styles from './styles';
import { Images, AppStyles, Fonts } from '~/Theme';
import { Config, RELEASE_NOTE } from '~/Config';
import {
  AddHTTPS, loadSettings, saveSettings, openLink,
} from '~/Utils';

/**
 * Left Drawer show some information
 */
function Drawer() {
  const navigation = useNavigation();
  const { state } = useContext(UserContext);
  const [options, setOptions] = useState({
    isCollapsed: true,
    visible: true,
    ww_event: true,
    jp_event: true,
    worldwide_only: true,
  });

  useEffect(() => {
    loadSettings().then((res) => {
      setOptions({
        ...options,
        ww_event: res.ww_event,
        jp_event: res.jp_event,
        worldwide_only: res.worldwide_only,
      });
    });
  }, []);

  /**
   * Show/hide option layout
   *
   */
  const visibleToggle = () => setOptions({
    ...options,
    visible: !options.visible,
  });

  /**
   * Toggle worldwide option
   *
   */
  const worldwideToggle = () => {
    const settings = {
      ww_event: options.ww_event,
      jp_event: options.jp_event,
      worldwide_only: !options.worldwide_only,
    };
    setOptions({ ...options, worldwide_only: !options.worldwide_only });
    saveSettings(settings);
  };

  /**
   * Toggle receiving worldwide event notification option
   *
   */
  const wwEventToggle = () => {
    const settings = {
      ww_event: !options.ww_event,
      jp_event: options.jp_event,
      worldwide_only: options.worldwide_only,
    };
    if (!options.ww_event) {
      firebase.messaging().subscribeToTopic('ww_event');
    } else {
      firebase.messaging().unsubscribeFromTopic('ww_event');
    }
    setOptions({ ...options, ww_event: !options.ww_event });
    saveSettings(settings);
  };

  /**
   * Collapse content group
   *
   */
  const groupToggle = () => setOptions({
    ...options,
    isCollapsed: !options.isCollapsed,
  });

  /**
   * Toggle receiving japanese event notification option
   *
   */
  const jpEventToggle = () => {
    const settings = {
      ww_event: options.ww_event,
      jp_event: !options.jp_event,
      worldwide_only: options.worldwide_only,
    };
    if (!options.jp_event) {
      firebase.messaging().subscribeToTopic('jp_event');
    } else {
      firebase.messaging().unsubscribeFromTopic('jp_event');
    }
    setOptions({ ...options, jp_event: !options.jp_event });
    saveSettings(settings);
  };

  /**
   * Navigate to Card Detail Screen
   *
   */
  const navigateToCardDetail = () => {
    setOptions({ ...options, visible: true });
    navigation.navigate('CardDetailScreen', { item: state.cachedData.randomCard });
  };

  return <ImageBackground source={{ uri: AddHTTPS(state.cachedData.bgImage) }}
    style={styles.fullscreen}>
    <View style={AppStyles.screen}>
      {options.visible ? <View style={styles.container}>
        <View style={[AppStyles.center, styles.header]}>
          <FastImage source={Images.logo}
            style={styles.logo}
            resizeMode='contain' />
        </View>
        <View style={AppStyles.screen}>
          <TouchableOpacity onPress={groupToggle}>
            <View style={styles.group}>
              <Text style={Fonts.style.black}>OPTIONS</Text>
              <Icon name={options.isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down'} size={20} />
            </View>
          </TouchableOpacity>
          {options.isCollapsed && <View style={styles.body}>
            <ScrollView bounces={false}>
              <View style={styles.settingRow}>
                <Text style={Fonts.style.black}>Search Worldwide only</Text>
                <Switch value={options.worldwide_only}
                  onValueChange={worldwideToggle} />
              </View>
              <View style={styles.settingRow}>
                <Text style={Fonts.style.black}>Notify WW event</Text>
                <Switch value={options.ww_event}
                  onValueChange={wwEventToggle} />
              </View>
              <View style={styles.settingRow}>
                <Text style={Fonts.style.black}>Notify JP event</Text>
                <Switch value={options.jp_event}
                  onValueChange={jpEventToggle} />
              </View>
            </ScrollView>
          </View>}
          <TouchableOpacity onPress={groupToggle}>
            <View style={styles.group}>
              <Text style={Fonts.style.black}>ABOUT ME</Text>
              <Icon name={!options.isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down'} size={20} />
            </View>
          </TouchableOpacity>
          {!options.isCollapsed && <View style={AppStyles.screen}>
            <ScrollView bounces={false}
              contentContainerStyle={styles.textBlock}>
              <Text style={Fonts.style.black}>{RELEASE_NOTE}</Text>
            </ScrollView>
          </View>}
        </View>
        <View style={[AppStyles.center, styles.footer]}>
          <View style={styles.footerBlock}>
            <Text style={styles.versionText}>
              {'Powered by '}
              {<Text onPress={() => openLink(Config.SCHOOLIDO)}
                style={[styles.versionText, styles.textUnderline]}>
                {'School Idol Tomodachi'}
              </Text>}
              {', '}
              {<Text onPress={() => openLink(Config.LLSIFNET)}
                style={[styles.versionText, styles.textUnderline]}>
                {'llsif.net'}
              </Text>}
            </Text>
          </View>
          <View style={styles.footerBlock}>
            <TouchableHighlight onPress={() => openLink(Config.GITHUB_PROJECT)}
              underlayColor={'#0000'}
              style={AppStyles.center}>
              <View style={AppStyles.center}>
                <Icon name={'logo-github'} size={50} />
                <Text style={Fonts.style.black}>Project</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
        : <View style={[styles.container, styles.transparent]}>
          <TouchableHighlight onPress={navigateToCardDetail}
            underlayColor={'#fffa'}
            style={[AppStyles.center, styles.viewMore]}>
            <Text style={styles.versionText}>View card info</Text>
          </TouchableHighlight>
        </View>}

      <TouchableHighlight onPress={visibleToggle}
        underlayColor={'#fff'}
        style={[AppStyles.center, styles.versionContainer]}>
        <Text style={styles.versionText}>Version {VersionNumber.appVersion}</Text>
      </TouchableHighlight>
    </View>
  </ImageBackground>;
}

export default Drawer;
