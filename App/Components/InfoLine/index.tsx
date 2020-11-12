import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Text, Caption } from 'react-native-paper';
import { openLink } from '~/Utils';
import { Metrics } from '~/Theme';

type InfoLineType = {
  title: string;
  content: string;
  twitter?: string | null;
  instagram?: string | null;
  myanimelist?: string | null;
};

/**
 * InfoLine
 */
const InfoLine: React.FC<InfoLineType> = ({
  title,
  content,
  twitter,
  instagram,
  myanimelist
}) => {
  const openTwitter = () => {
    if (twitter) {
      openLink(`https://twitter.com/${twitter}`);
    }
  };
  const openInstagram = () => {
    if (instagram) {
      openLink(`https://www.instagram.com/${instagram}`);
    }
  };
  const openMAL = () => {
    if (myanimelist) openLink(myanimelist);
  };

  return (
    <View style={styles.container}>
      <Caption>{title}</Caption>
      <Text selectable style={styles.content}>
        {content}
      </Text>
      {!!twitter && (
        <Text style={styles.content}>
          Twitter:{' '}
          <Text onPress={openTwitter} style={[styles.content, styles.link]}>
            {twitter}
          </Text>
        </Text>
      )}
      {!!instagram && (
        <Text style={styles.content}>
          Instagram:{' '}
          <Text onPress={openInstagram} style={[styles.content, styles.link]}>
            {instagram}
          </Text>
        </Text>
      )}
      {!!myanimelist && (
        <Text style={styles.content}>
          MyAnimeList:{' '}
          <Text onPress={openMAL} style={[styles.content, styles.link]}>
            {myanimelist}
          </Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.smallMargin
  },
  content: {
    textAlign: 'justify'
  },
  link: {
    textDecorationLine: 'underline'
  }
});

InfoLine.propTypes = {
  content: PropTypes.any,
  instagram: PropTypes.any,
  myanimelist: PropTypes.any,
  title: PropTypes.any,
  twitter: PropTypes.any
};

export default InfoLine;
