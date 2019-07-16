import React from 'react';
import {
  Text, View, ScrollView,
  TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import Seperator from '~/Components/Seperator/Seperator';
import TimerCountdown from '~/Components/TimerCountdown/Timer';
import { AddHTTPS, findAttribute } from '~/Utils';
import { Config, EventStatus } from '~/Config';
import { Metrics, ApplicationStyles, Fonts } from '~/Theme';
import styles from './styles';

export default class Information extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      imgWidth: 1,
      imgHeight: 0,
      WWEventStart: this.props.WWEventStart,
      WWEventEnd: this.props.WWEventEnd,
      JPEventStart: this.props.JPEventStart,
      JPEventEnd: this.props.JPEventEnd,
      cards: this.props.cards,
      songs: this.props.songs,
    };
  }

  static propTypes = {
    item: PropTypes.object,
    WWEventStart: PropTypes.object,
    WWEventEnd: PropTypes.object,
    JPEventStart: PropTypes.object,
    JPEventEnd: PropTypes.object,
    cards: PropTypes.any,
    songs: PropTypes.any,
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
   * Navigate to destination screen
   *
   * @param {String} destination destination screen
   * @param {Object} item Card object
   * @memberof EventDetailScreen
   */
  navigateTo = (destination, item) => () => this.props.navigation.navigate(destination, { item });

  /**
   * Countdown timer for ongoing event
   *
   * @param {Number} time Remaining time (miliseconds)
   * @returns
   * @memberof Information
   */
  timer(time) {
    return <TimerCountdown initialSecondsRemaining={time}
      allowFontScaling={true} />;
  }

  render() {
    const styleFastImage = {
      alignSelf: 'center',
      width: Metrics.widthBanner,
      height: Metrics.widthBanner * this.state.imgHeight / this.state.imgWidth,
    };
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}
          style={ApplicationStyles.screen}
          contentContainerStyle={styles.content}>
          {/* ENGLISH BLOCK */}
          {this.state.item.english_name !== null
            && <View>
              <Text style={styles.whiteCenter}>English</Text>
              <Text style={[styles.text, styles.title, styles.whiteCenter]}>
                {this.state.item.english_name.length === 0
                  ? this.state.item.romaji_name : this.state.item.english_name}
              </Text>
              <FastImage source={{ uri: AddHTTPS(this.state.item.english_image) }}
                resizeMode={FastImage.resizeMode.contain}
                onLoad={e => this.onLoadFastImage(e)}
                style={styleFastImage} />
              <Text style={[styles.text, styles.whiteCenter]}>
                {`Start: ${this.state.WWEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${this.state.WWEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
              </Text>
              {this.state.item.world_current
                && <Text style={[styles.text, styles.whiteCenter]}>
                  {this.timer(this.state.WWEventEnd.diff(moment()))}{' left'}
                </Text>}
              {this.state.item.english_status === EventStatus.ANNOUNCED
                && <Text style={[styles.text, styles.whiteCenter]}>
                  {'Starts in '}{this.timer(this.state.WWEventStart.diff(moment()))}
                </Text>}
            </View>}
          {this.state.item.english_name !== null
            && <Seperator style={styles.whiteLine} />}

          {/* JAPANESE BLOCK */}
          <Text style={styles.whiteCenter}>Japanese</Text>
          <Text style={[styles.text, styles.title, styles.whiteCenter]}>
            {this.state.item.romaji_name}
          </Text>
          <FastImage source={{ uri: AddHTTPS(this.state.item.image) }}
            resizeMode={FastImage.resizeMode.contain}
            onLoad={e => this.onLoadFastImage(e)}
            style={styleFastImage} />
          <Text style={[styles.text, styles.whiteCenter]}>
            {`Start: ${this.state.JPEventStart.format(Config.DATETIME_FORMAT_OUTPUT)}\nEnd: ${this.state.JPEventEnd.format(Config.DATETIME_FORMAT_OUTPUT)}`}
          </Text>
          {this.state.item.japan_current
            && <Text style={[styles.text, styles.whiteCenter]}>
              {this.timer(this.state.JPEventEnd.diff(moment()))}{' left'}
            </Text>}
          {this.state.item.japan_status === EventStatus.ANNOUNCED
            && <Text style={[styles.text, styles.whiteCenter]}>
              {'Starts in '}{this.timer(this.state.JPEventStart.diff(moment()))}
            </Text>}
          {this.state.songs.length !== 0
            && <Seperator style={styles.whiteLine} />}
          {/* SONGS */}
          {this.state.songs.length !== 0
            && <View>
              <Text style={styles.whiteCenter}>Song</Text>
              <View style={styles.cardList}>
                {this.state.songs.map((item, index) => <TouchableOpacity key={`song${index}`}
                  onPress={this.navigateTo('SongDetailScreen', item)}
                  style={styles.card}>
                  <FastImage source={{ uri: AddHTTPS(item.image) }} style={styles.song} />
                  <View style={styles.songInfo}>
                    <Image source={findAttribute(item.attribute)} style={styles.attributeIcon} />
                    <Text style={styles.whiteCenter}>{item.name}</Text>
                    {item.romaji_name !== null
                      && <Text style={styles.whiteCenter}>{item.romaji_name}</Text>}
                  </View>
                </TouchableOpacity>)}
              </View>
            </View>}
          <Seperator style={styles.whiteLine} />
          <Text style={styles.whiteCenter}>Rewards</Text>
          {/* CARDS */}
          <View style={styles.cardList}>
            {this.state.cards.map((item, index) => <TouchableOpacity key={`card${index}`}
              onPress={this.navigateTo('CardDetailScreen', item)}
              style={styles.card}>
              <View style={styles.cardImage}>
                <FastImage source={{ uri: AddHTTPS(item.round_card_image) }}
                  style={styles.roundImage} />
                <View style={styles.width5} />
                <FastImage source={{ uri: AddHTTPS(item.round_card_idolized_image) }}
                  style={styles.roundImage} />
              </View>
              <Text style={Fonts.style.white}>{item.idol.name}</Text>
              {item.other_event !== null
                && <Text style={Fonts.style.white}>{'(English only)'}</Text>}
            </TouchableOpacity>)}
          </View>
        </ScrollView>
      </View>
    );
  }
}
