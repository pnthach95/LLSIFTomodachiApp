import React from 'react';
import {
  Text, View, ScrollView,
  TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

import TextRow from '~/Components/TextRow/TextRow';
import Seperator from '~/Components/Seperator/Seperator';
import ProgressBar from '~/Components/ProgressBar/ProgressBar';
import SquareButton from '~/Components/SquareButton/SquareButton';
import {
  findColorByAttribute, AddHTTPS, findMainUnit, findSubUnit,
} from '~/Utils';
import {
  Metrics, Fonts, ApplicationStyles,
  Colors, Images,
} from '~/Theme';
import { Config } from '~/Config';
import styles from './styles';

/**
 * Card detail screen
 *
 * State:
 * - `item`: Card object
 * - `imgWidth`: Image width
 * - `imgHeight`: Image height
 * - `colors`: Colors for background
 * - `maxStats`: Maximum stats
 * - `minStats`: Minimal stats
 * - `nonIdolMaxStats`: Non-idolized maximum stats
 * - `idolMaxStats`: Idolized maximum stats
 * - `currentStats`: To show stats when choosing Level
 * - `buttonID`: ID for choosing Level button
 *
 * @class CardDetailScreen
 * @extends {React.Component}
 */
export default class CardDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.getParam('item'),
      imgWidth: 0,
      imgHeight: 0,
      propertyLine: '',
      images: [],
      colors: findColorByAttribute(this.props.navigation.getParam('item').attribute),
      maxStats: [
        this.props.maxStats.Smile,
        this.props.maxStats.Pure,
        this.props.maxStats.Cool,
      ],
      minStats: [],
      nonIdolMaxStats: [],
      idolMaxStats: [],
      currentStats: [],
      buttonID: 0,
    };
  }

  static propTypes = {
    maxStats: PropTypes.any,
  }

  componentDidMount() {
    const images = [];
    if (this.state.item.card_image !== null) {
      images.push({ url: AddHTTPS(this.state.item.card_image) });
    }
    images.push({ url: AddHTTPS(this.state.item.card_idolized_image) });
    const tmp = [];
    let propertyLine = '';
    if (this.state.item.is_promo) tmp.push('Promo card');
    if (this.state.item.japan_only) tmp.push('Japan only');
    propertyLine = tmp.join(' - ');

    this.setState({
      images,
      propertyLine,
      minStats: [
        this.state.item.minimum_statistics_smile,
        this.state.item.minimum_statistics_pure,
        this.state.item.minimum_statistics_cool,
      ],
      nonIdolMaxStats: [
        this.state.item.non_idolized_maximum_statistics_smile,
        this.state.item.non_idolized_maximum_statistics_pure,
        this.state.item.non_idolized_maximum_statistics_cool,
      ],
      idolMaxStats: [
        this.state.item.idolized_maximum_statistics_smile,
        this.state.item.idolized_maximum_statistics_pure,
        this.state.item.idolized_maximum_statistics_cool,
      ],
      currentStats: [
        this.state.item.minimum_statistics_smile,
        this.state.item.minimum_statistics_pure,
        this.state.item.minimum_statistics_cool,
      ],
    });
  }

  progressSmile(stat) {
    return 100 * stat / this.state.maxStats[0];
  }

  progressPure(stat) {
    return 100 * stat / this.state.maxStats[1];
  }

  progressCool(stat) {
    return 100 * stat / this.state.maxStats[2];
  }

  selectIcon = (text) => {
    switch (text) {
      case 'Smile':
        return 0;
      case 'Pure':
        return 1;
      default:
        return 2;
    }
  };

  progressUnit(text, stat, color) {
    const icon = this.selectIcon(text);
    return (
      <View style={{ width: Metrics.screenWidth }}>
        <Text style={[Fonts.style.normal, styles.progressText]}>{text}</Text>
        <View style={styles.progressRow}>
          <Image source={Images.attribute[icon(text)]}
            style={[ApplicationStyles.mediumIcon, styles.marginRight10]} />
          <ProgressBar
            number={stat}
            progress={this.progressSmile(stat)}
            fillStyle={{ backgroundColor: color }} />
        </View>
      </View>
    );
  }

  progressView(stats) {
    return <View>
      {this.progressUnit('Smile', stats[0], Colors.pink)}
      {this.progressUnit('Pure', stats[1], Colors.green)}
      {this.progressUnit('Cool', stats[2], Colors.blue)}
    </View>;
  }

  saveStat = (stats, id) => () => this.setState({ currentStats: stats, buttonID: id });

  statButton(id, text, stats, style) {
    const white = { color: 'white' };
    return (
      <TouchableOpacity onPress={this.saveStat(stats, id)}
        style={[
          styles.button, style,
          { backgroundColor: this.state.buttonID === id ? Colors.violet : Colors.inactive },
        ]}>
        <Text style={[Fonts.style.normal, white]}>{text}</Text>
      </TouchableOpacity>
    );
  }

  onLoadFastImage(e) {
    const { width, height } = e.nativeEvent;
    this.setState({ imgWidth: width, imgHeight: height });
  }

  /**
   * Navigate to Event Detail Screen
   *
   * @param {String} name Event name
   * @memberof CardDetailScreen
   */
  navigateToEventDetail = name => () => this.props.navigation.navigate('EventDetailScreen', { eventName: name });

  /**
   * Navigate to Idol Detail Screen
   *
   * @param {String} name Idol name
   * @memberof CardDetailScreen
   */
  navigateToIdolDetail = name => () => this.props.navigation.navigate('IdolDetailScreen', { name });

  navigateToImageViewerScreen = index => () => this.props.navigation.navigate('ImageViewerScreen', { index, images: this.state.images });

  render() {
    const { item } = this.state;
    return (
      <View style={ApplicationStyles.screen}>
        {/* HEADER */}
        <ElevatedView elevation={5} style={[
          ApplicationStyles.header,
          { backgroundColor: this.state.colors[1] },
        ]}>
          <View style={styles.leftRow}>
            <SquareButton name={'ios-arrow-back'} onPress={() => this.props.navigation.goBack()} />
            <TouchableOpacity onPress={this.navigateToIdolDetail(item.idol.name)}>
              <Text style={Fonts.style.normal}>{item.idol.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rightRow}>
            <Image source={findMainUnit(item.idol.main_unit)}
              style={styles.rightHeaderImage} />
            <Image source={findSubUnit(item.idol.sub_unit)}
              style={styles.rightHeaderImage} />
          </View>
        </ElevatedView>
        <View style={ApplicationStyles.screen}>
          {/* MAIN VIEW */}
          <LinearGradient style={ApplicationStyles.screen}
            colors={[this.state.colors[1], this.state.colors[0]]}>
            <ScrollView showsVerticalScrollIndicator={false}
              style={styles.scrollView}>
              {/* CARD IMAGES */}
              <View style={styles.imageRow}>
                {this.state.images.map((value, index) => <TouchableOpacity key={index}
                  onPress={this.navigateToImageViewerScreen(index)}>
                  <FastImage source={{ uri: value.url }}
                    style={{
                      width: Metrics.images.itemWidth,
                      height: Metrics.images.itemWidth * this.state.imgHeight / this.state.imgWidth,
                    }}
                    onLoad={e => this.onLoadFastImage(e)} />
                </TouchableOpacity>)}
              </View>

              {/* INFORMATION */}
              <View style={styles.informationBlock}>
                <TextRow item1={{ flex: 1, text: 'Card ID' }}
                  item2={{ flex: 2, text: item.game_id }} />
                <TextRow item1={{ flex: 1, text: 'Release date' }}
                  item2={{
                    flex: 2,
                    text: moment(item.release_date).format(Config.DATE_FORMAT_OUTPUT),
                  }} />
                {this.state.propertyLine.length > 0 && <Text>{this.state.propertyLine}</Text>}

                {(item.skill !== null && item.skill.length !== 0)
                  && <View>
                    <Seperator />
                    <TextRow item1={{ flex: 1, text: 'Skill' }}
                      item2={{ flex: 2, text: item.skill }} />
                    <TextRow item1={{ flex: 1, text: '' }}
                      item2={{
                        flex: 2,
                        text: item.skill_details,
                        textStyle: styles.subtitleText,
                      }} />
                  </View>}

                {(item.center_skill !== null
                  && item.center_skill.length !== 0)
                  && <View>
                    <Seperator />
                    <TextRow item1={{ flex: 1, text: 'Center skill' }}
                      item2={{ flex: 2, text: item.center_skill }} />
                    <TextRow item1={{ flex: 1, text: '' }}
                      item2={{
                        flex: 2,
                        text: item.center_skill_details,
                        textStyle: styles.subtitleText,
                      }} />
                  </View>}

                {item.event !== null
                  && <View>
                    <Seperator />
                    <TextRow item1={{ text: 'Event', flex: 1, textStyle: Fonts.style.normal }}
                      item2={{
                        text: item.event.japanese_name,
                        flex: 4,
                        textStyle: Fonts.style.normal,
                      }} />
                    {item.event.english_name !== null
                      && <TextRow item1={{ text: '', flex: 1, textStyle: Fonts.style.normal }}
                        item2={{
                          text: item.event.english_name,
                          flex: 4,
                          textStyle: Fonts.style.normal,
                        }} />}
                    <TouchableOpacity style={ApplicationStyles.center}
                      onPress={this.navigateToEventDetail(item.event.japanese_name)}>
                      <FastImage source={{ uri: AddHTTPS(item.event.image) }}
                        style={styles.banner}
                        resizeMode={FastImage.resizeMode.contain} />
                    </TouchableOpacity>
                    {item.other_event !== null
                      && <View>
                        <TextRow item1={{ text: '', flex: 1, textStyle: Fonts.style.normal }}
                          item2={{
                            text: item.other_event.english_name,
                            flex: 4,
                            textStyle: Fonts.style.normal,
                          }} />
                        <TouchableOpacity style={ApplicationStyles.center}
                          onPress={this.navigateToEventDetail(item.other_event.japanese_name)}>
                          <FastImage source={{ uri: AddHTTPS(item.other_event.image) }}
                            style={styles.banner}
                            resizeMode={FastImage.resizeMode.contain} />
                        </TouchableOpacity>
                      </View>}
                  </View>}

                {item.hp !== 0
                  && <View>
                    <Seperator />
                    <View style={ApplicationStyles.row}>
                      <Icon name='ios-heart' size={Metrics.icons.medium} color={'red'} />
                      <Text style={Fonts.style.normal}> : {item.hp}</Text>
                    </View>
                  </View>}
              </View>

              {/* STATS */}
              {item.hp !== 0
                && <View>
                  <View style={styles.buttonRow}>
                    {this.statButton(0, 'Level 1', this.state.minStats, styles.leftRadius)}
                    {item.non_idolized_maximum_statistics_smile !== 0
                      && this.statButton(1, `Level ${item.non_idolized_max_level}`, this.state.nonIdolMaxStats)}
                    {item.idolized_max_level !== 0
                      && this.statButton(2, `Level ${item.idolized_max_level}`, this.state.idolMaxStats, styles.rightRadius)}
                  </View>
                  {this.progressView(this.state.currentStats)}
                </View>}
              <View style={{ height: Metrics.doubleBaseMargin }} />
            </ScrollView>
          </LinearGradient>
        </View>
      </View>
    );
  }
}
