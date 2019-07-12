import React from 'react';
import {
  Text, View, Image, ScrollView,
  TouchableNativeFeedback, Alert, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import VersionNumber from 'react-native-version-number';
import moment from 'moment';

import Seperator from '~/Components/Seperator/Seperator';
import Touchable from '~/Components/Touchable/Touchable';
import SquareButton from '~/Components/SquareButton/SquareButton';
import TimerCountdown from '~/Components/TimerCountdown/Timer';
import { AddHTTPS, openLink } from '~/Utils';
import { Config, EventStatus } from '~/Config';
import GithubService from '~/Services/GithubService';
import {
  Metrics, Colors, Images, ApplicationStyles,
} from '~/Theme';
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
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: null,
      imgWidth: 1,
      imgHeight: 0,
      ENEvent: null,
      JPEvent: null,
      currentContests: [],
    };
  }

  static propTypes = {
    cachedData: PropTypes.object,
    cachedDataErrorMessage: PropTypes.string,
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => <Icon name='home' size={25}
      color={focused ? Colors.pink : Colors.inactive} />,
    tabBarLabel: 'Home',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive,
    },
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      GithubService.fetchLatestVersion().then((result) => {
        // console.log('github', result);
        const appVersionArr = VersionNumber.appVersion.split(/\D|[a-zA-Z]/);
        const gitVersionArr = result.tag_name.split(/\./);
        const appVersion = Number.parseInt(appVersionArr[0] + (appVersionArr[1].length === 1 ? '0' : '') + appVersionArr[1] + (appVersionArr[2].length === 1 ? '0' : '') + (appVersionArr[2] + 1), 10);
        const gitVersion = Number.parseInt(gitVersionArr[0] + (gitVersionArr[1].length === 1 ? '0' : '') + gitVersionArr[1] + (gitVersionArr[2].length === 1 ? '0' : '') + gitVersionArr[2], 10);
        if (gitVersion > appVersion) {
          this.setState({
            version: {
              tag: result.tag_name,
              filename: result.assets[0].name,
              link: result.assets[0].browser_download_url,
            },
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
      allowFontScaling={true} style={styles.text} />;
  }

  /**
   * Get width, height of image in FastImage
   *
   * @param {*} e
   * @memberof MainScreen
   */
  onLoadFastImage = (e) => {
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
    this.props.navigation.navigate('EventDetailScreen', { event });
  }

  openDrawer = () => this.props.navigation.openDrawer();

  render() {
    if (this.props.cachedDataErrorMessage) {
      Alert.alert('Error', this.props.cachedDataErrorMessage);
      return <View style={{ backgroundColor: Colors.pink }} />;
    }
    const data = this.props.cachedData;
    // eslint-disable-next-line no-unused-vars
    const currentContests = data.current_contests;
    /** Japanese event, English event */
    const { JPEvent, ENEvent } = data;
    /** Start time of English event */
    const ENEventStart = moment(ENEvent.english_beginning);
    /** End time of English event */
    const ENEventEnd = moment(ENEvent.english_end);
    /** Start time of Japanese event */
    const JPEventStart = moment(JPEvent.beginning, Config.DATETIME_FORMAT_INPUT);
    /** End time of Japanese event */
    const JPEventEnd = moment(JPEvent.end, Config.DATETIME_FORMAT_INPUT);

    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={ApplicationStyles.header}>
          <SquareButton name={'ios-menu'} onPress={this.openDrawer} color={'white'} />
          <Image source={Images.logo} style={ApplicationStyles.imageHeader} />
          <SquareButton name={'ios-menu'} color={Colors.pink} />
        </View>
        {this.state.version !== null
          && <Touchable useForeground style={styles.update}
            background={TouchableNativeFeedback.Ripple('white', false)}
            onLongPress={() => { }}
            onPress={() => openLink(this.state.version.link)}>
            <Text>{`Download new version ${this.state.version.tag} on Github!`}</Text>
          </Touchable>}

        {/* BODY */}
        <ScrollView showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}>
          {/* ENGLISH BLOCK */}
          <Touchable useForeground style={styles.block}
            background={TouchableNativeFeedback.Ripple('white', false)}
            onLongPress={() => { }}
            onPress={() => this.navigateToEventDetail(ENEvent)}>
            <Text style={styles.text}>
              {`English Event: ${ENEvent.english_status}`}
            </Text>
            <View style={styles.textbox}>
              <Text style={styles.title}>{ENEvent.english_name}</Text>
            </View>
            <FastImage source={{ uri: 'https://i.schoolido.lu/events/EN/Round%207%20COMPANION%20MATCH87J5zL3BNgnZb20A.png' }}
              // <FastImage source={{ uri: AddHTTPS(ENEvent.english_image) }}
              onLoad={this.onLoadFastImage}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth,
              }} />
            <View style={styles.textbox}>
              <Text style={styles.text}>
                {`Start: ${ENEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${ENEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
              </Text>
            </View>
            {ENEvent.world_current
              && <View style={styles.textbox}>
                <Text style={styles.text}>
                  {this.timer(ENEventEnd.diff(moment()))}{' left'}
                </Text>
              </View>}
            {ENEvent.english_status === EventStatus.ANNOUNCED
              && <View style={styles.textbox}>
                <Text style={styles.text}>
                  {'Starts in '}{this.timer(ENEventStart.diff(moment()))}
                </Text>
              </View>}
          </Touchable>
          <Seperator style={styles.bgWhite} />
          {/* JAPANESE BLOCK */}
          <Touchable useForeground style={styles.block}
            background={TouchableNativeFeedback.Ripple('white', false)}
            onLongPress={() => { }}
            onPress={() => this.navigateToEventDetail(JPEvent)}>
            <Text style={styles.text}>
              {`Japanese Event: ${JPEvent.japan_status}`}
            </Text>
            <View style={styles.textbox}>
              <Text style={styles.title}>{JPEvent.romaji_name}</Text>
            </View>
            <FastImage source={{ uri: AddHTTPS(JPEvent.image) }}
              onLoad={this.onLoadFastImage}
              style={{
                width: Metrics.widthBanner,
                height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth,
              }} />
            <View style={styles.textbox}>
              <Text style={styles.text}>
                {`Start: ${JPEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
              </Text>
            </View>
            {JPEvent.japan_current
              && <View style={styles.textbox}>
                <Text style={styles.text}>
                  {this.timer(JPEventEnd.diff(moment()))}{' left'}
                </Text>
              </View>}
            {JPEvent.japan_status === EventStatus.ANNOUNCED
              && <View style={styles.textbox}>
                <Text style={styles.text}>
                  {'Starts in '}{this.timer(JPEventStart.diff(moment()))}
                </Text>
              </View>}
          </Touchable>
          {/* <Seperator style={{ backgroundColor: 'white' }} /> */}

          {/* CONTEST BLOCK */}
          {/* {currentContests.map((item, id) => (
            <View key={'contest' + id}>
              <Text style={styles.text}>{item.name}</Text>
              <FastImage source={{ uri: AddHTTPS(item.image)) }}
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
    );
  }
}
