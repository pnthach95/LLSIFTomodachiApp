import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import dayjs from 'dayjs';

import Information from './Information';
import Tracker from './Tracker';
import UserContext from '~/Context/UserContext';
import LoadingScreen from '../Loading';
import LLSIFService from '~/Services/LLSIFService';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import { Config } from '~/Config';
import { AppStyles } from '~/Theme';
import { EventDetailScreenProps, EventObject } from '~/Utils/types';

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
const EventDetailScreen: React.FC<EventDetailScreenProps> = ({
  navigation,
  route
}) => {
  const { state } = useContext(UserContext);
  const wwEventInfo = state.cachedData.eventInfo.ww || [];
  const jpEventInfo = state.cachedData.eventInfo.jp || [];
  const [item, setItem] = useState<EventObject | null>(null);
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
    void getItem();
  }, []);

  const getItem = async () => {
    const res = await LLSIFService.fetchEventData(
      encodeURIComponent(route.params.eventName)
    );
    setItem(res);
    if (res) {
      await loadData(res);
    }
  };

  const parseEventTracker = (data) => {
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
  };

  /**
   * Load card list, song list in event
   *
   */
  const loadData = async (evRes: EventObject) => {
    setWWEventStart(dayjs(evRes.english_beginning));
    setWWEventEnd(dayjs(evRes.english_end));
    setJPEventStart(dayjs(evRes.beginning, Config.DATETIME_FORMAT_INPUT));
    setJPEventEnd(dayjs(evRes.end, Config.DATETIME_FORMAT_INPUT));
    const wwEvent = wwEventInfo.filter(
      (value) => value.start_date === WWEventStart.unix()
    );
    const jpEvent = jpEventInfo.filter(
      (value) => value.start_date === JPEventStart.unix()
    );
    if (wwEvent.length > 0) {
      const res = await LLSIFdotnetService.fetchEventData({
        server: 'EN',
        id: wwEvent[0].event_id
      });
      const data = parseEventTracker(res);
      wwTracker = data;
    }
    if (jpEvent.length > 0) {
      const res = await LLSIFdotnetService.fetchEventData({
        server: 'JP',
        id: jpEvent[0].event_id
      });
      const data = parseEventTracker(res);
      jpTracker = data;
    }
    const [resCard, resSong] = await Promise.all([
      LLSIFService.fetchCardList({ event_japanese_name: evRes.japanese_name }),
      LLSIFService.fetchSongList({ event: evRes.japanese_name })
    ]);
    setCards(resCard);
    setSongs(resSong);
    setIsLoading(false);
  };

  const onTabPress = (index: number) => {
    if (!isLoading) setSelectedTab(index);
  };

  const goBack = () => navigation.goBack();

  return (
    <View style={AppStyles.screen}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <SegmentedControlTab
          values={['Information', 'Tier cutoff']}
          selectedIndex={selectedTab}
          onTabPress={onTabPress}
        />
      </Appbar.Header>
      {isLoading ? (
        <LoadingScreen />
      ) : selectedTab === 0 ? (
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
};

export default EventDetailScreen;
