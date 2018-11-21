import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'

import Seperator from '../../Components/Seperator/Seperator'
import SquareButton from '../../Components/SquareButton/SquareButton'
import TimerCountdown from '../../Components/TimerCountdown/Timer'
import SplashScreen from '../SplashScreen/SplashScreen'
import { LLSIFService } from '../../Services/LLSIFService'
import { AddHTTPS, findAttribute } from '../../Utils'
import { Config } from '../../Config'
import { Metrics, ApplicationStyles, Colors } from '../../Theme'
import styles from './styles'

/**
 * Event Detail Screen
 * 
 * From parent screen, pass `item` (event object) or `eventName` (Japanese only) to show event detail
 * 
 * State:
 * - `isLoading`: Loading state
 * - `item`: Event object
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `cards`: Card list
 * - `songs`: Song list
 *
 * Event object: https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects
 * 
 * @class EventDetailScreen
 * @extends {React.Component}
 */
class EventDetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      item: this.props.navigation.getParam('event'),
      imgWidth: 0,
      imgHeight: 0,
      cards: [],
      songs: []
    }
  }

  componentDidMount() {
    if (this.state.item) {
      this.loadData()
    } else {
      let name = this.props.navigation.getParam('eventName')
      LLSIFService.fetchEventData(name).then(res => {
        this.setState({ item: res }, () => this.loadData())
      })
    }
  }

  /**
   * Load card list, song list in event
   *
   * @memberof EventDetailScreen
   */
  loadData() {
    LLSIFService.fetchCardList({ event_japanese_name: this.state.item.japanese_name }).then(resCard => {
      LLSIFService.fetchSongList({ event: this.state.item.japanese_name }).then(resSong => {
        this.setState({
          isLoading: false,
          cards: resCard,
          songs: resSong
        })
        console.log('+-----------------------------------')
        console.log('| EventDetails', this.state.item)
        console.log('| Cards', this.state.cards)
        console.log('| Songs', this.state.songs)
        console.log('+-----------------------------------')
      })
    })
  }

  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  /**
   * Navigate to Card Detail Screen
   *
   * @param {Object} item Card object
   * @memberof EventDetailScreen
   */
  navigateToCardDetail(item) {
    this.props.navigation.navigate('CardDetailScreen', { item: item })
  }

  /**
   * Navigate to Song Detail Screen
   *
   * @param {Object} item Song object
   * @memberof EventDetailScreen
   */
  navigateToSongDetail(item) {
    this.props.navigation.navigate('SongDetailScreen', { item: item })
  }

  /**
   * Countdown timer for ongoing event
   *
   * @param {Number} time Remaining time (miliseconds)
   * @returns
   * @memberof MainScreen
   */
  timer(time) {
    return <TimerCountdown
      initialSecondsRemaining={time}
      allowFontScaling={true}
      style={styles.text}
    />
  }

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.violet} />
    /** Start time of English event */
    let ENEventStart = moment(this.state.item.english_beginning)
    /** End time of English event */
    let ENEventEnd = moment(this.state.item.english_end)
    /** Start time of Japan event */
    let JPEventStart = moment(this.state.item.beginning, Config.DATETIME_FORMAT_INPUT)
    /** End time of Japan event */
    let JPEventEnd = moment(this.state.item.end, Config.DATETIME_FORMAT_INPUT)
    return (
      <View style={styles.container}>
        <View style={[ApplicationStyles.header, styles.header]}>
          <View style={styles.leftHeader}>
            <SquareButton name={'ios-arrow-back'} color={'white'}
              onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.centerHeader} />
          <View style={styles.rightHeader} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          style={styles.scrollView}>
          {/* ENGLISH BLOCK */}
          {this.state.item.english_name !== null &&
            <View style={[styles.content, { marginVertical: 10 }]}>
              <Text style={{ color: 'white' }}>English</Text>
              <Text style={styles.title}>
                {this.state.item.english_name.length === 0 ?
                  this.state.item.romaji_name : this.state.item.english_name}
              </Text>
              <FastImage source={{ uri: AddHTTPS(this.state.item.english_image) }}
                resizeMode={FastImage.resizeMode.contain}
                onLoad={e => this.onLoadFastImage(e)}
                style={{
                  width: Metrics.widthBanner,
                  height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
                }} />
              <Text style={styles.text}>
                {`Start: ${ENEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${ENEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
              </Text>
              {this.state.item.world_current && this.timer(ENEventEnd.diff(moment()))}
            </View>}
          {this.state.item.english_name !== null &&
            <Seperator style={{ backgroundColor: 'white' }} />}

          {/* JAPANESE BLOCK */}
          <Text style={{ color: 'white' }}>Japanese</Text>
          <Text style={styles.title}>{this.state.item.romaji_name}</Text>
          <FastImage source={{ uri: AddHTTPS(this.state.item.image) }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={e => this.onLoadFastImage(e)}
            style={{
              width: Metrics.widthBanner,
              height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
            }} />
          <Text style={styles.text}>
            {`Start: ${JPEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
          </Text>
          {this.state.item.japan_current && this.timer(JPEventEnd.diff(moment()))}
          {this.state.songs.length !== 0 && <Seperator style={{ backgroundColor: 'white' }} />}
          {/* SONGS */}
          {this.state.songs.length !== 0
            && <View>
              <Text style={styles.text}>Song</Text>
              <View style={styles.cardList}>
                {this.state.songs.map((item, index) =>
                  <TouchableOpacity key={'song' + index}
                    onPress={() => this.navigateToSongDetail(item)}
                    style={styles.card}>
                    <FastImage source={{ uri: AddHTTPS(item.image) }} style={styles.song} />
                    <View style={styles.songInfo}>
                      <Image source={findAttribute(item.attribute)} style={styles.attributeIcon} />
                      <Text style={styles.songName}>{item.name}</Text>
                    </View>
                  </TouchableOpacity>)}
              </View>
            </View>}
          <Seperator style={{ backgroundColor: 'white' }} />
          <Text style={styles.text}>Rewards</Text>
          {/* CARDS */}
          <View style={styles.cardList}>
            {this.state.cards.map((item, index) =>
              <TouchableOpacity key={'card' + index}
                onPress={() => this.navigateToCardDetail(item)}
                style={styles.card}>
                <View style={styles.cardImage}>
                  <FastImage source={{ uri: AddHTTPS(item.round_card_image) }}
                    style={styles.roundImage} />
                  <View style={{ width: 5 }} />
                  <FastImage source={{ uri: AddHTTPS(item.round_card_idolized_image) }}
                    style={styles.roundImage} />
                </View>
                <Text style={{ color: 'white' }}>{item.idol.name}</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={{ height: 10 }} />
        </ScrollView>
      </View>)
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen)
