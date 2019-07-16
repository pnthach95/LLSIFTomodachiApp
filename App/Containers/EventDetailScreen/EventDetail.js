import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import moment from 'moment';

import Information from './Information';
import Tracker from './Tracker';
import Fade from '~/Components/Fade/Fade';
import SquareButton from '~/Components/SquareButton/SquareButton';
import SplashScreen from '../SplashScreen/SplashScreen';
import LLSIFService from '~/Services/LLSIFService';
import { LLSIFdotnetService } from '~/Services/LLSIFdotnetService';
import { Config } from '~/Config';
import { ApplicationStyles, Colors } from '~/Theme';
import { ReplaceQuestionMark } from '~/Utils';
import styles from './styles';

/**
 * Event Detail Screen
 *
 * From parent screen, pass `item` (event object)
 *  or `eventName` (Japanese only) to show event detail
 *
 * State:
 * - `isLoading`: Loading state
 * - `item`: Event object
 * - `WWEventStart`: Time when WW event start
 * - `WWEventEnd`: Time when WW event end
 * - `JPEventStart`: Time when JP event start
 * - `JPEventEnd`: Time when JP event end
 * - `wwTracker`: WW event tracking data
 * - `jpTracker`: JP event tracking data
 * - `selectedTab`: select Information or Tracker tab
 * - `cards`: Card list
 * - `songs`: Song list
 *
 * Event object: https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#objects
 *
 * @class EventDetailScreen
 * @extends {React.PureComponent}
 */
export default class EventDetailScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      item: this.props.navigation.getParam('event'),
      WWEventStart: null,
      WWEventEnd: null,
      JPEventStart: null,
      JPEventEnd: null,
      wwTracker: null,
      jpTracker: null,
      selectedTab: 0,
      cards: [],
      songs: [],
    };
  }

  static propTypes = {
    wwEventInfo: PropTypes.any,
    jpEventInfo: PropTypes.any,
  }

  componentDidMount() {
    if (this.state.item) {
      this.loadData();
    } else {
      const name = ReplaceQuestionMark(this.props.navigation.getParam('eventName'));
      LLSIFService.fetchEventData(name).then((res) => {
        this.setState({ item: res }, () => this.loadData());
      });
    }
  }

  parseEventTracker(data) {
    const result = [];
    const rows = data.split('\n');
    rows.forEach((row) => {
      if (row.indexOf('#') !== 0 && row.length > 0) {
        const rowArr = row.split(',');
        rowArr.splice(1, 1);
        rowArr.splice(7, 6);
        result.push(rowArr);
      }
    });
    return result;
  }

  /**
   * Load card list, song list in event
   *
   * @memberof EventDetailScreen
   */
  loadData() {
    const WWEventStart = moment(this.state.item.english_beginning);
    const JPEventStart = moment(this.state.item.beginning, Config.DATETIME_FORMAT_INPUT);
    const wwEvent = this.props.wwEventInfo
      .filter(value => value.start_date === WWEventStart.unix());
    const jpEvent = this.props.jpEventInfo
      .filter(value => value.start_date === JPEventStart.unix());
    if (wwEvent.length > 0) {
      LLSIFdotnetService.fetchEventData({ svr: 'EN', eid: wwEvent[0].event_id, cname: 'en' })
        .then((res) => {
          const data = this.parseEventTracker(res);
          this.setState({ wwTracker: data });
        });
    }
    if (jpEvent.length > 0) {
      LLSIFdotnetService.fetchEventData({ svr: 'JP', eid: jpEvent[0].event_id, cname: 'jp' })
        .then((res) => {
          const data = this.parseEventTracker(res);
          this.setState({ jpTracker: data });
        });
    }
    LLSIFService.fetchCardList({ event_japanese_name: this.state.item.japanese_name })
      .then((resCard) => {
        LLSIFService.fetchSongList({ event: this.state.item.japanese_name })
          .then((resSong) => {
            this.setState({
              WWEventStart,
              WWEventEnd: moment(this.state.item.english_end),
              JPEventStart,
              JPEventEnd: moment(this.state.item.end, Config.DATETIME_FORMAT_INPUT),
              isLoading: false,
              cards: resCard,
              songs: resSong,
            });
            // eslint-disable-next-line no-console
            console.log(`EventDetail ${this.state.item.japanese_name}`);
          });
      });
  }

  onTabPress = (index) => {
    if (!this.state.isLoading) this.setState({ selectedTab: index });
  }

  render() {
    return (
      <View style={styles.container}>
        <ElevatedView elevation={5} style={[ApplicationStyles.header, styles.header]}>
          <SquareButton name={'ios-arrow-back'} color={'white'}
            onPress={() => this.props.navigation.goBack()} />
          <View style={styles.flex2}>
            <SegmentedControlTab values={['Information', 'Cutoffs']}
              selectedIndex={this.state.selectedTab}
              onTabPress={this.onTabPress} />
          </View>
          <SquareButton name={'ios-arrow-back'} color={Colors.lightViolet} />
        </ElevatedView>
        <View style={ApplicationStyles.screen}>
          <Fade visible={this.state.isLoading}
            style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
            <SplashScreen bgColor={Colors.violet} />
          </Fade>
          <Fade visible={!this.state.isLoading}
            style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
            {!this.state.isLoading
              && <View style={ApplicationStyles.screen}>
                {this.state.selectedTab === 0
                  ? <Information navigation={this.props.navigation}
                    item={this.state.item}
                    cards={this.state.cards}
                    songs={this.state.songs}
                    WWEventStart={this.state.WWEventStart}
                    WWEventEnd={this.state.WWEventEnd}
                    JPEventStart={this.state.JPEventStart}
                    JPEventEnd={this.state.JPEventEnd} />
                  : <Tracker jpTracker={this.state.jpTracker}
                    wwTracker={this.state.wwTracker} />}
              </View>}
          </Fade>
        </View>
      </View>
    );
  }
}
