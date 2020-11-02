import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import { Colors } from '~/Theme';

type ProgressBarType = {
  backgroundStyle?: ViewStyle,
  fillStyle: ViewStyle,
  progress: number,
  number: number,
};

/**
 * Emulate stat in Card Detail Screen
 *
 * Prop:
 * - progress: (100 * stat / maxStat) percent
 * - number: Stat number
 *
 */
const ProgressBar: React.FC<ProgressBarType> = ({
  backgroundStyle, fillStyle, progress, number,
}) => {
  return <View style={[styles.background, backgroundStyle]}>
    <View style={[styles.fill, fillStyle, { flex: progress }]}>
      {progress >= 20 && <Text style={styles.text}>{number}</Text>}
    </View>
    <View style={[styles.noFill, { flex: 100 - progress }]}>
      {progress < 20 && <Text style={styles.text}>{number}</Text>}
    </View>
  </View>;
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: Colors.aaa,
    borderColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1.5,
    flexDirection: 'row',
    height: 35,
    width: '80%',
  },
  fill: {
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row-reverse',
  },
  noFill: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    color: Colors.white,
    paddingHorizontal: 10,
  },
});

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  number: PropTypes.any,
  backgroundStyle: PropTypes.any,
  fillStyle: PropTypes.any,
};

export default ProgressBar;
