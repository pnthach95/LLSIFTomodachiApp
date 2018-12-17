import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import Fade from '../../Components/Fade/Fade';
import Seperator from '../../Components/Seperator/Seperator';
import TimerCountdown from '../../Components/TimerCountdown/Timer';
import SquareButton from '../../Components/SquareButton/SquareButton';
import SplashScreen from '../SplashScreen/SplashScreen';
import { LLSIFService } from '../../Services/LLSIFService';
import { AddHTTPS, findAttribute } from '../../Utils';
import { Config, EventStatus } from '../../Config';
import { Metrics, ApplicationStyles, Colors } from '../../Theme';
import styles from './styles';

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
    super(props);
    this.state = {
      isLoading: true,
      item: this.props.navigation.getParam('event'),
      imgWidth: 0,
      imgHeight: 0,
      ENEventStart: null,
      ENEventEnd: null,
      JPEventStart: null,
      JPEventEnd: null,
      cards: [],
      songs: []
    };
  }

  componentDidMount() {
    if (this.state.item) {
      this.loadData();
    } else {
      let name = this.props.navigation.getParam('eventName');
      LLSIFService.fetchEventData(name).then(res => {
        this.setState({ item: res }, () => this.loadData())
      });
    }
  }

  /**
   * Load card list, song list in event
   *
   * @memberof EventDetailScreen
   */
  loadData() {
    LLSIFService.fetchCardList({ event_japanese_name: this.state.item.japanese_name })
      .then(resCard => {
        LLSIFService.fetchSongList({ event: this.state.item.japanese_name })
          .then(resSong => {
            this.setState({
              ENEventStart: moment(this.state.item.english_beginning),
              ENEventEnd: moment(this.state.item.english_end),
              JPEventStart: moment(this.state.item.beginning, Config.DATETIME_FORMAT_INPUT),
              JPEventEnd: moment(this.state.item.end, Config.DATETIME_FORMAT_INPUT),
              isLoading: false,
              cards: resCard,
              songs: resSong
            });
            console.log(`EventDetail ${this.state.item.japanese_name}`);
          });
      });
  }

  /**
   * Get width, height of image in FastImage
   *
   * @param {*} e
   * @memberof EventDetailScreen
   */
  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent;
    this.setState({ imgWidth: width, imgHeight: height });
  }

  /**
   * Navigate to Card Detail Screen
   *
   * @param {Object} item Card object
   * @memberof EventDetailScreen
   */
  navigateToCardDetail(item) {
    this.props.navigation.navigate('CardDetailScreen', { item: item });
  }

  /**
   * Navigate to Song Detail Screen
   *
   * @param {Object} item Song object
   * @memberof EventDetailScreen
   */
  navigateToSongDetail(item) {
    this.props.navigation.navigate('SongDetailScreen', { item: item });
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
      allowFontScaling={true} />
  }

  render() {
    return (
      <View style={styles.container}>
        <ElevatedView elevation={5} style={[ApplicationStyles.header, styles.header]}>
          <SquareButton name={'ios-arrow-back'} color={'white'}
            onPress={() => this.props.navigation.goBack()} />
        </ElevatedView>
        <View style={ApplicationStyles.screen}>
          <Fade visible={this.state.isLoading} style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
            <SplashScreen bgColor={Colors.violet} />
          </Fade>
          <Fade visible={!this.state.isLoading} style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
            {!this.state.isLoading &&
              <ScrollView showsVerticalScrollIndicator={false}
                style={ApplicationStyles.screen}
                contentContainerStyle={styles.content}>
                {/* ENGLISH BLOCK */}
                {this.state.item.english_name !== null &&
                  <View>
                    <Text style={styles.whiteCenter}>English</Text>
                    <Text style={[styles.text, styles.title, styles.whiteCenter]}>
                      {this.state.item.english_name.length === 0 ?
                        this.state.item.romaji_name : this.state.item.english_name}
                    </Text>
                    <FastImage source={{ uri: AddHTTPS(this.state.item.english_image) }}
                      resizeMode={FastImage.resizeMode.contain}
                      onLoad={e => this.onLoadFastImage(e)}
                      style={{
                        alignSelf: 'center',
                        width: Metrics.widthBanner,
                        height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
                      }} />
                    <Text style={[styles.text, styles.whiteCenter]}>
                      {`Start: ${this.state.ENEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${this.state.ENEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
                    </Text>
                    {this.state.item.world_current &&
                      <Text style={[styles.text, styles.whiteCenter]}>
                        {this.timer(this.state.ENEventEnd.diff(moment()))}{` left`}
                      </Text>}
                    {this.state.item.english_status === EventStatus.ANNOUNCED &&
                      <Text style={[styles.text, styles.whiteCenter]}>
                        {`Starts in `}{this.timer(this.state.ENEventStart.diff(moment()))}
                      </Text>}
                  </View>}
                {this.state.item.english_name !== null &&
                  <Seperator style={styles.whiteLine} />}

                {/* JAPANESE BLOCK */}
                <Text style={styles.whiteCenter}>Japanese</Text>
                <Text style={[styles.text, styles.title, styles.whiteCenter]}>{this.state.item.romaji_name}</Text>
                <FastImage source={{ uri: AddHTTPS(this.state.item.image) }}
                  resizeMode={FastImage.resizeMode.contain}
                  onLoad={e => this.onLoadFastImage(e)}
                  style={{
                    alignSelf: 'center',
                    width: Metrics.widthBanner,
                    height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth
                  }} />
                <Text style={[styles.text, styles.whiteCenter]}>
                  {`Start: ${this.state.JPEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${this.state.JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
                </Text>
                {this.state.item.japan_current &&
                  <Text style={[styles.text, styles.whiteCenter]}>
                    {this.timer(this.state.JPEventEnd.diff(moment()))}{` left`}
                  </Text>}
                {this.state.item.japan_status === EventStatus.ANNOUNCED &&
                  <Text style={[styles.text, styles.whiteCenter]}>
                    {`Starts in `}{this.timer(this.state.JPEventStart.diff(moment()))}
                  </Text>}
                {this.state.songs.length !== 0 &&
                  <Seperator style={styles.whiteLine} />}
                {/* SONGS */}
                {this.state.songs.length !== 0
                  && <View>
                    <Text style={styles.whiteCenter}>Song</Text>
                    <View style={styles.cardList}>
                      {this.state.songs.map((item, index) =>
                        <TouchableOpacity key={'song' + index}
                          onPress={() => this.navigateToSongDetail(item)}
                          style={styles.card}>
                          <FastImage source={{ uri: AddHTTPS(item.image) }} style={styles.song} />
                          <View style={styles.songInfo}>
                            <Image source={findAttribute(item.attribute)} style={styles.attributeIcon} />
                            <Text style={styles.whiteCenter}>{item.name}</Text>
                          </View>
                        </TouchableOpacity>)}
                    </View>
                  </View>}
                <Seperator style={styles.whiteLine} />
                <Text style={styles.whiteCenter}>Rewards</Text>
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
              </ScrollView>}
          </Fade>
        </View>
      </View>)
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(EventDetailScreen);
