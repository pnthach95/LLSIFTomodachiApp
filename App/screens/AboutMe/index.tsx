import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import {
  Paragraph,
  Text,
  TouchableRipple,
  Divider,
  useTheme,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { AppStyles, Fonts, Metrics } from '~/Theme';
import { Config, RELEASE_NOTE } from '~/Config';
import { openLink } from '~/Utils';

const openGithub = () => openLink(Config.GITHUB_PROJECT);
const openLLSIFnet = () => openLink(Config.LLSIFNET);
const openSchoolido = () => openLink(Config.SCHOOLIDO);

const AboutMeScreen: React.FC<null> = () => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const bottom = { paddingBottom: insets.bottom };

  return (
    <ScrollView contentContainerStyle={[styles.container, bottom]}>
      <View style={AppStyles.center}>
        <Text style={Fonts.style.center}>
          {'Powered by '}
          {
            <Text
              onPress={openSchoolido}
              style={[Fonts.style.center, styles.textUnderline]}>
              {'School Idol Tomodachi'}
            </Text>
          }
          {', '}
          {
            <Text
              onPress={openLLSIFnet}
              style={[Fonts.style.center, styles.textUnderline]}>
              {'llsif.net'}
            </Text>
          }
        </Text>
        <TouchableRipple onPress={openGithub} style={AppStyles.center}>
          <View style={[AppStyles.center, styles.divider]}>
            <Icon name={'logo-github'} color={colors.text} size={50} />
            <Text>Project</Text>
          </View>
        </TouchableRipple>
      </View>
      <Divider style={[styles.divider, { backgroundColor: colors.text }]} />
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
