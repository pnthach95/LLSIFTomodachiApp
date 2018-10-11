import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, View, Image } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { Metrics, Colors, ApplicationStyles, Images } from '../../Theme'
import { AddHTTPS } from '../../Utils';

export default class CardItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      colors: this.findColor(this.props.item.attribute)
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

  findColor(key) {
    switch (key) {
      case 'Smile':
        return [Colors.pink, Colors.lightPink]
      case 'Pure':
        return [Colors.green, Colors.lightGreen]
      case 'Cool':
        return [Colors.blue, Colors.lightBlue]
      default:
        return [Colors.violet, Colors.lightViolet]
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
            console.log(e.nativeEvent.width, e.nativeEvent.height);
            const width = e.nativeEvent.width;
            const height = e.nativeEvent.height;
            this.setState({ imgWidth: width, imgHeight: height })
          }}
          source={{
            uri: AddHTTPS(this.props.item.card_image ? this.props.item.card_image : this.props.item.card_idolized_image),
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
                ApplicationStyles.smallIcon,
                { tintColor: this.state.colors[0] }
              ]} />}

          <Image
            source={this.props.item.japan_only ? Images.region[0] : Images.region[1]}
            style={[
              ApplicationStyles.smallIcon,
              { tintColor: this.state.colors[0] }
            ]} />

          {this.props.item.is_promo &&
            <Image
              source={Images.promo}
              style={[
                ApplicationStyles.smallIcon,
                { tintColor: this.state.colors[0] }
              ]} />}

          {this.props.item.is_special &&
            <Image
              source={Images.skill[3]}
              style={[
                ApplicationStyles.smallIcon,
                { tintColor: this.state.colors[0] }
              ]} />}

          {this.props.item.event &&
            <Image
              source={Images.event}
              style={[
                ApplicationStyles.smallIcon,
                { tintColor: this.state.colors[0] }
              ]} />}
        </View>
      </TouchableOpacity>
    )
  }
}
