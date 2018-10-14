import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Ionicons'

import { getMaxStats } from '../../Stores/CachedData/Selectors'
import Seperator from '../../Components/Seperator/Seperator'
import ProgressBar from '../../Components/ProgressBar/ProgressBar'
import SquareButton from '../../Components/SquareButton/SquareButton'
import TextRow from '../../Components/TextRow/TextRow'
import SplashScreen from '../SplashScreen/SplashScreen'
import { findColorByAttribute, AddHTTPS, findMainUnit, findSubUnit } from '../../Utils'
import { Metrics, Fonts, ApplicationStyles, Colors, Images } from '../../Theme'
import styles from './styles'

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
    this.setState({
      isLoading: false,
      colors: findColorByAttribute(this.state.item.attribute),
      maxStats: [
        this.props.maxStats.get('Smile'),
        this.props.maxStats.get('Pure'),
        this.props.maxStats.get('Cool')
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
      ]
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
    var icon = function (text) {
      switch (text) {
        case 'Smile':
          return 0
        case 'Pure':
          return 1
        default:
          return 2
      }
    }
    return (
      <View style={{ width: '100%' }}>
        <Text style={[Fonts.style.normal, styles.progressText]}>{text}</Text>
        <View style={styles.progressRow}>
          <Image source={Images.attribute[icon(text)]}
            style={[ApplicationStyles.mediumIcon, { marginRight: 10 }]} />
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

  statButton(id, text, stats, style) {
    return (
      <TouchableOpacity
        style={[
          styles.button, style,
          { backgroundColor: this.state.buttonID == id ? Colors.violet : Colors.inactive }
        ]}
        onPress={() => this.setState({ currentStats: stats, buttonID: id })}>
        <Text style={[Fonts.style.normal, { color: 'white' }]}>{text}</Text>
      </TouchableOpacity>
    )
  }

  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  render() {
    if (this.state.isLoading) return <SplashScreen />
    else
      return (
        <View style={styles.container}>
          <View style={[
            ApplicationStyles.header,
            styles.header,
            { backgroundColor: this.state.colors[1] }
          ]}>
            <View style={styles.leftHeader}>
              <SquareButton name={'ios-arrow-back'} onPress={() => this.props.navigation.goBack()} />
            </View>
            <View style={styles.centerHeader}>
              <Text style={Fonts.style.normal}>{this.state.item.idol.name}</Text>
            </View>
            <View style={styles.rightHeader}>
              <Image source={findMainUnit(this.state.item.idol.main_unit)}
                style={styles.rightHeaderImage} />
              <Image source={findSubUnit(this.state.item.idol.sub_unit)}
                style={styles.rightHeaderImage} />
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}>
            <LinearGradient colors={[this.state.colors[1], this.state.colors[0], 'white']}>
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
              <View style={{ paddingHorizontal: Metrics.doubleBaseMargin }}>
                <TextRow
                  item1={{ flex: 1, text: 'Card ID' }}
                  item2={{ flex: 2, text: this.state.item.game_id }}
                />
                <TextRow
                  item1={{ flex: 1, text: 'Release date' }}
                  item2={{ flex: 2, text: this.state.item.release_date }}
                />
                <Seperator />

                <TextRow
                  item1={{ flex: 1, text: 'Skill' }}
                  item2={{ flex: 2, text: this.state.item.skill }}
                />
                <TextRow
                  item1={{ flex: 1, text: '' }}
                  item2={{ flex: 2, text: this.state.item.skill_details }}
                />
                <Seperator />

                <TextRow
                  item1={{ flex: 1, text: 'Center skill' }}
                  item2={{ flex: 2, text: this.state.item.center_skill }}
                />
                <TextRow
                  item1={{ flex: 1, text: '' }}
                  item2={{ flex: 2, text: this.state.item.center_skill_details }}
                />
                <Seperator />

                {this.state.item.event &&
                  <View>
                    <Text style={Fonts.style.normal}>Event: {this.state.item.event.japanese_name}</Text>
                    <View style={ApplicationStyles.center}>
                      <FastImage
                        source={{ uri: AddHTTPS(this.state.item.event.image) }}
                        style={styles.banner}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                    </View>
                    <Seperator />
                  </View>}

                <View style={{ flexDirection: 'row' }}>
                  <Icon name='ios-heart' size={Metrics.icons.medium} color={'red'} />
                  <Text style={Fonts.style.normal}> : {this.state.item.hp}</Text>
                </View>
              </View>

              <View style={styles.buttonRow}>
                {this.statButton(0, 'Level 1', this.state.minStats, styles.leftRadius)}
                {this.state.item.non_idolized_max_level != 0 &&
                  this.statButton(1, `Level ${this.state.item.non_idolized_max_level}`, this.state.nonIdolMaxStats)}
                {this.state.item.idolized_max_level != 0 &&
                  this.statButton(2, `Level ${this.state.item.idolized_max_level}`, this.state.idolMaxStats, styles.rightRadius)}
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
  maxStats: getMaxStats(state)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardDetailScreen)
