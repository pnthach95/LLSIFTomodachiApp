import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

/**
 * Emulate stat in Card Detail Screen
 *
 * Prop:
 * - progress: (100 * stat / maxStat) percent
 * - number: Stat number
 *
 */
function ProgressBar({
  backgroundStyle, fillStyle, progress, number,
}) {
  return <View style={[styles.background, backgroundStyle]}>
    <View style={[styles.fill, fillStyle, { flex: progress }]}>
      {progress >= 20 && <Text style={styles.text}>{number}</Text>}
    </View>
    <View style={[styles.noFill, { flex: 100 - progress }]}>
      {progress < 20 && <Text style={styles.text}>{number}</Text>}
    </View>
  </View>;
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
  number: PropTypes.any,
  backgroundStyle: PropTypes.any,
  fillStyle: PropTypes.any,
};

export default ProgressBar;
