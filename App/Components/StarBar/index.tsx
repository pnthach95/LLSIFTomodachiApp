import React from 'react';
import {StyleSheet, View} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Metrics} from '~/Theme';

type Props = {
  array: number[];
};

/**
 * Star bar in Song Detail Screen
 *
 * Prop:
 * - array: Star array
 */
const StarBar = ({array}: Props) => {
  return (
    <View style={styles.container}>
      {array.map((item, index) => (
        <Icon
          key={`star${index}`}
          color={Colors.star[item]}
          name={'md-star'}
          size={responsiveWidth(6)}
          style={styles.star}
        />
      ))}
    </View>
  );
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
