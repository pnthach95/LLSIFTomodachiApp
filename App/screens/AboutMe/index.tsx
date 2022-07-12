import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Divider,
  Paragraph,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import {Config, RELEASE_NOTE} from '~/Config';
import {AppStyles, Fonts, Metrics} from '~/Theme';
import {openLink} from '~/Utils';

const openGithub = () => openLink(Config.GITHUB_PROJECT);
const openLLSIFnet = () => openLink(Config.LLSIFNET);
const openSchoolido = () => openLink(Config.SCHOOLIDO);

const AboutMeScreen = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const bottom = {paddingBottom: insets.bottom};

  return (
    <ScrollView contentContainerStyle={[styles.container, bottom]}>
      <View style={AppStyles.center}>
        <Text style={Fonts.style.center}>
          {'Powered by '}
          {
            <Text
              style={[Fonts.style.center, styles.textUnderline]}
              onPress={openSchoolido}>
              {'School Idol Tomodachi'}
            </Text>
          }
          {', '}
          {
            <Text
              style={[Fonts.style.center, styles.textUnderline]}
              onPress={openLLSIFnet}>
              {'llsif.net'}
            </Text>
          }
        </Text>
        <TouchableRipple style={AppStyles.center} onPress={openGithub}>
          <View style={[AppStyles.center, styles.divider]}>
            <Icon color={colors.text} name={'logo-github'} size={50} />
            <Text>Project</Text>
          </View>
        </TouchableRipple>
      </View>
      <Divider style={[styles.divider, {backgroundColor: colors.text}]} />
      <Paragraph style={styles.changelog}>{RELEASE_NOTE}</Paragraph>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  changelog: {
    padding: Metrics.baseMargin,
  },
  container: {
    paddingVertical: Metrics.baseMargin,
  },
  divider: {
    marginVertical: Metrics.baseMargin,
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
});

export default AboutMeScreen;
