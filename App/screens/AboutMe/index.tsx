import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppStyles, Fonts } from '~/Theme';
import { Config, RELEASE_NOTE } from '~/Config';
import { openLink } from '~/Utils';

const openGithub = () => openLink(Config.GITHUB_PROJECT);
const openLLSIFnet = () => openLink(Config.LLSIFNET);
const openSchoolido = () => openLink(Config.SCHOOLIDO);

const AboutMeScreen: React.FC<null> = () => {
  return (
    <ScrollView>
      <View style={AppStyles.center}>
        <Text style={styles.versionText}>
          {'Powered by '}
          {
            <Text
              onPress={openSchoolido}
              style={[styles.versionText, styles.textUnderline]}>
              {'School Idol Tomodachi'}
            </Text>
          }
          {', '}
          {
            <Text
              onPress={openLLSIFnet}
              style={[styles.versionText, styles.textUnderline]}>
              {'llsif.net'}
            </Text>
          }
        </Text>
        <TouchableRipple onPress={openGithub} style={AppStyles.center}>
          <View style={AppStyles.center}>
            <Icon name={'logo-github'} size={50} />
            <Text style={Fonts.style.black}>Project</Text>
          </View>
        </TouchableRipple>
      </View>
      <Text>{RELEASE_NOTE}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textUnderline: {
    textDecorationLine: 'underline'
  },
  versionText: {
    ...Fonts.style.center
  }
});

export default AboutMeScreen;
