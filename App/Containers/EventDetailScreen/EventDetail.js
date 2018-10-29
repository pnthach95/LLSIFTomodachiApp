import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import moment from 'moment'

import Seperator from '../../Components/Seperator/Seperator'
import TimerCountdown from '../../Components/TimerCountdown/Timer'
import SquareButton from '../../Components/SquareButton/SquareButton'
import SplashScreen from '../SplashScreen/SplashScreen'
import { AddHTTPS, findAttribute } from '../../Utils'
import { Metrics, ApplicationStyles, Colors } from '../../Theme'
import styles from './styles'
import { LLSIFService } from '../../Services/LLSIFService'

/**
 * Màn hình thông tin chi tiết event
 * - event: Event object
 * - eventName: tên tiếng Nhật của event
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

  loadData() {
    LLSIFService.fetchCardList({ event_japanese_name: this.state.item.japanese_name }).then(resCard => {
      LLSIFService.fetchSongList({ event: this.state.item.japanese_name }).then(resSong => {
        this.setState({
          isLoading: false,
          cards: resCard,
          songs: resSong
        })
        console.log('+-----------------------------------')
        console.log('+ EventDetails', this.state.item)
        console.log('+ Cards', this.state.cards)
        console.log('+ Songs', this.state.songs)
        console.log('+-----------------------------------')
      })
    })
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

  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  navigateToCardDetail(item) {
    this.props.navigation.navigate('CardDetailScreen', { item: item })
  }

  navigateToSongDetail(item) {
    this.props.navigation.navigate('SongDetailScreen', { item: item })
  }

  /**
   * Bộ đếm lùi thời gian sự kiện đang diễn ra
   *
   * @param {Number} time Thời gian còn lại (miliseconds)
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
    /** Thời gian bắt đầu sự kiện EN */
    let ENEventStart = moment(this.state.item.english_beginning)
    /** Thời gian kết thúc sự kiện EN */
    let ENEventEnd = moment(this.state.item.english_end)
    /** Thời gian bắt đầu sự kiện JP */
    let JPEventStart = moment(this.state.item.beginning, 'YYYY-MM-DDTHH:mm:ssZ')
    /** Thời gian kết thúc sự kiện JP */
    let JPEventEnd = moment(this.state.item.end, 'YYYY-MM-DDTHH:mm:ssZ')
    return (
      <View style={styles.container}>
        <View style={[
          ApplicationStyles.header,
          styles.header
        ]}>
          <View style={styles.leftHeader}>
            <SquareButton name={'ios-arrow-back'} color={'white'} onPress={() => this.props.navigation.goBack()} />
          </View>
          <View style={styles.centerHeader} />
          <View style={styles.rightHeader} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          style={styles.scrollView}>
          {/* ENGLISH BLOCK */}
          {this.state.item.english_name &&
            <View style={[styles.content, { marginVertical: 10 }]}>
              <Text style={{ color: 'white' }}>English</Text>
              <Text style={styles.title}>{this.state.item.english_name}</Text>
              <FastImage
                source={{ uri: AddHTTPS(this.state.item.english_image) }}
                style={{
                  width: Metrics.widthBanner,
                  height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
                }}
                onLoad={e => this.onLoadFastImage(e)} />
              <Text style={styles.text}>Start: {ENEventStart.format('HH:mm MMM Do YYYY')}</Text>
              <Text style={styles.text}>End: {ENEventEnd.format('HH:mm MMM Do YYYY')}</Text>
              {this.state.item.world_current && this.timer(ENEventEnd.diff(moment()))}
            </View>}
          {this.state.item.english_name &&
            <Seperator style={{ backgroundColor: 'white' }} />}
          {/* JAPANESE BLOCK */}
          <Text style={{ color: 'white' }}>Japanese</Text>
          <Text style={styles.title}>{this.state.item.romaji_name}</Text>
          <FastImage
            source={{ uri: AddHTTPS(this.state.item.image) }}
            style={{
              width: Metrics.widthBanner,
              height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
            }}
            onLoad={e => this.onLoadFastImage(e)} />
          <Text style={styles.text}>Start: {JPEventStart.format('HH:mm MMM Do YYYY')}</Text>
          <Text style={styles.text}>End: {JPEventEnd.format('HH:mm MMM Do YYYY')}</Text>
          {this.state.item.japan_current && this.timer(JPEventEnd.diff(moment()))}

          {/* SONGS */}
          <View style={styles.cardList}>
            {this.state.songs.map((item, index) =>
              <TouchableOpacity key={'song' + index} style={styles.card} onPress={() => this.navigateToSongDetail(item)}>
                <FastImage source={{ uri: AddHTTPS(item.image) }} style={styles.song} />
                <View style={styles.songInfo}>
                  <Image source={findAttribute(item.attribute)} style={{ width: 25, height: 25 }} />
                  <Text style={{ color: 'white', paddingLeft: 10 }}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>

          {/* CARDS */}
          <View style={styles.cardList}>
            {this.state.cards.map((item, index) =>
              <TouchableOpacity key={'card' + index} style={styles.card} onPress={() => this.navigateToCardDetail(item)}>
                <View style={styles.cardImage}>
                  <FastImage source={{ uri: AddHTTPS(item.round_card_image) }} style={styles.roundImage} />
                  <View style={{ width: 5 }} />
                  <FastImage source={{ uri: AddHTTPS(item.round_card_idolized_image) }} style={styles.roundImage} />
                </View>
                <Text style={{ color: 'white' }}>{item.idol.name}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailScreen)
