import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { Metrics } from '../../Theme'
import { AddHTTPS } from '../../Utils'

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
    super(props)
    this.state = {
      imgWidth: Metrics.widthBanner,
      imgHeight: 100
    }
  }

  getImage = (this.props.item.english_image === null)
    ? AddHTTPS(this.props.item.image)
    : AddHTTPS(this.props.item.english_image)

  eventName = (this.props.item.english_name !== null)
    ? `${this.props.item.english_name}\n${this.props.item.japanese_name}`
    : this.props.item.japanese_name

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.container}>
        <FastImage
          source={{
            uri: this.getImage,
            priority: FastImage.priority.normal
          }}
          onLoad={(e) => {
            const { width, height } = e.nativeEvent
            this.setState({ imgWidth: width, imgHeight: height })
          }}
          style={{
            alignSelf: 'center',
            width: Metrics.widthBanner,
            height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
          }} />

        <View style={styles.info}>
          <Text style={styles.text}>{this.eventName}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
