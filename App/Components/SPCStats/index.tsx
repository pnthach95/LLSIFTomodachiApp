import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import UserContext from '~/Context/UserContext';
import { Metrics, AppStyles, Colors, Images } from '~/Theme';

import type { AttributeType } from '~/typings';

type Props = {
  text: AttributeType;
  stat: number;
};

/** SPC = Smile Pure Cool */
const SPCStats = ({ text, stat }: Props): JSX.Element => {
  const { state } = useContext(UserContext);
  const maxStats = [
    state.cachedData?.maxStats?.Smile || 0,
    state.cachedData?.maxStats?.Pure || 0,
    state.cachedData?.maxStats?.Cool || 0,
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
          source={Images.multi[text]}
          resizeMode='contain'
          style={[AppStyles.mediumIcon, styles.marginRight]}
        />
        <View style={AppStyles.screen}>
          <Text>{stat}</Text>
          <ProgressBar progress={progress} color={color} />
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
