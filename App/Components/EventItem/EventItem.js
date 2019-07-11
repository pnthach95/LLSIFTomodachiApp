import React, { Component } from 'react';
import { TouchableNativeFeedback, View, Text } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Touchable from '../Touchable/Touchable';
import { Metrics, Colors } from '~/Theme';
import { AddHTTPS } from '~/Utils';
import { EventStatus } from '~/Config';

/**
 * Event item for Event List Screen
 *
 * Prop:
 * - `item`: [Event object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects)
 * - `onPress`: onPress function
 *
 * State:
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 *
 * @export
 * @class EventItem
 * @extends {Component}
 */
export default class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: Metrics.widthBanner,
      imgHeight: 100,
    };
  }

  getImage = (this.props.item.english_image === null)
    ? AddHTTPS(this.props.item.image)
    : AddHTTPS(this.props.item.english_image);

  eventName = ((this.props.item.english_name !== null
    && this.props.item.english_name.length !== 0)
    ? `${this.props.item.english_name}\n` : '')
    + this.props.item.japanese_name;

  render() {
    const { english_status, japan_status } = this.props.item;
    const isAnnounced = japan_status === EventStatus.ANNOUNCED || english_status === EventStatus.ANNOUNCED;
    const isOngoing = japan_status === EventStatus.ONGOING || english_status === EventStatus.ONGOING;
    const label = (isAnnounced) ? EventStatus.ANNOUNCED : ((isOngoing) ? EventStatus.ONGOING : '');
    const color = (isAnnounced) ? Colors.announced : ((isOngoing) ? Colors.ongoing : Colors.finished);
    return (
      <ElevatedView elevation={5} style={[styles.container, { backgroundColor: color }]}>
        <Touchable onPress={this.props.onPress} useForeground
          background={TouchableNativeFeedback.Ripple(color, false)}>
          <FastImage
            source={{
              uri: this.getImage,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={(e) => {
              const { width, height } = e.nativeEvent;
              this.setState({ imgWidth: width, imgHeight: height });
            }}
            style={{
              alignSelf: 'center',
              width: Metrics.widthBanner,
              height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth,
            }} />
          <View style={styles.textBox}>
            <Text style={styles.text}>
              {(label.length > 0 ? (`[${label.toUpperCase()}]\n`) : '') + this.eventName}
            </Text>
          </View>
        </Touchable>
      </ElevatedView>
    );
  }
}
