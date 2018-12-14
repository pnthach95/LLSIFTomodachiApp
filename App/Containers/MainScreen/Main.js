import React from 'react';
import { Text, View, Image, ScrollView, TouchableNativeFeedback, Alert, Platform } from 'react-native';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import VersionNumber from 'react-native-version-number';
import moment from 'moment';

import Seperator from '../../Components/Seperator/Seperator';
import Touchable from '../../Components/Touchable/Touchable';
import SquareButton from '../../Components/SquareButton/SquareButton';
import TimerCountdown from '../../Components/TimerCountdown/Timer';
import SplashScreen from '../SplashScreen/SplashScreen';
import { AddHTTPS, openLink } from '../../Utils';
import { Config, EventStatus } from '../../Config';
import { GithubService } from '../../Services/GithubService';
import { Metrics, Colors, Images, ApplicationStyles } from '../../Theme';
import styles from './styles';

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
    super(props);
    this.state = {
      version: null,
      imgWidth: 0,
      imgHeight: 0,
      ENEvent: null,
      JPEvent: null,
      currentContests: []
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => <Icon name='home' size={25}
      color={focused ? Colors.pink : Colors.inactive} />,
    tabBarLabel: 'Home',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      GithubService.fetchLatestVersion().then(result => {
        // console.log('github', result);
        let appVersionArr = VersionNumber.appVersion.split(/\D|[a-zA-Z]/);
        let gitVersionArr = result.tag_name.split(/\./);
        let appVersion = Number.parseInt(appVersionArr[0] + (appVersionArr[1].length === 1 ? '0' : '') + appVersionArr[1] + (appVersionArr[2].length === 1 ? '0' : '') + (appVersionArr[2] + 1));
        let gitVersion = Number.parseInt(gitVersionArr[0] + (gitVersionArr[1].length === 1 ? '0' : '') + gitVersionArr[1] + (gitVersionArr[2].length === 1 ? '0' : '') + gitVersionArr[2]);
        if (gitVersion > appVersion) {
          this.setState({
            version: {
              tag: result.tag_name,
              filename: result.assets[0].name,
              link: result.assets[0].browser_download_url
            }
          });
        }
      });
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
    return <TimerCountdown initialSecondsRemaining={time}
      allowFontScaling={true} style={styles.text} />
  }

  /**
   * Get width, height of image in FastImage
   *
   * @param {*} e
   * @memberof MainScreen
   */
  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent;
    this.setState({ imgWidth: width, imgHeight: height });
  }

  /**
   * Navigate to Event Detail Screen
   *
   * @param {Object} event Event object
   * @memberof MainScreen
   */
  navigateToEventDetail(event) {
    this.props.navigation.navigate('EventDetailScreen', { event: event.toObject() });
  }

  _openDrawer = () => this.props.navigation.openDrawer();

  render() {
    if (this.props.cachedDataIsLoading) return <SplashScreen bgColor={Colors.pink} />;
    if (this.props.cachedDataErrorMessage) {
      Alert.alert('Error', this.props.cachedDataErrorMessage);
      return <View style={{ backgroundColor: Colors.pink }} />;
    }
    let data = this.props.cachedData;
    let currentContests = data.get('current_contests');
    /** English event */
    let ENEvent = data.get('eventEN');
    /** Start time of English event */
    let ENEventStart = moment(ENEvent.get('english_beginning'));
    /** End time of English event */
    let ENEventEnd = moment(ENEvent.get('english_end'));
    /** Japanese event */
    let JPEvent = data.get('eventJP');
    /** Start time of Japanese event */
    let JPEventStart = moment(JPEvent.get('beginning'), Config.DATETIME_FORMAT_INPUT);
    /** End time of Japanese event */
    let JPEventEnd = moment(JPEvent.get('end'), Config.DATETIME_FORMAT_INPUT);

    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={ApplicationStyles.header}>
          <View style={ApplicationStyles.screen}>
            <SquareButton name={'ios-menu'} onPress={this._openDrawer} color={'white'} />
          </View>
          <View style={styles.centerHeader}>
            <Image source={Images.logo} style={ApplicationStyles.imageHeader} />
          </View>
          <View style={styles.rightHeader} />
        </View>
        {this.state.version !== null &&
          <Touchable useForeground style={styles.update}
            background={TouchableNativeFeedback.Ripple('white', false)}
            onLongPress={() => { }}
            onPress={() => openLink(this.state.version.link)}>
            <Text>{`Download new version ${this.state.version.tag} on Github!`}</Text>
          </Touchable>}

        {/* BODY */}
        <ScrollView style={styles.body}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          {/* ENGLISH BLOCK */}
          <Touchable useForeground style={styles.block}
            background={TouchableNativeFeedback.Ripple('white', false)}
            onLongPress={() => { }}
            onPress={() => this.navigateToEventDetail(ENEvent)}>
            <Text style={styles.text}>
              {`English Event: ${ENEvent.get('english_status')}`}
            </Text>
            <View style={styles.textbox}>
              <Text style={styles.title}>{ENEvent.get('english_name')}</Text>
            </View>
            <FastImage source={{ uri: AddHTTPS(ENEvent.get('english_image')) }}
              onLoad={e => this.onLoadFastImage(e)}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }} />
            <View style={styles.textbox}>
              <Text style={styles.text}>
                {`Start: ${ENEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${ENEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
              </Text>
            </View>
            {ENEvent.get('world_current') &&
              <View style={styles.textbox}>
                <Text style={styles.text}>
                  {this.timer(ENEventEnd.diff(moment()))}{` left`}
                </Text>
              </View>}
            {ENEvent.get('english_status') === EventStatus.ANNOUNCED &&
              <View style={styles.textbox}>
                <Text style={styles.text}>
                  {`Starts in `}{this.timer(ENEventStart.diff(moment()))}
                </Text>
              </View>}
          </Touchable>
          <Seperator style={{ backgroundColor: 'white' }} />
          {/* JAPANESE BLOCK */}
          <Touchable useForeground style={styles.block}
            background={TouchableNativeFeedback.Ripple('white', false)}
            onLongPress={() => { }}
            onPress={() => this.navigateToEventDetail(JPEvent)}>
            <Text style={styles.text}>
              {`Japanese Event: ${JPEvent.get('japan_status')}`}
            </Text>
            <View style={styles.textbox}>
              <Text style={styles.title}>{JPEvent.get('romaji_name')}</Text>
            </View>
            <FastImage source={{ uri: AddHTTPS(JPEvent.get('image')) }}
              onLoad={e => this.onLoadFastImage(e)}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
              }} />
            <View style={styles.textbox}>
              <Text style={styles.text}>
                {`Start: ${JPEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
              </Text>
            </View>
            {JPEvent.get('japan_current') &&
              <View style={styles.textbox}>
                <Text style={styles.text}>
                  {this.timer(JPEventEnd.diff(moment()))}{` left`}
                </Text>
              </View>}
            {JPEvent.get('japan_status') === EventStatus.ANNOUNCED &&
              <View style={styles.textbox}>
                <Text style={styles.text}>
                  {`Starts in `}{this.timer(JPEventStart.diff(moment()))}
                </Text>
              </View>}
          </Touchable>
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
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  cachedData: state.cachedData.get('cachedData'),
  cachedDataErrorMessage: state.cachedData.get('cachedDataErrorMessage'),
  cachedDataIsLoading: state.cachedData.get('cachedDataIsLoading')
});

const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
