import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import { Metrics, Colors, ApplicationStyles } from '../../Theme'

export default class CardItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    onPress: PropTypes.func,
    styles: PropTypes.object,
    hide: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, this.props.styles]} onPress={this.props.onPress}>
        {/* <LinearGradient colors={[Colors.g3, Colors.g4]} style={ApplicationStyles.mainContainer}> */}
        <FastImage
          style={{ width: Metrics.images.itemWidth - 5, height: (Metrics.images.itemWidth - 5) * 720 / 512, borderTopLeftRadius: 10, borderTopRightRadius: 10, left: 1 }}
          source={{
            uri: 'https:' + (this.state.item.card_image ? this.state.item.card_image : this.state.item.card_idolized_image),
            priority: FastImage.priority.normal,
          }} />
        <Text>Name: {this.state.item.idol.name}</Text>
        <Text>School: {this.state.item.idol.school}</Text>
        <Text>Year: {this.state.item.idol.year}</Text>
        <Text>Main unit: {this.state.item.idol.main_unit}</Text>
        <Text>Sub unit: {this.state.item.idol.sub_unit}</Text>
        <Text>Rarity: {this.state.item.rarity}</Text>
        <Text>Attribute: {this.state.item.attribute}</Text>
        {/* </LinearGradient> */}
      </TouchableOpacity>
    )
  }
}
