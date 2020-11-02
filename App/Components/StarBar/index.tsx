import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Metrics, Colors } from '~/Theme';

type StarBarType = {
  array: number[],
};

/**
 * Star bar in Song Detail Screen
 *
 * Prop:
 * - array: Star array
 *
 */
const StarBar: React.FC<StarBarType> = ({ array }) => {
  return <View style={styles.container}>
    {array.map((item, index) => (
      <Icon key={`star${index}`} name={'md-star'}
        size={Metrics.screenWidth / 15}
        color={Colors.star[item]} style={styles.star} />
    ))}
  </View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: Metrics.baseMargin,
  },
  star: {
    paddingHorizontal: 2,
  },
});

export default StarBar;
