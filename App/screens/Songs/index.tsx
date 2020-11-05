import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Alert,
  Image,
  StyleSheet
} from 'react-native';
import { Appbar, Surface, Text, Button, useTheme } from 'react-native-paper';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import EventRow from '~/Components/EventRow';
import SongItem from '~/Components/SongItem';
import MainUnitRow from '~/Components/MainUnitRow';
import OrderingRow from '~/Components/OrderingRow';
import AttributeRow from '~/Components/AttributeRow';
import LLSIFService from '~/Services/LLSIFService';
import { AppStyles, Images, Metrics, Colors, Fonts } from '~/Theme';
import { OrderingGroup } from '~/Config';
import type {
  AttributeType,
  BooleanOrEmpty,
  MainUnitNames,
  SongObject,
  SongsScreenProps
} from '~/Utils/types';

type FilterType = {
  ordering: string;
  page_size: number;
  page: number;
  expand_event: string;
  selectedOrdering?: string;
  isReverse?: boolean;
  search?: string;
  attribute?: AttributeType;
  is_event?: BooleanOrEmpty;
  is_daily_rotation?: BooleanOrEmpty;
  available?: BooleanOrEmpty;
  main_unit?: MainUnitNames;
};

const defaultFilter: FilterType = {
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
 *
 * State:
 * - `isLoading`: Loading state
 * - `list`: Data for FlatList
 * - `isFilter`: Filter on/off
 * - `ordering`: Ordering by any field (See link above)
 * - `page_size`: Number of object per API call
 * - `page`: Page number
 * - `expand_event`: Will return the full Event object in the event field
 * - `search`: Keyword for search
 * - `attribute`: Attribute (None, Smile, Pure, Cool, All)
 * - `is_event`: Is event (None, True, False)
 * - `is_daily_rotation`: *TODO*
 * - `available`: *TODO*
 * - `main_unit`: Main unit (None, μ's, Aqours)
 * - `stopSearch`: Prevent calling API
 *
 */
const SongsScreen: React.FC<SongsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<SongObject[]>([]);
  const [isFilter, setIsFilter] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const [searchOptions, setSearchOptions] = useState(defaultFilter);

  useEffect(() => {
    getSongs();
  }, [searchOptions.page]);

  /**
   * Key extractor for FlatList
   */
  const keyExtractor = (item: SongObject) => `song ${item.name}`;

  /**
   * Render item in FlatList
   */
  const renderItem = ({ item }: { item: SongObject }) => {
    /**
     * Navigate to Song Detail Screen
     */
    const navigateToSongDetail = () => {
      navigation.navigate('SongDetailScreen', { item });
    };

    return <SongItem item={item} onPress={navigateToSongDetail} />;
  };
  renderItem.propTypes = {
    item: PropTypes.object.isRequired
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  const onEndReaching = () => {
    if (stopSearch) return;
    setSearchOptions({
      ...searchOptions,
      page: searchOptions.page + 1
    });
  };
  const onEndReached = _.debounce(onEndReaching, 500);

  /**
   * Fetch song list
   */
  const getSongs = () => {
    const ordering =
      (searchOptions.isReverse ? '-' : '') +
      (searchOptions.selectedOrdering || '');
    const theFilter: FilterType = {
      ordering,
      page_size: searchOptions.page_size,
      page: searchOptions.page,
      expand_event: searchOptions.expand_event
      // is_daily_rotation: this.state.is_daily_rotation
    };
    if (searchOptions.attribute !== '')
      theFilter.attribute = searchOptions.attribute;
    if (searchOptions.available !== '')
      theFilter.available = searchOptions.available;
    if (searchOptions.is_event !== '')
      theFilter.is_event = searchOptions.is_event;
    if (searchOptions.main_unit !== '')
      theFilter.main_unit = searchOptions.main_unit;
    if (searchOptions.search !== '') theFilter.search = searchOptions.search;
    // console.log(`Songs.getSongs ${JSON.stringify(theFilter)}`);
    setLoading(true);
    LLSIFService.fetchSongList(theFilter)
      .then((result) => {
        if (result === 404) {
          setStopSearch(true);
        } else if (Array.isArray(result)) {
          let x = [...list, ...result];
          x = x.filter(
            (thing, ind, self) =>
              ind === self.findIndex((t) => t.name === thing.name)
          );
          setList(x);
        } else {
          throw Error('null');
        }
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((err) => {
        // console.log('OK Pressed', err);
        Alert.alert('Error', 'Error when get songs', [{ text: 'OK' }]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Filter on/off
   */
  const toggleFilter = () => setIsFilter(!isFilter);

  /**
   * Reverse search on/off
   */
  const toggleReverse = () =>
    setSearchOptions({
      ...searchOptions,
      isReverse: !searchOptions.isReverse
    });

  /**
   * Call when pressing search button
   */
  const onSearch = () => {
    setList([]);
    setIsFilter(false);
    setStopSearch(false);
    setSearchOptions({ ...searchOptions, page: 1 });
  };

  /**
   * Reset filter variables
   */
  const resetFilter = () => {
    setSearchOptions(defaultFilter);
  };

  /**
   * Save `is_event`
   */
  const selectEvent = (value: BooleanOrEmpty) =>
    setSearchOptions({
      ...searchOptions,
      is_event: value
    });

  /**
   * Save `attribute`
   */
  const selectAttribute = (value: AttributeType) =>
    setSearchOptions({
      ...searchOptions,
      attribute: value
    });

  /**
   * Save `main_unit`
   */
  const selectMainUnit = (value: MainUnitNames) =>
    setSearchOptions({
      ...searchOptions,
      main_unit: value
    });

  /**
   * Save ordering
   */
  const selectOrdering = (itemValue: string) =>
    setSearchOptions({
      ...searchOptions,
      selectedOrdering: itemValue
    });

  /**
   * Render footer in FlatList
   */
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

  const onChangeText = (text: string): void =>
    setSearchOptions({
      ...searchOptions,
      search: text
    });

  const goBack = () => navigation.goBack();

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Appbar.Header style={{ backgroundColor: colors.card }}>
        <Appbar.BackAction onPress={goBack} />
        <View style={AppStyles.searchHeader}>
          <TextInput
            style={AppStyles.searchInput}
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            placeholder='Search song...'
          />
        </View>
        <Appbar.Action icon='magnify' onPress={onSearch} />
        <Appbar.Action icon='dots-horizontal' onPress={toggleFilter} />
      </Appbar.Header>
      {/* FILTER */}
      {isFilter && (
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
            orderingItem={OrderingGroup.SONG}
            selectedOrdering={searchOptions.selectedOrdering}
            selectOrdering={selectOrdering}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: Colors.white,
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
