import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Caption, Text} from 'react-native-paper';
import {Metrics} from '~/Theme';
import {openLink} from '~/Utils';

type Props = {
  title: string;
  content: string;
  twitter?: string | null;
  instagram?: string | null;
  myanimelist?: string | null;
};

/**
 * InfoLine
 */
const InfoLine: React.FC<Props> = ({
  title,
  content,
  twitter,
  instagram,
  myanimelist,
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
    if (myanimelist) {
      openLink(myanimelist);
    }
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
          <Text style={[styles.content, styles.link]} onPress={openTwitter}>
            {twitter}
          </Text>
        </Text>
      )}
      {!!instagram && (
        <Text style={styles.content}>
          Instagram:{' '}
          <Text style={[styles.content, styles.link]} onPress={openInstagram}>
            {instagram}
          </Text>
        </Text>
      )}
      {!!myanimelist && (
        <Text style={styles.content}>
          MyAnimeList:{' '}
          <Text style={[styles.content, styles.link]} onPress={openMAL}>
            {myanimelist}
          </Text>
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Metrics.smallMargin,
  },
  content: {
    textAlign: 'justify',
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default InfoLine;
