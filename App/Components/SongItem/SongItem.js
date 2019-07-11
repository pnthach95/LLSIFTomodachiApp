import React, { Component } from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Touchable from '../Touchable/Touchable';
import { Metrics } from '~/Theme';
import { AddHTTPS, findColorByAttribute } from '~/Utils';

/**
 * Song item for Song List Screen
 *
 * Prop:
 * - `item`: [Song object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#objects)
 * - `onPress`: onPress function
 *
 * State:
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `colors`: Color array
 *
 * @export
 * @class SongItem
 * @extends {Component}
 */
export default class SongItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: Metrics.images.itemWidth,
      imgHeight: Metrics.images.itemWidth,
      colors: findColorByAttribute(props.item.attribute),
    };
  }

  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
  };

  getName = this.props.item.name + (this.props.item.romaji_name !== null ? `\n${this.props.item.romaji_name}` : '');

  render() {
    const { itemWidth } = Metrics.images;
    const { imgHeight, imgWidth } = this.state;
    const styleImage = {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      width: itemWidth,
      height: itemWidth * imgHeight / imgWidth,
    };
    return (
      <ElevatedView elevation={5} style={[
        styles.container,
        { backgroundColor: this.state.colors[0] },
      ]}>
        <Touchable onPress={this.props.onPress}
          background={TouchableNativeFeedback.Ripple(this.state.colors[1], true)}>
          <FastImage source={{ uri: AddHTTPS(this.props.item.image) }}
            onLoad={(e) => {
              const { width, height } = e.nativeEvent;
              this.setState({ imgWidth: width, imgHeight: height });
            }}
            style={styleImage} />
          <View style={styles.info}>
            <Text style={styles.text}>{this.getName}</Text>
          </View>
        </Touchable>
      </ElevatedView>
    );
  }
}
