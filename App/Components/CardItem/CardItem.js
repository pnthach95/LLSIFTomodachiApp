import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import { Metrics, Colors, ApplicationStyles } from '../../Theme'
import { AddHTTPS } from '../../Utils';

export default class CardItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    styles: PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.styles]} onPress={this.props.onPress}>
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
        <LinearGradient
          colors={[Colors.pink, Colors.lightPink]}
          style={ApplicationStyles.mainContainer}>
          <Text>Name: {this.props.item.idol.name}</Text>
          <Text>School: {this.props.item.idol.school}</Text>
          <Text>Year: {this.props.item.idol.year}</Text>
          <Text>Main unit: {this.props.item.idol.main_unit}</Text>
          <Text>Sub unit: {this.props.item.idol.sub_unit}</Text>
          <Text>Rarity: {this.props.item.rarity}</Text>
          <Text>Attribute: {this.props.item.attribute}</Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}
