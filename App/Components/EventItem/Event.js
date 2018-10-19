import React, { Component } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { Metrics } from '../../Theme'
import { AddHTTPS, findColorByAttribute } from '../../Utils';

/**
 * Event item
 * - item: Event object
 */
export default class EventItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgWidth: Metrics.widthBanner,
      imgHeight: 100,
      colors: findColorByAttribute(this.props.item.attribute)
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress}>
        <FastImage
          style={{
            alignSelf: 'center',
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
          <Text style={styles.text}>{this.props.item.japanese_name}</Text>
          <Text style={styles.text}>{this.props.item.english_name}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}
