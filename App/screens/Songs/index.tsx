import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Image, StyleSheet } from 'react-native';
import {
  Appbar,
  Surface,
  Text,
  Button,
  Searchbar,
  useTheme,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import EventRow from '~/Components/EventRow';
import SongItem from '~/Components/SongItem';
import MainUnitRow from '~/Components/MainUnitRow';
import OrderingRow from '~/Components/OrderingRow';
import AttributeRow from '~/Components/AttributeRow';
import LLSIFService from '~/Services/LLSIFService';
import { AppStyles, Images, Metrics, Fonts } from '~/Theme';
import { OrderingGroup } from '~/Config';
import type {
  AttributeType,
  BooleanOrEmpty,
  MainUnitNames,
  SongObject,
  SongSearchParams,
  SongsScreenProps,
} from '~/Utils/types';

const defaultParams: SongSearchParams = {
  selectedOrdering: OrderingGroup.SONG[0].value,
  isReverse: true,
  ordering: '-id',
  page_size: 20,
  page: 1,
  expand_event: '',
  search: '',
  attribute: '',
  is_event: '',
  is_daily_rotation: '',
  available: '',
  main_unit: '',
};

/**
 * [Song List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#get-the-list-of-songs)
 */
const SongsScreen: React.FC<SongsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<SongObject[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useState(defaultParams);
  const [runSearch, setRunSearch] = useState(0);
  const bottom = { paddingBottom: insets.bottom };

  useEffect(() => {
    if (searchParams.page > 0) {
      void getSongs();
    }
  }, [searchParams.page, runSearch]);

  /** Key extractor for FlatList */
  const keyExtractor = (item: SongObject) => `song ${item.name}`;

  /** Render item in FlatList */
  const renderItem = ({ item }: { item: SongObject }) => {
    /** Navigate to Song Detail Screen */
    const navigateToSongDetail = () => {
      navigation.navigate('SongDetailScreen', {
        item,
        prevStatusBarColor: colors.card,
      });
    };

    return <SongItem item={item} onPress={navigateToSongDetail} />;
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  const onEndReaching = () => {
    if (searchParams.page > 0) {
      setSearchParams({ ...searchParams, page: searchParams.page + 1 });
    }
  };

  const onEndReached = _.debounce(onEndReaching, 500);

  /** Fetch song list */
  const getSongs = async () => {
    const ordering =
      (searchParams.isReverse ? '-' : '') +
      (searchParams.selectedOrdering || '');
    const params: SongSearchParams = {
      ordering,
      page_size: searchParams.page_size,
      page: searchParams.page,
      expand_event: searchParams.expand_event,
      // is_daily_rotation: this.state.is_daily_rotation
    };
    if (searchParams.attribute !== '')
      params.attribute = searchParams.attribute;
    if (searchParams.available !== '')
      params.available = searchParams.available;
    if (searchParams.is_event !== '') params.is_event = searchParams.is_event;
    if (searchParams.main_unit !== '')
      params.main_unit = searchParams.main_unit;
    if (searchParams.search !== '') params.search = searchParams.search;
    // console.log(`Songs.getSongs ${JSON.stringify(theFilter)}`);
    setLoading(true);
    try {
      const result = await LLSIFService.fetchSongList(params);
      if (result === 404) {
        setSearchParams({ ...searchParams, page: 0 });
      } else if (Array.isArray(result)) {
        let x = [];
        if (searchParams.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (song, ind, self) =>
            ind === self.findIndex((t) => t.name === song.name),
        );
        if (x.length === 0) {
          setSearchParams({ ...searchParams, page: 0 });
        }
        setList(x);
      } else {
        setSearchParams({ ...searchParams, page: 0 });
        throw Error('null');
      }
    } catch (err) {
      // console.log('OK Pressed', err);
      Alert.alert('Error', 'Error when get songs', [{ text: 'OK' }]);
    } finally {
      setLoading(false);
    }
  };

  /** Filter on/off */
  const toggleFilter = () => setShowFilter(!showFilter);

  /** Reverse search on/off */
  const toggleReverse = () =>
    setSearchParams({ ...searchParams, isReverse: !searchParams.isReverse });

  /** Call when pressing search button */
  const onSearch = () => {
    setList([]);
    setShowFilter(false);
    if (searchParams.page === 1) {
      setRunSearch(runSearch + 1);
    }
    setSearchParams({ ...searchParams, page: 1 });
  };

  /** Reset filter variables */
  const resetFilter = () =>
    setSearchParams({ ...defaultParams, page: searchParams.page });

  /** Save `is_event` */
  const selectEvent = (value: BooleanOrEmpty) =>
    setSearchParams({ ...searchParams, is_event: value });

  /** Save `attribute` */
  const selectAttribute = (value: AttributeType) =>
    setSearchParams({ ...searchParams, attribute: value });

  /** Save `main_unit` */
  const selectMainUnit = (value: MainUnitNames) =>
    setSearchParams({ ...searchParams, main_unit: value });

  /** Save ordering */
  const selectOrdering = (itemValue: string) =>
    setSearchParams({ ...searchParams, selectedOrdering: itemValue });

  /** Render footer in FlatList */
  const renderFooter = (
    <View style={[AppStyles.center, styles.flatListElement]}>
      <Image source={Images.alpaca} />
    </View>
  );

  const renderEmpty = (
    <View style={styles.flatListElement}>
      <Text style={Fonts.style.center}>
        {loading ? 'Loading' : 'No result'}
      </Text>
    </View>
  );

  const onChangeText = (text: string) =>
    setSearchParams({ ...searchParams, search: text });

  const goBack = () => navigation.goBack();

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Appbar.Header style={{ backgroundColor: colors.card }}>
        <Appbar.BackAction onPress={goBack} />
        <View style={AppStyles.searchHeader}>
          <Searchbar
            value={searchParams.search || ''}
            style={AppStyles.noElevation}
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            onIconPress={onSearch}
            placeholder='Search song...'
          />
        </View>
        <Appbar.Action icon='dots-horizontal' onPress={toggleFilter} />
      </Appbar.Header>
      {/* FILTER */}
      {showFilter && (
        <Surface style={styles.filterContainer}>
          <AttributeRow
            attribute={searchParams.attribute || ''}
            selectAttribute={selectAttribute}
          />
          <EventRow
            isEvent={searchParams.is_event || ''}
            selectEvent={selectEvent}
          />
          <MainUnitRow
            mainUnit={searchParams.main_unit || ''}
            selectMainUnit={selectMainUnit}
          />
          <OrderingRow
            list={OrderingGroup.SONG}
            selectedItem={searchParams.selectedOrdering}
            onSelect={selectOrdering}
            isReverse={searchParams.isReverse || true}
            toggleReverse={toggleReverse}
          />
          <Button mode='contained' onPress={resetFilter}>
            RESET
          </Button>
        </Surface>
      )}
      <ConnectStatus />
      {/* LIST */}
      <FlatList
        data={list}
        initialNumToRender={6}
        numColumns={2}
        keyExtractor={keyExtractor}
        style={styles.list}
        onEndReached={onEndReached}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        contentContainerStyle={bottom}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    padding: Metrics.baseMargin,
  },
  flatListElement: {
    margin: Metrics.baseMargin,
  },
  list: {
    padding: Metrics.smallMargin,
  },
});

export default SongsScreen;
