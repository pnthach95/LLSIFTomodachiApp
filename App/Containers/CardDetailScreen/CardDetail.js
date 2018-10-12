import React from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

import ProgressBar from '../../Components/ProgressBar/ProgressBar'
import styles from './styles'
import SplashScreen from '../SplashScreen/SplashScreen'
import { findColorByAttribute, AddHTTPS } from '../../Utils'
import { Metrics, Fonts, ApplicationStyles, Colors } from '../../Theme'

class CardDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.navigation.getParam('item'),
      imgWidth: 0,
      imgHeight: 0,
      colors: [],
      isLoading: true,
      maxStats: null,
      minStats: [],
      nonIdolMaxStats: [],
      idolMaxStats: [],
      currentStats: [],
      buttonID: 0
    }
  }

  componentDidMount() {
    let _maxStats = this.props.cachedData.get('cards_info').get('max_stats')
    this.setState({
      colors: findColorByAttribute(this.state.item.attribute),
      isLoading: false,
      maxStats: [
        _maxStats.get('Smile'),
        _maxStats.get('Pure'),
        _maxStats.get('Cool')
      ],
      minStats: [
        this.state.item.minimum_statistics_smile,
        this.state.item.minimum_statistics_pure,
        this.state.item.minimum_statistics_cool
      ],
      nonIdolMaxStats: [
        this.state.item.non_idolized_maximum_statistics_smile,
        this.state.item.non_idolized_maximum_statistics_pure,
        this.state.item.non_idolized_maximum_statistics_cool
      ],
      idolMaxStats: [
        this.state.item.idolized_maximum_statistics_smile,
        this.state.item.idolized_maximum_statistics_pure,
        this.state.item.idolized_maximum_statistics_cool
      ],
      currentStats: [
        this.state.item.minimum_statistics_smile,
        this.state.item.minimum_statistics_pure,
        this.state.item.minimum_statistics_cool
      ],
    })
  }

  progressSmile(stat) {
    return 100 * stat / this.state.maxStats[0]
  }

  progressPure(stat) {
    return 100 * stat / this.state.maxStats[1]
  }

  progressCool(stat) {
    return 100 * stat / this.state.maxStats[2]
  }

  progressUnit(text, stat, color) {
    return (
      <View>
        <Text style={[Fonts.style.normal, styles.progressText]}>{text}</Text>
        <View style={{ alignItems: 'center' }}>
          <ProgressBar
            number={stat}
            progress={this.progressSmile(stat)}
            fillStyle={{ backgroundColor: color }} />
        </View>
      </View>
    )
  }

  progressView(stats) {
    return (
      <View>
        {this.progressUnit('Smile', stats[0], Colors.pink)}
        {this.progressUnit('Pure', stats[1], Colors.green)}
        {this.progressUnit('Cool', stats[2], Colors.blue)}
      </View>
    )
  }

  statButton(id, text, stats) {
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: this.state.buttonID == id ? Colors.violet : Colors.inactive }]}
        onPress={() => this.setState({ currentStats: stats, buttonID: id })}>
        <Text style={[Fonts.style.normal, { color: 'white' }]}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }

  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  render() {
    if (this.state.isLoading) return (<SplashScreen />)
    return (
      <View style={styles.container}>
        <View style={[ApplicationStyles.header, styles.header]}>
          <Icon name={'ios-arrow-back'} size={30} onPress={() => this.props.navigation.goBack()} />
          <Text style={Fonts.style.normal}>{this.state.item.idol.name}</Text>
          <View>
            <Icon name={'ios-person'} size={30} color={this.state.colors[0]} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: Metrics.doubleBaseMargin }}>
          <LinearGradient colors={['white', this.state.colors[0]]}>
            <View style={styles.imageRow}>
              {this.state.item.card_image &&
                <FastImage
                  source={{ uri: AddHTTPS(this.state.item.card_image) }}
                  style={{
                    width: Metrics.images.itemWidth,
                    height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth
                  }}
                  onLoad={e => this.onLoadFastImage(e)}
                />}
              <FastImage
                source={{ uri: AddHTTPS(this.state.item.card_idolized_image) }}
                style={{
                  width: Metrics.images.itemWidth,
                  height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth
                }}
                onLoad={e => this.onLoadFastImage(e)}
              />
            </View>

            <Text>School: {this.state.item.idol.school}</Text>
            <Text>{this.state.item.idol.main_unit}</Text>
            <Text>{this.state.item.idol.sub_unit}</Text>
            <Text>{this.state.item.idol.year}</Text>
            <Text>Card ID: {this.state.item.game_id}</Text>
            <Text>Rarity: {this.state.item.rarity}</Text>
            <Text>Release date: {this.state.item.release_date}</Text>
            <Text>Skill: {this.state.item.skill}</Text>
            <Text>Skill detail: {this.state.item.skill_details}</Text>
            <Text>HP: {this.state.item.hp}</Text>
            <Text>Center skill: {this.state.item.skill}</Text>
            <Text>Center skill detail: {this.state.item.center_skill_details}</Text>

            <View style={styles.buttonRow}>
              {this.statButton(0, 'Level 1', this.state.minStats)}
              {this.statButton(1, `Level ${this.state.item.non_idolized_max_level}`, this.state.nonIdolMaxStats)}
              {this.statButton(2, `Level ${this.state.item.idolized_max_level}`, this.state.idolMaxStats)}
            </View>
            {this.progressView(this.state.currentStats)}
            <View style={{ height: Metrics.doubleBaseMargin }} />
          </LinearGradient>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  cachedData: state.cachedData.get('cachedData'),
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDetailScreen)
