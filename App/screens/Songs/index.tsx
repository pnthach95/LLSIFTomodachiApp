import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, Image, StyleSheet } from 'react-native';
import {
  Appbar,
  Surface,
  Text,
  Button,
  Searchbar,
  useTheme
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
  SongsScreenProps
} from '~/Utils/types';

const defaultFilter: SongSearchParams = {
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
  main_unit: ''
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
  const [searchOptions, setSearchOptions] = useState(defaultFilter);
  const [runSearch, setRunSearch] = useState(0);
  const bottom = { paddingBottom: insets.bottom };

  useEffect(() => {
    if (searchOptions.page > 0) {
      void getSongs();
    }
  }, [searchOptions.page, runSearch]);

  /** Key extractor for FlatList */
  const keyExtractor = (item: SongObject) => `song ${item.name}`;

  /** Render item in FlatList */
  const renderItem = ({ item }: { item: SongObject }) => {
    /** Navigate to Song Detail Screen */
    const navigateToSongDetail = () => {
      navigation.navigate('SongDetailScreen', {
        item,
        prevStatusBarColor: colors.card
      });
    };

    return <SongItem item={item} onPress={navigateToSongDetail} />;
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  const onEndReaching = () => {
    if (searchOptions.page > 0) {
      setSearchOptions({ ...searchOptions, page: searchOptions.page + 1 });
    }
  };

  const onEndReached = _.debounce(onEndReaching, 500);

  /** Fetch song list */
  const getSongs = async () => {
    const ordering =
      (searchOptions.isReverse ? '-' : '') +
      (searchOptions.selectedOrdering || '');
    const params: SongSearchParams = {
      ordering,
      page_size: searchOptions.page_size,
      page: searchOptions.page,
      expand_event: searchOptions.expand_event
      // is_daily_rotation: this.state.is_daily_rotation
    };
    if (searchOptions.attribute !== '')
      params.attribute = searchOptions.attribute;
    if (searchOptions.available !== '')
      params.available = searchOptions.available;
    if (searchOptions.is_event !== '') params.is_event = searchOptions.is_event;
    if (searchOptions.main_unit !== '')
      params.main_unit = searchOptions.main_unit;
    if (searchOptions.search !== '') params.search = searchOptions.search;
    // console.log(`Songs.getSongs ${JSON.stringify(theFilter)}`);
    setLoading(true);
    try {
      const result = await LLSIFService.fetchSongList(params);
      if (result === 404) {
        setSearchOptions({ ...searchOptions, page: 0 });
      } else if (Array.isArray(result)) {
        let x = [];
        if (searchOptions.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (song, ind, self) =>
            ind === self.findIndex((t) => t.name === song.name)
        );
        if (x.length === 0) {
          setSearchOptions({ ...searchOptions, page: 0 });
        }
        setList(x);
      } else {
        setSearchOptions({ ...searchOptions, page: 0 });
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
    setSearchOptions({ ...searchOptions, isReverse: !searchOptions.isReverse });

  /** Call when pressing search button */
  const onSearch = () => {
    setList([]);
    setShowFilter(false);
    if (searchOptions.page === 1) {
      setRunSearch(runSearch + 1);
    }
    setSearchOptions({ ...searchOptions, page: 1 });
  };

  /** Reset filter variables */
  const resetFilter = () =>
    setSearchOptions({ ...defaultFilter, page: searchOptions.page });

  /** Save `is_event` */
  const selectEvent = (value: BooleanOrEmpty) =>
    setSearchOptions({ ...searchOptions, is_event: value });

  /** Save `attribute` */
  const selectAttribute = (value: AttributeType) =>
    setSearchOptions({ ...searchOptions, attribute: value });

  /** Save `main_unit` */
  const selectMainUnit = (value: MainUnitNames) =>
    setSearchOptions({ ...searchOptions, main_unit: value });

  /** Save ordering */
  const selectOrdering = (itemValue: string) =>
    setSearchOptions({ ...searchOptions, selectedOrdering: itemValue });

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
    setSearchOptions({ ...searchOptions, search: text });

  const goBack = () => navigation.goBack();

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Appbar.Header style={{ backgroundColor: colors.card }}>
        <Appbar.BackAction onPress={goBack} />
        <View style={AppStyles.searchHeader}>
          <Searchbar
            value={searchOptions.search || ''}
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
            attribute={searchOptions.attribute || ''}
            selectAttribute={selectAttribute}
          />
          <EventRow
            isEvent={searchOptions.is_event || ''}
            selectEvent={selectEvent}
          />
          <MainUnitRow
            mainUnit={searchOptions.main_unit || ''}
            selectMainUnit={selectMainUnit}
          />
          <OrderingRow
            list={OrderingGroup.SONG}
            selectedItem={searchOptions.selectedOrdering}
            onSelect={selectOrdering}
            isReverse={searchOptions.isReverse || true}
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
    elevation: 5,
    padding: 10
  },
  flatListElement: {
    margin: 10
  },
  list: {
    padding: Metrics.smallMargin
  }
});

export default SongsScreen;
