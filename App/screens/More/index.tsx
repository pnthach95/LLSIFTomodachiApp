import React, { useContext, useState } from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet
} from 'react-native';
import { Text } from 'react-native-paper';
import firebase from 'react-native-firebase';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';
import VersionNumber from 'react-native-version-number';

import UserContext from '~/Context/UserContext';
import { Images, AppStyles, Fonts, Metrics, Colors } from '~/Theme';
import { Config, RELEASE_NOTE } from '~/Config';
import { saveSettings, openLink } from '~/Utils';
import type { AppOptions, MoreScreenProps } from '~/Utils/types';

const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const { state } = useContext(UserContext);
  const [options, setOptions] = useState({
    isCollapsed: true,
    ...state.options
  });

  /**
   * Toggle worldwide option
   *
   */
  const worldwideToggle = () => {
    const settings: AppOptions = {
      wwEvent: options.wwEvent,
      jpEvent: options.jpEvent,
      worldwideOnly: !options.worldwideOnly,
      isDark: options.isDark
    };
    setOptions({ ...options, ...settings });
    saveSettings(settings);
  };

  /**
   * Toggle receiving worldwide event notification option
   *
   */
  const wwEventToggle = () => {
    const settings: AppOptions = {
      wwEvent: !options.wwEvent,
      jpEvent: options.jpEvent,
      worldwideOnly: options.worldwideOnly,
      isDark: options.isDark
    };
    if (!options.wwEvent) {
      firebase.messaging().subscribeToTopic('ww_event');
    } else {
      firebase.messaging().unsubscribeFromTopic('ww_event');
    }
    setOptions({ ...options, ...settings });
    saveSettings(settings);
  };

  /**
   * Collapse content group
   *
   */
  const groupToggle = () =>
    setOptions({
      ...options,
      isCollapsed: !options.isCollapsed
    });

  /**
   * Toggle receiving japanese event notification option
   *
   */
  const jpEventToggle = () => {
    const settings: AppOptions = {
      wwEvent: options.wwEvent,
      jpEvent: !options.jpEvent,
      worldwideOnly: options.worldwideOnly,
      isDark: options.isDark
    };
    if (!options.jpEvent) {
      firebase.messaging().subscribeToTopic('jp_event');
    } else {
      firebase.messaging().unsubscribeFromTopic('jp_event');
    }
    setOptions({ ...options, ...settings });
    saveSettings(settings);
  };

  return (
    <View style={AppStyles.screen}>
      <View style={styles.container}>
        <View style={[AppStyles.center, styles.header]}>
          <FastImage
            source={Images.logo}
            style={styles.logo}
            resizeMode='contain'
          />
        </View>
        <View style={AppStyles.screen}>
          <TouchableOpacity onPress={groupToggle}>
            <View style={styles.group}>
              <Text style={Fonts.style.black}>OPTIONS</Text>
              <Icon
                name={options.isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={20}
              />
            </View>
          </TouchableOpacity>
          {options.isCollapsed && (
            <View style={styles.body}>
              <ScrollView bounces={false}>
                <View style={styles.settingRow}>
                  <Text style={Fonts.style.black}>Search Worldwide only</Text>
                  <Switch
                    value={options.worldwideOnly}
                    onValueChange={worldwideToggle}
                  />
                </View>
                <View style={styles.settingRow}>
                  <Text style={Fonts.style.black}>Notify WW event</Text>
                  <Switch
                    value={options.wwEvent}
                    onValueChange={wwEventToggle}
                  />
                </View>
                <View style={styles.settingRow}>
                  <Text style={Fonts.style.black}>Notify JP event</Text>
                  <Switch
                    value={options.jpEvent}
                    onValueChange={jpEventToggle}
                  />
                </View>
              </ScrollView>
            </View>
          )}
          <TouchableOpacity onPress={groupToggle}>
            <View style={styles.group}>
              <Text style={Fonts.style.black}>ABOUT ME</Text>
              <Icon
                name={!options.isCollapsed ? 'ios-arrow-up' : 'ios-arrow-down'}
                size={20}
              />
            </View>
          </TouchableOpacity>
          {!options.isCollapsed && (
            <View style={AppStyles.screen}>
              <ScrollView
                bounces={false}
                contentContainerStyle={styles.textBlock}>
                <Text style={Fonts.style.black}>{RELEASE_NOTE}</Text>
              </ScrollView>
            </View>
          )}
        </View>
        <View style={[AppStyles.center, styles.footer]}>
          <View style={styles.footerBlock}>
            <Text style={styles.versionText}>
              {'Powered by '}
              {
                <Text
                  onPress={() => openLink(Config.SCHOOLIDO)}
                  style={[styles.versionText, styles.textUnderline]}>
                  {'School Idol Tomodachi'}
                </Text>
              }
              {', '}
              {
                <Text
                  onPress={() => openLink(Config.LLSIFNET)}
                  style={[styles.versionText, styles.textUnderline]}>
                  {'llsif.net'}
                </Text>
              }
            </Text>
          </View>
          <View style={styles.footerBlock}>
            <TouchableHighlight
              onPress={() => openLink(Config.GITHUB_PROJECT)}
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

      <TouchableHighlight
        underlayColor={'#fff'}
        style={[AppStyles.center, styles.versionContainer]}>
        <Text style={styles.versionText}>
          Version {VersionNumber.appVersion}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: 'stretch',
    flex: 1,
    paddingVertical: 6
  },
  container: {
    backgroundColor: Colors.ddda,
    bottom: 50,
    flex: 0,
    flexGrow: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  },
  footer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.eeec,
    height: 150,
    width: '100%'
  },
  footerBlock: {
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: 5
  },
  group: {
    alignItems: 'center',
    backgroundColor: Colors.fff9,
    borderBottomColor: Colors.c0005,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    padding: Metrics.baseMargin
  },
  header: {
    alignSelf: 'stretch',
    backgroundColor: Colors.fffb,
    height: 70
  },
  logo: {
    height: 70,
    width: '75%'
  },
  settingRow: {
    alignItems: 'center',
    backgroundColor: Colors.fff6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
    padding: Metrics.baseMargin
  },
  textBlock: {
    padding: Metrics.baseMargin
  },
  textUnderline: {
    textDecorationLine: 'underline'
  },
  versionContainer: {
    backgroundColor: Colors.white,
    bottom: 0,
    height: 50,
    left: 0,
    position: 'absolute',
    right: 0
  },
  versionText: {
    ...Fonts.style.black,
    ...Fonts.style.center
  }
});

export default MoreScreen;
