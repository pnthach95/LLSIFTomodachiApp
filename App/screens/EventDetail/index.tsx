import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import dayjs from 'dayjs';

import Information from './Information';
import Tracker from './Tracker';
import UserContext from '~/Context/UserContext';
import LoadingScreen from '../Loading';
import LLSIFService from '~/Services/LLSIFService';
import LLSIFdotnetService from '~/Services/LLSIFdotnetService';
import { AppStyles } from '~/Theme';
import type {
  CardObject,
  EventDetailScreenProps,
  EventObject,
  LLSIFError,
  SongObject
} from '~/Utils/types';

/**
 * Event Detail Screen
 *
 * From parent screen, pass `eventName` (Japanese only) to show event detail
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
  const [isError, setIsError] = useState<LLSIFError | null>(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [cards, setCards] = useState<CardObject[]>([]);
  const [songs, setSongs] = useState<SongObject[]>([]);
  const [WWEventStart, setWWEventStart] = useState(dayjs());
  const [WWEventEnd, setWWEventEnd] = useState(dayjs());
  const [JPEventStart, setJPEventStart] = useState(dayjs());
  const [JPEventEnd, setJPEventEnd] = useState(dayjs());
  const [trackerData, setTrackerData] = useState<{
    ww: string[][] | null;
    jp: string[][] | null;
  }>({
    ww: null,
    jp: null
  });
  useEffect(() => {
    void getItem();
  }, []);

  const getItem = async () => {
    try {
      const res = await LLSIFService.fetchEventData(
        encodeURIComponent(route.params.eventName)
      );
      setItem(res);
      if (res) {
        await loadData(res);
      } else {
        throw Error('Error');
      }
    } catch (error) {
      setIsError(error);
    }
  };

  const parseEventTracker = (data: string) => {
    const result: string[][] = [];
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
    setJPEventStart(dayjs(evRes.beginning));
    setJPEventEnd(dayjs(evRes.end));
    let wwTracker: string[][] | null = null;
    let jpTracker: string[][] | null = null;
    const wwEvent = wwEventInfo.filter(
      (value) => value.event_name === evRes.english_name
    );
    const jpEvent = jpEventInfo.filter(
      (value) => value.event_name === evRes.japanese_name
    );
    if (wwEvent.length > 0) {
      const res = await LLSIFdotnetService.fetchEventData({
        server: 'EN',
        id: wwEvent[0].event_id
      });
      if (res) {
        wwTracker = parseEventTracker(res);
      }
    }
    if (jpEvent.length > 0) {
      const res = await LLSIFdotnetService.fetchEventData({
        server: 'JP',
        id: jpEvent[0].event_id
      });
      if (res) {
        jpTracker = parseEventTracker(res);
      }
    }
    setTrackerData({ ww: wwTracker, jp: jpTracker });
    const [resCard, resSong] = await Promise.all([
      LLSIFService.fetchCardList({ event_japanese_name: evRes.japanese_name }),
      LLSIFService.fetchSongList({ event: evRes.japanese_name })
    ]);
    if (Array.isArray(resCard)) {
      setCards(resCard);
    }
    if (Array.isArray(resSong)) {
      setSongs(resSong);
    }
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
          enabled={!isLoading}
          onTabPress={onTabPress}
          tabsContainerStyle={AppStyles.screen}
        />
        <Appbar.Action icon='blank' />
      </Appbar.Header>
      {isError ? (
        <View style={[AppStyles.center, AppStyles.screen]}>
          <Text>{isError.detail}</Text>
          <Text>{route.params.eventName}</Text>
        </View>
      ) : isLoading ? (
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
        <Tracker jpTracker={trackerData.jp} wwTracker={trackerData.ww} />
      )}
    </View>
  );
};

EventDetailScreen.propTypes = {
  route: PropTypes.any
};

export default EventDetailScreen;
