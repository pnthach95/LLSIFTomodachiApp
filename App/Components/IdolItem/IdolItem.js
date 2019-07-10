import React, { Component } from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Touchable from '../Touchable/Touchable';
import { Metrics } from '../../Theme';
import { findColorByAttribute } from '../../Utils';

/**
 * Idol item for Idol List Screen
 *
 * Prop:
 * - `item`: [Idol object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Idols#objects)
 * - `onPress`: onPress function
 *
 * State:
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `colors`: Color array
 *
 * @export
 * @class IdolItem
 * @extends {Component}
 */
export default class IdolItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: Metrics.images.smallItemWidth,
      imgHeight: Metrics.images.smallItemWidth,
      colors: findColorByAttribute(props.item.attribute),
    };
  }

  render() {
    return (
      <ElevatedView elevation={5} style={[
        styles.container,
        { backgroundColor: this.state.colors[1] },
      ]}>
        <Touchable onPress={this.props.onPress}
          background={TouchableNativeFeedback.Ripple(this.state.colors[0], true)}>
          <FastImage
            source={{
              uri: this.props.item.chibi,
              priority: FastImage.priority.normal,
            }}
            onLoad={(e) => {
              const { width, height } = e.nativeEvent;
              this.setState({ imgWidth: width, imgHeight: height });
            }}
            style={{
              marginTop: 10,
              width: Metrics.images.smallItemWidth,
              height: Metrics.images.smallItemWidth * this.state.imgHeight / this.state.imgWidth,
            }} />

          <View style={styles.info}>
            <Text style={styles.text}>{this.props.item.name}</Text>
          </View>
        </Touchable>
      </ElevatedView>
    );
  }
}
