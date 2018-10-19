import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { Metrics } from '../../Theme'
import { AddHTTPS, findColorByAttribute } from '../../Utils';

export default class SongItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgWidth: Metrics.images.itemWidth,
      imgHeight: Metrics.images.itemWidth,
      colors: findColorByAttribute(this.props.item.attribute)
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, { backgroundColor: this.state.colors[1] }]}
        onPress={this.props.onPress}>
        <FastImage
          style={{
            width: Metrics.images.itemWidth,
            height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth
          }}
          onLoad={e => {
            const { width, height } = e.nativeEvent
            this.setState({ imgWidth: width, imgHeight: height })
          }}
          source={{ uri: AddHTTPS(this.props.item.image) }} />
        <View style={styles.info}>
          <Text style={styles.text}>{this.props.item.name}</Text>
          <Text style={styles.text}>{this.props.item.romaji_name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
