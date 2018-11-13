import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { Metrics } from '../../Theme'
import { AddHTTPS, findColorByAttribute } from '../../Utils'

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
    super(props)
    this.state = {
      imgWidth: Metrics.images.itemWidth,
      imgHeight: Metrics.images.itemWidth,
      colors: findColorByAttribute(props.item.attribute)
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}
        style={[
          styles.container,
          { backgroundColor: this.state.colors[1] }
        ]}>
        <FastImage source={{ uri: AddHTTPS(this.props.item.image) }}
          onLoad={e => {
            const { width, height } = e.nativeEvent
            this.setState({ imgWidth: width, imgHeight: height })
          }}
          style={{
            width: Metrics.images.itemWidth,
            height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth
          }} />
        <View style={styles.info}>
          <Text style={styles.text}>{this.props.item.name}</Text>
          {this.props.item.romaji_name != null && <Text style={styles.text}>{this.props.item.romaji_name}</Text>}
        </View>
      </TouchableOpacity>
    )
  }
}
