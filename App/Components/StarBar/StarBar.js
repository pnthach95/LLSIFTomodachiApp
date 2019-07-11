import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { Metrics, Colors } from '~/Theme';

/**
 * Star bar in Song Detail Screen
 *
 * Prop:
 * - array: Star array
 *
 * @export
 * @class StarBar
 * @extends {React.Component}
 */
export default class StarBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.array.map((item, index) => (
          <Icon key={`star${index}`} name={'md-star'}
            size={Metrics.screenWidth / 15}
            color={Colors.star[item]} style={styles.star} />
        ))}
      </View>
    );
  }
}
