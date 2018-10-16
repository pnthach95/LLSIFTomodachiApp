import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { Metrics, ApplicationStyles, Images } from '../../Theme'
import { AddHTTPS, findColorByAttribute } from '../../Utils';

export default class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      colors: findColorByAttribute(this.props.item.attribute)
    }
  }

  render() {
    return (
      <TouchableOpacity style={[styles.container, { backgroundColor: this.state.colors[1] }]} onPress={this.props.onPress}>
        <FastImage
          style={{
            width: Metrics.widthBanner,
            height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
          }}
          onLoad={(e) => {
            const { width, height } = e.nativeEvent
            this.setState({ imgWidth: width, imgHeight: height })
          }}
          source={{
            uri: AddHTTPS(this.props.item.image),
            priority: FastImage.priority.normal,
          }} />

        <View style={styles.info}>
          <Text style={styles.text}>{this.props.item.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
