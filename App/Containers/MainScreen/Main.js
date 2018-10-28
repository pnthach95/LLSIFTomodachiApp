import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'

import TimerCountdown from '../../Components/TimerCountdown/Timer'
import Seperator from '../../Components/Seperator/Seperator'
import SquareButton from '../../Components/SquareButton/SquareButton'
import CachedDataActions from '../../Stores/CachedData/Actions'
import { AddHTTPS } from '../../Utils'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Metrics, Colors, Images, ApplicationStyles } from '../../Theme'
import styles from './styles'

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
    this.props.navigation.navigate('EventDetailScreen', { event: event.toObject() })
  }

  render() {
    if (this.props.cachedDataIsLoading) return <SplashScreen bgColor={Colors.pink} />
    if (this.props.cachedDataErrorMessage) {
      Alert.alert('Error', this.props.cachedDataErrorMessage)
      return <View style={{ backgroundColor: Colors.pink }} />
    }
    let data = this.props.cachedData
    let currentContests = data.get('current_contests')
    /** Sự kiện EN */
    let ENEvent = data.get('eventEN')
    /** Thời gian bắt đầu sự kiện EN */
    let ENEventStart = moment(ENEvent.get('english_beginning'))
    /** Thời gian kết thúc sự kiện EN */
    let ENEventEnd = moment(ENEvent.get('english_end'))
    /** Sự kiện JP */
    let JPEvent = data.get('eventJP')
    /** Thời gian bắt đầu sự kiện JP */
    let JPEventStart = moment(JPEvent.get('beginning'), 'YYYY-MM-DDTHH:mm:ssZ')
    /** Thời gian kết thúc sự kiện JP */
    let JPEventEnd = moment(JPEvent.get('end'), 'YYYY-MM-DDTHH:mm:ssZ')

    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={ApplicationStyles.header}>
          <View style={styles.leftHeader} />
          <View style={styles.centerHeader}>
            <Image source={Images.logo} style={ApplicationStyles.imageHeader} />
          </View>
          <View style={styles.rightHeader} />
        </View>

        {/* BODY */}
        <ScrollView style={styles.body}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          {/* ENGLISH BLOCK */}
          <Text style={{ color: 'white' }}>English Event: {ENEvent.get('english_status')}</Text>
          <Text style={styles.title}>{ENEvent.get('english_name')}</Text>
          <TouchableOpacity onPress={() => this.navigateToEventDetail(ENEvent)}>
            <FastImage
              source={{ uri: AddHTTPS(ENEvent.get('english_image')) }}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }}
              onLoad={e => this.onLoadFastImage(e)} />
          </TouchableOpacity>
          <Text style={styles.text}>Start: {ENEventStart.format('HH:mm MMM Do YYYY')}</Text>
          <Text style={styles.text}>End: {ENEventEnd.format('HH:mm MMM Do YYYY')}</Text>
          {ENEvent.get('world_current') && this.timer(ENEventEnd.diff(moment()))}
          <Seperator style={{ backgroundColor: 'white' }} />

          {/* JAPANESE BLOCK */}
          <Text style={{ color: 'white' }}>Japanese Event: {JPEvent.get('japan_status')}</Text>
          <Text style={styles.title}>{JPEvent.get('romaji_name')}</Text>
          <TouchableOpacity onPress={() => this.navigateToEventDetail(JPEvent)}>
            <FastImage
              source={{ uri: AddHTTPS(JPEvent.get('image')) }}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }}
              onLoad={e => this.onLoadFastImage(e)} />
          </TouchableOpacity>
          <Text style={styles.text}>Start: {JPEventStart.format('HH:mm MMM Do YYYY')}</Text>
          <Text style={styles.text}>End: {JPEventEnd.format('HH:mm MMM Do YYYY')}</Text>
          {JPEvent.get('japan_current') && this.timer(JPEventEnd.diff(moment()))}
          <Seperator style={{ backgroundColor: 'white' }} />

          {/* CONTEST BLOCK */}
          {currentContests.map((item, id) => (
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
          <View style={{ height: 10 }} />
        </ScrollView>
      </View >)
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
