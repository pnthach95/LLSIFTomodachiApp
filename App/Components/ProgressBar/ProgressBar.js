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
 * @export
 * @class ProgressBar
 * @extends {React.Component}
 */
export default class ProgressBar extends React.Component {
  static propTypes = {
    backgroundStyle: PropTypes.any,
    fillStyle: PropTypes.any,
    progress: PropTypes.any,
    number: PropTypes.any,
  };

  render() {
    const {
      backgroundStyle, fillStyle, progress, number,
    } = this.props;
    return (
      <View style={[styles.background, backgroundStyle]}>
        <View style={[styles.fill, fillStyle, { flex: progress }]}>
          {progress >= 20 && <Text style={styles.text}>{number}</Text>}
        </View>
        <View style={[styles.noFill, { flex: 100 - progress }]}>
          {progress < 20 && <Text style={styles.text}>{number}</Text>}
        </View>
      </View>
    );
  }
}
