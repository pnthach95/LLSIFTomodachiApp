import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'

import Seperator from '../../Components/Seperator/Seperator'
import TimerCountdown from '../../Components/TimerCountdown/Timer'
import CachedDataActions from '../../Stores/CachedData/Actions'
import { AddHTTPS } from '../../Utils'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Metrics, Colors, Images, ApplicationStyles } from '../../Theme'
import styles from './styles'

/**
 * Main Screen
 * 
 * State:
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `ENEvent`: English event
 * - `JPEvent`: Japanese event
 * - `currentContests`: Contest array
 * 
 * @class MainScreen
 * @extends {React.Component}
 */
class MainScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      imgWidth: 0,
      imgHeight: 0,
      ENEvent: null,
      JPEvent: null,
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

  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  /**
   * Navigate to Event Detail Screen
   *
   * @param {Object} event Event object
   * @memberof MainScreen
   */
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
    /** English event */
    let ENEvent = data.get('eventEN')
    /** Start time of English event */
    let ENEventStart = moment(ENEvent.get('english_beginning'))
    /** End time of English event */
    let ENEventEnd = moment(ENEvent.get('english_end'))
    /** Japanese event */
    let JPEvent = data.get('eventJP')
    /** Start time of Japanese event */
    let JPEventStart = moment(JPEvent.get('beginning'), 'YYYY-MM-DDTHH:mm:ssZ')
    /** End time of Japanese event */
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
            <FastImage source={{ uri: AddHTTPS(ENEvent.get('english_image')) }}
              onLoad={e => this.onLoadFastImage(e)}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }} />
          </TouchableOpacity>
          <Text style={styles.text}>Start: {ENEventStart.format('HH:mm MMM Do YYYY')}</Text>
          <Text style={styles.text}>End: {ENEventEnd.format('HH:mm MMM Do YYYY')}</Text>
          {ENEvent.get('world_current') && this.timer(ENEventEnd.diff(moment()))}
          <Seperator style={{ backgroundColor: 'white' }} />

          {/* JAPANESE BLOCK */}
          <Text style={{ color: 'white' }}>Japanese Event: {JPEvent.get('japan_status')}</Text>
          <Text style={styles.title}>{JPEvent.get('romaji_name')}</Text>
          <TouchableOpacity onPress={() => this.navigateToEventDetail(JPEvent)}>
            <FastImage source={{ uri: AddHTTPS(JPEvent.get('image')) }}
              onLoad={e => this.onLoadFastImage(e)}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }} />
          </TouchableOpacity>
          <Text style={styles.text}>Start: {JPEventStart.format('HH:mm MMM Do YYYY')}</Text>
          <Text style={styles.text}>End: {JPEventEnd.format('HH:mm MMM Do YYYY')}</Text>
          {JPEvent.get('japan_current') && this.timer(JPEventEnd.diff(moment()))}
          <Seperator style={{ backgroundColor: 'white' }} />

          {/* CONTEST BLOCK */}
          {currentContests.map((item, id) => (
            <View key={'contest' + id}>
              <Text style={styles.text}>{item.get('name')}</Text>
              <FastImage source={{ uri: AddHTTPS(item.get('image')) }}
                resizeMode={FastImage.resizeMode.contain}
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
  cachedDataIsLoading: state.cachedData.get('cachedDataIsLoading')
})

const mapDispatchToProps = (dispatch) => ({
  fetchCachedData: () => dispatch(CachedDataActions.fetchCachedData())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
