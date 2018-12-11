import React, { Component } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Seperator from '../Seperator/Seperator';
import { Metrics, ApplicationStyles, Images } from '../../Theme';
import { AddHTTPS, findColorByAttribute } from '../../Utils';

/**
 * Card item for Card List Screen, idolized and unidolized
 * 
 * Prop:
 * - `item`: [Card object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#objects)
 * - `onPress`: onPress function
 * 
 * State:
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `colors`: Color array
 * 
 * @export
 * @class CardItem
 * @extends {Component}
 */
export default class Card2PicsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      colors: findColorByAttribute(props.item.attribute)
    };
  }

  /**
   * Find image for skill
   *
   * @param {String} key
   * @returns Image
   * @memberof CardItem
   */
  findSkill(key) {
    switch (key) {
      case 'Score Up':
      case 'Perfect Charm':
      case 'Rhythmical Charm':
      case 'Total Charm':
      case 'Timer Charm':
        return Images.skill[0];
      case 'Perfect Lock':
      case 'Total Trick':
      case 'Timer Trick':
        return Images.skill[1];
      case 'Healer':
      case 'Timer Yell':
      case 'Total Yell':
      case 'Rhythmical Yell':
      case 'Perfect Yell':
        return Images.skill[2];
      default:
        return Images.skill[3];
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={[styles.container, { backgroundColor: this.state.colors[1] }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          {this.props.item.card_image
            && <FastImage
              source={{
                uri: AddHTTPS(this.props.item.card_image),
                priority: FastImage.priority.normal,
              }}
              onLoad={(e) => {
                const { width, height } = e.nativeEvent
                this.setState({ imgWidth: width, imgHeight: height })
              }}
              style={{
                width: Metrics.images.itemWidth,
                height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth
              }} />}
          {this.props.item.card_idolized_image
            && <FastImage
              source={{
                uri: AddHTTPS(this.props.item.card_idolized_image),
                priority: FastImage.priority.normal,
              }}
              onLoad={(e) => {
                const { width, height } = e.nativeEvent
                this.setState({ imgWidth: width, imgHeight: height })
              }}
              style={{
                width: Metrics.images.itemWidth,
                height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth
              }} />}
        </View>
        {/* FOOTER */}
        <Seperator style={{ backgroundColor: this.state.colors[0], marginVertical: 0 }} />
        <View style={{ backgroundColor: this.state.colors[1], flexDirection: 'row', borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}>
          <View style={ApplicationStyles.screen} />
          <View style={[styles.info, ApplicationStyles.screen]}>
            {(this.props.item.skill !== null && this.props.item.skill.length !== 0) &&
              <Image source={this.findSkill(this.props.item.skill)}
                style={[
                  ApplicationStyles.mediumIcon,
                  { tintColor: this.state.colors[0] }
                ]} />}

            <Image source={this.props.item.japan_only ? Images.region[0] : Images.region[1]}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: this.state.colors[0] }
              ]} />

            {this.props.item.is_promo &&
              <Image source={Images.promo}
                style={[
                  ApplicationStyles.mediumIcon,
                  { tintColor: this.state.colors[0] }
                ]} />}

            {this.props.item.is_special &&
              <Image source={Images.skill[3]}
                style={[
                  ApplicationStyles.mediumIcon,
                  { tintColor: this.state.colors[0] }
                ]} />}

            {this.props.item.event !== null &&
              <Image source={Images.event}
                style={[
                  ApplicationStyles.mediumIcon,
                  { tintColor: this.state.colors[0] }
                ]} />}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
