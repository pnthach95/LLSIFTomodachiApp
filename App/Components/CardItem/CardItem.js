import React, { Component } from 'react'
import { TouchableOpacity, View, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { Metrics, ApplicationStyles, Images } from '../../Theme'
import { AddHTTPS, findColorByAttribute } from '../../Utils';

export default class CardItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      colors: findColorByAttribute(this.props.item.attribute)
    }
  }

  findSkill(key) {
    switch (key) {
      case 'Score Up':
      case 'Perfect Charm':
      case 'Rhythmical Charm':
      case 'Total Charm':
      case 'Timer Charm':
        return Images.skill[0]
      case 'Perfect Lock':
      case 'Total Trick':
      case 'Timer Trick':
        return Images.skill[1]
      case 'Healer':
      case 'Timer Yell':
      case 'Total Yell':
      case 'Rhythmical Yell':
      case 'Perfect Yell':
        return Images.skill[2]
      default:
        return Images.skill[3]
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <FastImage
          style={{
            width: Metrics.images.itemWidth,
            height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth
          }}
          onLoad={(e) => {
            const { width, height } = e.nativeEvent
            this.setState({ imgWidth: width, imgHeight: height })
          }}
          source={{
            uri: AddHTTPS(this.props.item.card_image || this.props.item.card_idolized_image),
            priority: FastImage.priority.normal,
          }} />

        <View
          style={[
            styles.info,
            { backgroundColor: this.state.colors[1] }
          ]}>
          {this.props.item.skill &&
            <Image
              source={this.findSkill(this.props.item.skill)}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: this.state.colors[0] }
              ]} />}

          <Image
            source={this.props.item.japan_only ? Images.region[0] : Images.region[1]}
            style={[
              ApplicationStyles.mediumIcon,
              { tintColor: this.state.colors[0] }
            ]} />

          {this.props.item.is_promo &&
            <Image
              source={Images.promo}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: this.state.colors[0] }
              ]} />}

          {this.props.item.is_special &&
            <Image
              source={Images.skill[3]}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: this.state.colors[0] }
              ]} />}

          {this.props.item.event &&
            <Image
              source={Images.event}
              style={[
                ApplicationStyles.mediumIcon,
                { tintColor: this.state.colors[0] }
              ]} />}
        </View>
      </TouchableOpacity>
    )
  }
}
