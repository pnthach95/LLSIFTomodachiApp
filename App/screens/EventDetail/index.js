import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import dayjs from 'dayjs';

import Information from './Information';
import Tracker from './Tracker';
import UserContext from '~/Context/UserContext';
import useStatusBar from '~/hooks/useStatusBar';
import LoadingScreen from '../Loading';
import LLSIFService from '~/Services/LLSIFService';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import { Config } from '~/Config';
import { AppStyles, Colors } from '~/Theme';
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
  const [WWEventStart, setWWEventStart] = useState(dayjs());
  const [WWEventEnd, setWWEventEnd] = useState(dayjs());
  const [JPEventStart, setJPEventStart] = useState(dayjs());
  const [JPEventEnd, setJPEventEnd] = useState(dayjs());
  let wwTracker = null;
  let jpTracker = null;

  useEffect(() => {
    const customHeader = () => (
      <SegmentedControlTab
        values={['Information', 'Tier cutoff']}
        selectedIndex={selectedTab}
        onTabPress={onTabPress}
      />
    );

    const blankView = () => <View />;

    navigation.setOptions({
      headerStyle: styles.header,
      headerTitle: customHeader,
      headerRight: blankView
    });
  }, []);

  useEffect(() => {
    if (route.params.eventName) {
      getItem();
    }
  }, [route.params.eventName]);

  useEffect(() => {
    if (item) {
      loadData();
    }
  }, [item]);

  async function getItem() {
    const res = await LLSIFService.fetchEventData(
      encodeURIComponent(route.params.eventName)
    );
    setItem(res);
  }

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
  async function loadData() {
    setWWEventStart(dayjs(item.english_beginning));
    setWWEventEnd(dayjs(item.english_end));
    setJPEventStart(dayjs(item.beginning, Config.DATETIME_FORMAT_INPUT));
    setJPEventEnd(dayjs(item.end, Config.DATETIME_FORMAT_INPUT));
    const wwEvent = wwEventInfo.filter(
      (value) => value.start_date === WWEventStart.unix()
    );
    const jpEvent = jpEventInfo.filter(
      (value) => value.start_date === JPEventStart.unix()
    );
    if (wwEvent.length > 0) {
      const res = await LLSIFdotnetService.fetchEventData({
        svr: 'EN',
        eid: wwEvent[0].event_id,
        cname: 'en'
      });
      const data = parseEventTracker(res);
      wwTracker = data;
    }
    if (jpEvent.length > 0) {
      const res = await LLSIFdotnetService.fetchEventData({
        svr: 'JP',
        eid: jpEvent[0].event_id,
        cname: 'jp'
      });
      const data = parseEventTracker(res);
      jpTracker = data;
    }
    const [resCard, resSong] = await Promise.all([
      LLSIFService.fetchCardList({ event_japanese_name: item.japanese_name }),
      LLSIFService.fetchSongList({ event: item.japanese_name })
    ]);
    setCards(resCard);
    setSongs(resSong);
    setIsLoading(false);
  }

  const onTabPress = (index) => {
    if (!isLoading) setSelectedTab(index);
  };

  if (isLoading) return <LoadingScreen bgColor={Colors.violet} />;
  return (
    <View style={AppStyles.screen}>
      {selectedTab === 0 ? (
        <Information
          item={item}
          cards={cards}
          songs={songs}
          WWEventStart={WWEventStart}
          WWEventEnd={WWEventEnd}
          JPEventStart={JPEventStart}
          JPEventEnd={JPEventEnd}
        />
      ) : (
          <Tracker jpTracker={jpTracker} wwTracker={wwTracker} />
        )}
    </View>
  );
}

EventDetailScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      event: PropTypes.object,
      eventName: PropTypes.string
    })
  })
};

export default EventDetailScreen;
