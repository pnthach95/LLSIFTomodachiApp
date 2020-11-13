import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { Metrics, Colors } from '~/Theme';

type Props = {
  array: number[];
};

/**
 * Star bar in Song Detail Screen
 *
 * Prop:
 * - array: Star array
 */
const StarBar: React.FC<Props> = ({ array }) => {
  return (
    <View style={styles.container}>
      {array.map((item, index) => (
        <Icon
          key={`star${index}`}
          name={'md-star'}
          size={responsiveWidth(6)}
          color={Colors.star[item]}
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

StarBar.propTypes = {
  array: PropTypes.any,
};

export default StarBar;
