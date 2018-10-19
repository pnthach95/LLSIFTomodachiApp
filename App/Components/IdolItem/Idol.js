import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { Metrics } from '../../Theme'
import { AddHTTPS, findColorByAttribute } from '../../Utils';

export default class IdolItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imgWidth: Metrics.images.smallItemWidth,
      imgHeight: Metrics.images.smallItemWidth,
      colors: findColorByAttribute(this.props.item.attribute)
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, { backgroundColor: this.state.colors[1] }]} onPress={this.props.onPress}>
        <FastImage
          style={{
            width: Metrics.images.smallItemWidth,
            height: Metrics.images.smallItemWidth * this.state.imgHeight / this.state.imgWidth
          }}
          onLoad={(e) => {
            const { width, height } = e.nativeEvent
            this.setState({ imgWidth: width, imgHeight: height })
          }}
          source={{
            uri: AddHTTPS(this.props.item.chibi),
            priority: FastImage.priority.normal,
          }} />

        <View style={styles.info}>
          <Text style={styles.text}>{this.props.item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
