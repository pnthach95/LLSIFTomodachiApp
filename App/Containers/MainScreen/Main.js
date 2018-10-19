import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'

import CachedDataActions from 'App/Stores/CachedData/Actions'
import { AddHTTPS } from '../../Utils'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Metrics, Colors, Images, ApplicationStyles } from '../../Theme'
import styles from './styles'
import { LLSIFService } from '../../Services/LLSIFService'
import TimerCountdown from '../../Components/TimerCountdown/Timer'
import Seperator from '../../Components/Seperator/Seperator'

/**
 *Màn hình chính
 *
 * @class MainScreen
 * @extends {React.Component}
 */
class MainScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      /** Đang load dữ liệu */
      isLoading: true,
      /** Chiều rộng của hình */
      imgWidth: 0,
      /** Chiều cao của hình */
      imgHeight: 0,
      /** Thông tin sự kiện bản EN */
      ENEvent: null,
      /** Thông tin sự kiện bản JP */
      JPEvent: null,
      /** Thông tin các contest */
      currentContests: []
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon name='home' size={25} color={focused ? Colors.pink : Colors.inactive} />
    ),
    tabBarLabel: 'Home',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  componentDidMount() {
    this.props.fetchCachedData()
    if (!this.props.cachedDataIsLoading) {
      let data = this.props.cachedData
      let currentContests = data.get('current_contests')
      let eventEN = data.get('current_event_en').get('japanese_name')
      let eventJP = data.get('current_event_jp').get('japanese_name')
      LLSIFService.fetchEventData(eventEN).then(resEN => {
        LLSIFService.fetchEventData(eventJP).then(resJP => {
          this.setState({
            isLoading: false,
            currentContests: currentContests,
            ENEvent: resEN,
            JPEvent: resJP
          })
        })
      })
    }
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

  /**
   * Set state chiều cao, chiều rộng của hình tải về trong FastImage
   *
   * @param {*} e Event
   * @memberof MainScreen
   */
  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  navigateToEventDetail(event) {
    this.props.navigation.navigate('EventDetailScreen', { event: event })
  }

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.pink} />
    else {
      /** Sự kiện EN */
      let ENEvent = this.state.ENEvent
      /** Thời gian bắt đầu sự kiện EN */
      let ENEventStart = moment(ENEvent.english_beginning)
      /** Thời gian kết thúc sự kiện EN */
      let ENEventEnd = moment(ENEvent.english_end)
      /** Sự kiện JP */
      let JPEvent = this.state.JPEvent
      /** Thời gian bắt đầu sự kiện JP */
      let JPEventStart = moment(JPEvent.beginning, 'YYYY-MM-DDTHH:mm:ssZ')
      /** Thời gian kết thúc sự kiện JP */
      let JPEventEnd = moment(JPEvent.end, 'YYYY-MM-DDTHH:mm:ssZ')

      return (
        <View style={styles.container}>
          {/* HEADER */}
          <View style={ApplicationStyles.header}>
            <Image source={Images.logo} style={ApplicationStyles.imageHeader} />
          </View>

          {/* BODY */}
          <ScrollView style={styles.body} contentContainerStyle={styles.content}>
            {/* ENGLISH BLOCK */}
            <Text style={{ color: 'white' }}>English Event</Text>
            <Text style={styles.title}>{ENEvent.english_name}</Text>
            <TouchableOpacity onPress={() => this.navigateToEventDetail(ENEvent)}>
              <FastImage
                source={{ uri: AddHTTPS(ENEvent.english_image) }}
                style={{
                  width: Metrics.widthBanner,
                  height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
                }}
                onLoad={e => this.onLoadFastImage(e)} />
            </TouchableOpacity>
            <Text style={styles.text}>Start: {ENEventStart.format('HH:mm MMM Do YYYY')}</Text>
            <Text style={styles.text}>End: {ENEventEnd.format('HH:mm MMM Do YYYY')}</Text>
            {ENEvent.world_current && this.timer(ENEventEnd.diff(moment()))}
            <Seperator style={{ backgroundColor: 'white' }} />

            {/* JAPANESE BLOCK */}
            <Text style={{ color: 'white' }}>Japanese Event</Text>
            <Text style={styles.title}>{JPEvent.romaji_name}</Text>
            <TouchableOpacity onPress={() => this.navigateToEventDetail(JPEvent)}>
              <FastImage
                source={{ uri: AddHTTPS(JPEvent.image) }}
                style={{
                  width: Metrics.widthBanner,
                  height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
                }}
                onLoad={e => this.onLoadFastImage(e)} />
            </TouchableOpacity>
            <Text style={styles.text}>Start: {JPEventStart.format('HH:mm MMM Do YYYY')}</Text>
            <Text style={styles.text}>End: {JPEventEnd.format('HH:mm MMM Do YYYY')}</Text>
            {JPEvent.japan_current && this.timer(JPEventEnd.diff(moment()))}
            <Seperator style={{ backgroundColor: 'white' }} />

            {/* CONTEST BLOCK */}
            <View style={{ paddingVertical: 10 }}>
              {this.state.currentContests.map((item, id) => (
                <View key={'contest' + id}>
                  <Text style={styles.text}>{item.get('name')}</Text>
                  <FastImage
                    resizeMode={FastImage.resizeMode.contain}
                    source={{ uri: AddHTTPS(item.get('image')) }}
                    style={{
                      width: Metrics.widthBanner,
                      height: Metrics.widthBanner / 3,
                      alignSelf: 'center',
                    }} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View >)
    }
  }
}

const mapStateToProps = (state) => ({
  cachedData: state.cachedData.get('cachedData'),
  cachedDataErrorMessage: state.cachedData.get('cachedDataErrorMessage'),
  cachedDataIsLoading: state.cachedData.get('cachedDataIsLoading'),
})

const mapDispatchToProps = (dispatch) => ({
  fetchCachedData: () => dispatch(CachedDataActions.fetchCachedData()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
