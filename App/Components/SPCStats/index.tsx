import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ProgressBar, Text} from 'react-native-paper';
import {AppStyles, Colors, Images, Metrics} from '~/Theme';
import useStore from '~/store';

type Props = {
  text: AttributeType;
  stat: number;
};

/** SPC = Smile Pure Cool */
const SPCStats = ({text, stat}: Props) => {
  const cachedData = useStore(s => s.cachedData);
  const maxStats = [
    cachedData?.maxStats?.Smile || 0,
    cachedData?.maxStats?.Pure || 0,
    cachedData?.maxStats?.Cool || 0,
  ];
  let progress = 0;
  let color = Colors.pink;
  switch (text) {
    case 'Smile':
      progress = stat / maxStats[0];
      color = Colors.pink;
      break;
    case 'Pure':
      progress = stat / maxStats[1];
      color = Colors.green;
      break;
    default:
      progress = stat / maxStats[2];
      color = Colors.blue;
      break;
  }

  return (
    <View style={styles.progressRow}>
      <Text>{text}</Text>
      <View style={AppStyles.row}>
        <FastImage
          resizeMode="contain"
          source={Images.multi[text]}
          style={[AppStyles.mediumIcon, styles.marginRight]}
        />
        <View style={AppStyles.screen}>
          <Text>{stat}</Text>
          <ProgressBar color={color} progress={progress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginRight: {
    marginRight: Metrics.baseMargin,
  },
  progressRow: {
    paddingVertical: Metrics.baseMargin,
  },
});

export default SPCStats;
