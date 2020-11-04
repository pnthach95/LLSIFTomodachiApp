import React, { useContext } from 'react';
import { View, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import { Text, Switch } from 'react-native-paper';
import firebase from 'react-native-firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import VersionNumber from 'react-native-version-number';

import UserContext from '~/Context/UserContext';
import { AppStyles, Fonts, Metrics, Colors } from '~/Theme';
import { Config, RELEASE_NOTE } from '~/Config';
import { saveSettings, openLink } from '~/Utils';
import type { AppOptions, MoreScreenProps } from '~/Utils/types';

const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useContext(UserContext);

  /**
   * Toggle worldwide option
   *
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
   *
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
   *
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={AppStyles.screen}>
        <View style={styles.group}>
          <Text style={Fonts.style.black}>OPTIONS</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.settingRow}>
            <Text style={Fonts.style.black}>Search Worldwide only</Text>
            <Switch
              value={state.options.worldwideOnly}
              onValueChange={worldwideToggle}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={Fonts.style.black}>Notify WW event</Text>
            <Switch
              value={state.options.wwEvent}
              onValueChange={wwEventToggle}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={Fonts.style.black}>Notify JP event</Text>
            <Switch
              value={state.options.jpEvent}
              onValueChange={jpEventToggle}
            />
          </View>
        </View>
        <View style={styles.group}>
          <Text style={Fonts.style.black}>ABOUT ME</Text>
        </View>
        <View style={AppStyles.screen}>
          <Text style={Fonts.style.black}>{RELEASE_NOTE}</Text>
        </View>
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

      <TouchableHighlight
        underlayColor={'#fff'}
        style={[AppStyles.center, styles.versionContainer]}>
        <Text style={styles.versionText}>
          Version {VersionNumber.appVersion}
        </Text>
      </TouchableHighlight>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    alignItems: 'stretch',
    flex: 1,
    paddingVertical: 6
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
  settingRow: {
    alignItems: 'center',
    backgroundColor: Colors.fff6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrics.smallMargin,
    marginLeft: Metrics.baseMargin,
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
