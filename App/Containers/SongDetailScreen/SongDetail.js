import React from 'react';
import {
  Text, View, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import { getSongMaxStat } from '../../redux/Stores/CachedData/Selectors';
import Fade from '../../Components/Fade/Fade';
import StarBar from '../../Components/StarBar/StarBar';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import SquareButton from '../../Components/SquareButton/SquareButton';
import TextRow from '../../Components/TextRow/TextRow';
import SplashScreen from '../SplashScreen/SplashScreen';
import { findColorByAttribute, AddHTTPS, findMainUnit } from '../../Utils';
import { Metrics, ApplicationStyles, Colors } from '../../Theme';
import styles from './styles';

/**
 * Song Detail Screen
 *
 * From parent screen, pass `item` (Song object) to show detail
 *
 * State:
 * - `item`: [Song object](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#objects)
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `colors`: Color array
 * - `currentStats`: To show stats when choosing Mode
 * - `buttonID`: ID for choosing Mode button
 * - `easy`: [note number, stars]
 * - `normal`: [note number, stars]
 * - `hard`: [note number, stars]
 * - `expert`: [note number, stars]
 * - `random`: [note number, stars]
 * - `master`: [note number, stars]
 * - `isLoading`: Loading state
 *
 * @class SongDetailScreen
 * @extends {React.PureComponent}
 */
class SongDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam('item'),
      name: '',
      imgWidth: 0,
      imgHeight: 0,
      colors: [],
      currentStats: [],
      buttonID: 0,
      easy: [],
      normal: [],
      hard: [],
      expert: [],
      random: [],
      master: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    const easyArray = [];
    for (i = 0; i < this.state.item.easy_difficulty; i++) {
      easyArray.push(this.setColor(i));
    }
    const normalArray = [];
    for (i = 0; i < this.state.item.normal_difficulty; i++) {
      normalArray.push(this.setColor(i));
    }
    const hardArray = [];
    for (i = 0; i < this.state.item.hard_difficulty; i++) {
      hardArray.push(this.setColor(i));
    }
    const expertArray = [];
    for (i = 0; i < this.state.item.expert_difficulty; i++) {
      expertArray.push(this.setColor(i));
    }
    const expertRandomArray = [];
    if (this.state.item.expert_random_difficulty) {
      for (i = 0; i < this.state.item.expert_random_difficulty; i++) {
        expertRandomArray.push(this.setColor(i));
      }
    }
    masterArray = [];
    if (this.state.item.master_difficulty) {
      for (i = 0; i < this.state.item.master_difficulty; i++) {
        masterArray.push(this.setColor(i));
      }
    }
    this.setState({
      isLoading: false,
      name: this.state.item.name + (this.state.item.romaji_name !== null ? `\n${this.state.item.romaji_name}` : ''),
      currentStats: [this.state.item.easy_notes, easyArray],
      easy: [this.state.item.easy_notes, easyArray],
      normal: [this.state.item.normal_notes, normalArray],
      hard: [this.state.item.hard_notes, hardArray],
      expert: [this.state.item.expert_notes, expertArray],
      random: [this.state.item.expert_notes, expertRandomArray],
      master: [this.state.item.master_notes, masterArray],
      colors: findColorByAttribute(this.state.item.attribute),
    });
  }

  /**
   * Get width, height of image in FastImage
   *
   * @param {*} e
   * @memberof SongDetailScreen
   */
  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent;
    this.setState({ imgWidth: width, imgHeight: height });
  }

  /**
   * Set color for star
   *
   * @param {Number} index
   * @returns
   * @memberof SongDetailScreen
   */
  setColor(index) {
    if (index < 3) return 0;
    if (index < 6) return 1;
    if (index < 9) return 2;
    return 3;
  }

  /**
   * Convert seconds to m:ss
   *
   * @param {Number} time
   * @memberof SongDetailScreen
   */
  formatTime(time) {
    const minutes = parseInt(((time / 60) % 60).toString(), 10);
    let seconds = time % 60;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${minutes}:${seconds}`;
  }

  /**
   * Navigate to Event Detail Screen
   *
   * @param {Object} event
   * @memberof SongDetailScreen
   */
  navigateToEventDetail(event) {
    this.props.navigation.navigate('EventDetailScreen', { event });
  }

  /**
   * Render choosing stat button
   *
   * @param {Number} id
   * @param {String} text
   * @param {Array} stat
   * @param {Object} style
   * @memberof SongDetailScreen
   */
  statButton(id, text, stat, style) {
    return (
      <TouchableOpacity onPress={() => this.setState({ currentStats: stat, buttonID: id })}
        style={[
          styles.button, style,
          { backgroundColor: this.state.buttonID === id ? Colors.violet : Colors.inactive },
        ]}>
        <Text style={{ color: 'white' }}>{text}</Text>
      </TouchableOpacity>
    );
  }

  progressStat(stat) {
    return 100 * stat / this.props.songMaxStat;
  }

  render() {
    return (
      <View style={ApplicationStyles.screen}>
        {/* HEADER */}
        <ElevatedView elevation={5} style={[
          ApplicationStyles.header,
          { backgroundColor: this.state.colors[1] },
        ]}>
          <View style={styles.leftRow}>
            <SquareButton name={'ios-arrow-back'}
              onPress={() => this.props.navigation.goBack()} />
            <Text>{this.state.name}</Text>
          </View>
          <Image source={findMainUnit(this.state.item.main_unit)}
            style={styles.rightHeaderImage} />
        </ElevatedView>
        <View style={ApplicationStyles.screen}>
          <Fade visible={this.state.isLoading} style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
            <SplashScreen />
          </Fade>
          <Fade visible={!this.state.isLoading} style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
            {!this.state.isLoading && <View style={ApplicationStyles.screen}>
              {/* BODY */}
              <LinearGradient colors={[this.state.colors[1], this.state.colors[1]]}
                style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollViewContainer}
                  style={ApplicationStyles.screen}>
                  <FastImage source={{ uri: AddHTTPS(this.state.item.image) }}
                    onLoad={e => this.onLoadFastImage(e)}
                    style={{
                      width: Metrics.screenWidth / 2,
                      height: (Metrics.screenWidth / 2) * this.state.imgHeight / this.state.imgWidth,
                    }} />
                  <View style={{ height: 10 }} />

                  <TextRow item1={{ text: 'Attribute', flex: 1 }}
                    item2={{ text: this.state.item.attribute, flex: 1 }} />
                  {this.state.item.rank
                    && <View style={styles.event}>
                      <TextRow item1={{ text: 'Unlock', flex: 1 }}
                        item2={{ text: this.state.item.rank, flex: 1 }} />
                    </View>}
                  <TextRow item1={{ text: 'Beats per minute', flex: 1 }}
                    item2={{ text: this.state.item.BPM, flex: 1 }} />
                  <TextRow item1={{ text: 'Length', flex: 1 }}
                    item2={{ text: this.formatTime(this.state.item.time), flex: 1 }} />
                  {this.state.item.event
                    && <View style={styles.event}>
                      <TextRow item1={{ text: 'Event', flex: 1 }}
                        item2={{ text: this.state.item.event.japanese_name, flex: 1 }} />
                      <TextRow item1={{ text: '', flex: 1 }}
                        item2={{ text: this.state.item.event.english_name, flex: 1 }} />
                      <TouchableOpacity onPress={() => this.navigateToEventDetail(this.state.item.event)}
                        style={styles.eventButton}>
                        <FastImage source={{ uri: AddHTTPS(this.state.item.event.image) }}
                          resizeMode={FastImage.resizeMode.contain}
                          style={styles.eventImage} />
                      </TouchableOpacity>
                    </View>}
                  {(this.state.item.daily_rotation !== null && this.state.item.daily_rotation.length !== 0)
                    && <View style={styles.event}>
                      <TextRow item1={{ text: 'Daily rotation', flex: 1 }}
                        item2={{ text: `${this.state.item.daily_rotation} - ${this.state.item.daily_rotation_position}`, flex: 1 }} />
                    </View>}
                  <TextRow item1={{ text: 'Currently available', flex: 1 }}
                    item2={{ text: this.state.item.available ? 'Yes' : 'No', flex: 1 }} />
                  <View style={styles.buttonRow}>
                    {this.statButton(0, 'Easy', this.state.easy, styles.leftRadius)}
                    {this.statButton(1, 'Normal', this.state.normal)}
                    {this.statButton(2, 'Hard', this.state.hard)}
                    {this.statButton(3, 'Expert', this.state.expert,
                      (this.state.random[1].length === 0 && !this.state.master[0]) && styles.rightRadius)}
                    {this.state.random[1].length !== 0
                      && this.statButton(4, 'Random', this.state.random,
                        !this.state.master[0] && styles.rightRadius)}
                    {this.state.master[0]
                      && this.statButton(5, 'Master', this.state.master, styles.rightRadius)}
                  </View>
                  <ProgressBar number={this.state.currentStats[0]}
                    progress={this.progressStat(this.state.currentStats[0])}
                    fillStyle={{ backgroundColor: this.state.colors[0] }} />
                  <StarBar array={this.state.currentStats[1]} />
                </ScrollView>
              </LinearGradient>
            </View>}
          </Fade>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  songMaxStat: getSongMaxStat(state),
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SongDetailScreen);
