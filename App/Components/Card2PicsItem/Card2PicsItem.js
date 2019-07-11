import React, { Component } from 'react';
import { TouchableNativeFeedback, View, Image } from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Seperator from '../Seperator/Seperator';
import Touchable from '../Touchable/Touchable';
import { Metrics, ApplicationStyles, Images } from '~/Theme';
import { AddHTTPS, findColorByAttribute, findSkill } from '~/Utils';

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
 * - `images`: Images (card_image, card_idolized_image)
 * - `colors`: Color array
 *
 * @export
 * @class CardItem
 * @extends {Component}
 */
export default class Card2PicsItem extends Component {
  constructor(props) {
    super(props);
    const tmp = [];
    if (props.item.card_image !== null) tmp.push(AddHTTPS(props.item.card_image));
    if (props.item.card_idolized_image !== null) tmp.push(AddHTTPS(props.item.card_idolized_image));
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      images: tmp,
      colors: findColorByAttribute(props.item.attribute),
    };
  }

  render() {
    return (
      <ElevatedView elevation={5}
        style={[styles.container, { backgroundColor: this.state.colors[1] }]}>
        <Touchable onPress={this.props.onPress} useForeground
          background={TouchableNativeFeedback.Ripple(this.state.colors[0], false)}>
          <View style={styles.row}>
            {this.state.images.map((value, index) => <FastImage
              key={index}
              source={{ uri: value }}
              onLoad={(e) => {
                const { width, height } = e.nativeEvent;
                this.setState({ imgWidth: width, imgHeight: height });
              }}
              style={{
                width: Metrics.images.itemWidth,
                height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth,
              }} />)}
          </View>
          {/* FOOTER */}
          <Seperator style={{ backgroundColor: this.state.colors[0], marginVertical: 0 }} />
          <View style={[styles.info, { backgroundColor: this.state.colors[1] }]}>
            <View style={ApplicationStyles.screen} />
            <View style={[styles.infoRight, ApplicationStyles.screen]}>
              {(this.props.item.skill !== null && this.props.item.skill.length !== 0)
                && <Image source={findSkill(this.props.item.skill)}
                  style={[
                    ApplicationStyles.mediumIcon,
                    { tintColor: this.state.colors[0] },
                  ]} />}

              <Image source={this.props.item.japan_only ? Images.region[0] : Images.region[1]}
                style={[
                  ApplicationStyles.mediumIcon,
                  { tintColor: this.state.colors[0] },
                ]} />

              {this.props.item.is_promo
                && <Image source={Images.promo}
                  style={[
                    ApplicationStyles.mediumIcon,
                    { tintColor: this.state.colors[0] },
                  ]} />}

              {this.props.item.is_special
                && <Image source={Images.skill[3]}
                  style={[
                    ApplicationStyles.mediumIcon,
                    { tintColor: this.state.colors[0] },
                  ]} />}

              {this.props.item.event !== null
                && <Image source={Images.event}
                  style={[
                    ApplicationStyles.mediumIcon,
                    { tintColor: this.state.colors[0] },
                  ]} />}
            </View>
          </View>
        </Touchable>
      </ElevatedView>
    );
  }
}
