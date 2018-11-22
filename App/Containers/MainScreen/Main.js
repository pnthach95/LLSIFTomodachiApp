import React from 'react'
import { Image, TouchableOpacity, Alert } from 'react-native'
import { Text, Header, Left, Body, Container, Button, Icon, Content, H1 } from 'native-base'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import moment from 'moment'

import Seperator from '../../Components/Seperator/Seperator'
import TimerCountdown from '../../Components/TimerCountdown/Timer'
import SplashScreen from '../SplashScreen/SplashScreen'
import { AddHTTPS } from '../../Utils'
import { Config } from '../../Config'
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
    tabBarIcon: ({ focused }) =>
      <SimpleLineIcon name='home' size={28}
        color={focused ? Colors.pink : Colors.inactive} />,
    tabBarLabel: 'Home',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
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
      style={styles.text} />
  }

  _onLoadFastImage(e) {
    const { width, height } = e.nativeEvent
    this.setState({ imgWidth: width, imgHeight: height })
  }

  /**
   * Navigate to Event Detail Screen
   *
   * @param {Object} event Event object
   * @memberof MainScreen
   */
  _navigateToEventDetail(event) {
    this.props.navigation.navigate('EventDetailScreen', { event: event.toObject() })
  }

  _openDrawer = () => this.props.navigation.openDrawer()

  render() {
    if (this.props.cachedDataIsLoading)
      return <SplashScreen bgColor={Colors.pink} />
    if (this.props.cachedDataErrorMessage) {
      Alert.alert('Error', this.props.cachedDataErrorMessage)
      return <Container style={styles.container} />
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
    let JPEventStart = moment(JPEvent.get('beginning'), Config.DATETIME_FORMAT_INPUT)
    /** End time of Japanese event */
    let JPEventEnd = moment(JPEvent.get('end'), Config.DATETIME_FORMAT_INPUT)

    return (
      <Container style={styles.container}>
        {/* HEADER */}
        <Header transparent>
          <Left>
            <Button transparent onPress={this._openDrawer}>
              <Icon name={'ios-menu'} size={30} color={'white'} />
            </Button>
          </Left>
          <Body>
            <Image source={Images.logo}
              style={ApplicationStyles.imageHeader} />
          </Body>
        </Header>
        {/* BODY */}
        <Content padder
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          {/* ENGLISH BLOCK */}
          <Text style={styles.text}>
            {`English Event: ${ENEvent.get('english_status')}`}
          </Text>
          <H1 style={[styles.text, styles.paddingVertical]}>
            {ENEvent.get('english_name')}
          </H1>
          <TouchableOpacity onPress={() => this._navigateToEventDetail(ENEvent)}>
            <FastImage source={{ uri: AddHTTPS(ENEvent.get('english_image')) }}
              onLoad={e => this._onLoadFastImage(e)}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }} />
          </TouchableOpacity>
          <Text style={[styles.text, styles.paddingVertical]}>
            {`Start: ${ENEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${ENEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
          </Text>
          {ENEvent.get('world_current') && this.timer(ENEventEnd.diff(moment()))}
          <Seperator style={{ backgroundColor: 'white' }} />

          {/* JAPANESE BLOCK */}
          <Text style={{ color: 'white' }}>
            {`Japanese Event: ${JPEvent.get('japan_status')}`}
          </Text>
          <H1 style={[styles.text, styles.paddingVertical]}>
            {JPEvent.get('romaji_name')}
          </H1>
          <TouchableOpacity onPress={() => this._navigateToEventDetail(JPEvent)}>
            <FastImage source={{ uri: AddHTTPS(JPEvent.get('image')) }}
              onLoad={e => this._onLoadFastImage(e)}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }} />
          </TouchableOpacity>
          <Text style={[styles.text, styles.paddingVertical]}>
            {`Start: ${JPEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
          </Text>
          {JPEvent.get('japan_current') && this.timer(JPEventEnd.diff(moment()))}
          {/* <Seperator style={{ backgroundColor: 'white' }} /> */}

          {/* CONTEST BLOCK */}
          {/* {currentContests.map((item, id) => (
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
          ))} */}
        </Content>
      </Container>)
  }
}

const mapStateToProps = (state) => ({
  cachedData: state.cachedData.get('cachedData'),
  cachedDataErrorMessage: state.cachedData.get('cachedDataErrorMessage'),
  cachedDataIsLoading: state.cachedData.get('cachedDataIsLoading')
})

const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
