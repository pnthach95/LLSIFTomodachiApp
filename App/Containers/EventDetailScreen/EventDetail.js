import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import moment from 'moment';

import Information from './Information';
import Tracker from './Tracker';
import UserContext from '~/Context/UserContext';
import SquareButton from '~/Components/SquareButton/SquareButton';
import SplashScreen from '../SplashScreen/SplashScreen';
import LLSIFService from '~/Services/LLSIFService';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
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
 */
function EventDetailScreen({ navigation, route }) {
  const { state } = useContext(UserContext);
  const wwEventInfo = state.cachedData.eventInfo.ww;
  const jpEventInfo = state.cachedData.eventInfo.jp;
  const [item, setItem] = useState(route.params.event);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [cards, setCards] = useState([]);
  const [songs, setSongs] = useState([]);
  const [WWEventStart, setWWEventStart] = useState(moment());
  const [WWEventEnd, setWWEventEnd] = useState(moment());
  const [JPEventStart, setJPEventStart] = useState(moment());
  const [JPEventEnd, setJPEventEnd] = useState(moment());
  let wwTracker = null;
  let jpTracker = null;

  useEffect(() => {
    if (route.params.eventName) {
      const name = ReplaceQuestionMark(route.params.eventName);
      LLSIFService.fetchEventData(name).then((res) => {
        setItem(res);
      });
    }
  }, [route.params.eventName]);

  useEffect(() => {
    if (item) {
      loadData();
    }
  }, [item]);

  function parseEventTracker(data) {
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
   */
  function loadData() {
    setWWEventStart(moment(item.english_beginning));
    setWWEventEnd(moment(item.english_end));
    setJPEventStart(moment(item.beginning, Config.DATETIME_FORMAT_INPUT));
    setJPEventEnd(moment(item.end, Config.DATETIME_FORMAT_INPUT));
    const wwEvent = wwEventInfo.filter((value) => value.start_date === WWEventStart.unix());
    const jpEvent = jpEventInfo.filter((value) => value.start_date === JPEventStart.unix());
    if (wwEvent.length > 0) {
      LLSIFdotnetService.fetchEventData({ svr: 'EN', eid: wwEvent[0].event_id, cname: 'en' })
        .then((res) => {
          const data = parseEventTracker(res);
          wwTracker = data;
        });
    }
    if (jpEvent.length > 0) {
      LLSIFdotnetService.fetchEventData({ svr: 'JP', eid: jpEvent[0].event_id, cname: 'jp' })
        .then((res) => {
          const data = parseEventTracker(res);
          jpTracker = data;
        });
    }
    LLSIFService.fetchCardList({ event_japanese_name: item.japanese_name })
      .then((resCard) => {
        LLSIFService.fetchSongList({ event: item.japanese_name })
          .then((resSong) => {
            setCards(resCard);
            setSongs(resSong);
            // eslint-disable-next-line no-console
            console.log(`EventDetail ${item.japanese_name}`);
          });
      });
    setIsLoading(false);
  }

  const onTabPress = (index) => {
    if (!isLoading) setSelectedTab(index);
  };

  return <View style={styles.container}>
    <ElevatedView elevation={5} style={[ApplicationStyles.header, styles.header]}>
      <SquareButton name={'ios-arrow-back'} color={'white'}
        onPress={() => navigation.goBack()} />
      <View style={styles.flex2}>
        <SegmentedControlTab values={['Information', 'Tier cutoff']}
          selectedIndex={selectedTab}
          onTabPress={onTabPress} />
      </View>
      <SquareButton name={'ios-arrow-back'} color={Colors.lightViolet} />
    </ElevatedView>
    {isLoading ? <SplashScreen bgColor={Colors.violet} />
      : <View style={ApplicationStyles.screen}>
        <View style={ApplicationStyles.screen}>
          {selectedTab === 0
            ? <Information item={item}
              cards={cards}
              songs={songs}
              WWEventStart={WWEventStart}
              WWEventEnd={WWEventEnd}
              JPEventStart={JPEventStart}
              JPEventEnd={JPEventEnd} />
            : <Tracker jpTracker={jpTracker}
              wwTracker={wwTracker} />}
        </View>
      </View>}
  </View>;
}

EventDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      event: PropTypes.object,
      eventName: PropTypes.string,
    }),
  }),
};

export default EventDetailScreen;
