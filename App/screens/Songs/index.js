import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Alert, Image } from 'react-native';
import { IconButton, Surface, Text, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useStatusBar from '~/hooks/useStatusBar';
import ConnectStatus from '~/Components/ConnectStatus';
import EventRow from '~/Components/EventRow';
import SongItem from '~/Components/SongItem';
import MainUnitRow from '~/Components/MainUnitRow';
import OrderingRow from '~/Components/OrderingRow';
import AttributeRow from '~/Components/AttributeRow';
import SplashScreen from '../Splash';
import LLSIFService from '~/Services/LLSIFService';
import { AppStyles, Images, Fonts, Colors } from '~/Theme';
import { OrderingGroup } from '~/Config';
import styles from './styles';

const defaultFilter = {
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
function SongsScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const [searchOptions, setSearchOptions] = useState(defaultFilter);
  const onEndReached = _.debounce(onEndReaching, 500);

  useEffect(() => {
    getSongs();
  }, [searchOptions.page]);

  /**
   * Key extractor for FlatList
   *
   */
  const keyExtractor = (item) => `song ${item.name}`;

  /**
   * Render item in FlatList
   *
   */
  const renderItem = ({ item }) => {
    /**
     * Navigate to Song Detail Screen
     *
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
   *
   */
  function onEndReaching() {
    if (stopSearch) return;
    setSearchOptions({
      ...searchOptions,
      page: searchOptions.page + 1
    });
  }

  /**
   * Fetch song list
   *
   */
  function getSongs() {
    const ordering =
      (searchOptions.isReverse ? '-' : '') + searchOptions.selectedOrdering;
    const theFilter = {
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
    // eslint-disable-next-line no-console
    console.log(`Songs.getSongs ${JSON.stringify(theFilter)}`);
    LLSIFService.fetchSongList(theFilter)
      .then((result) => {
        if (result === 404) {
          // console.log('LLSIFService.fetchSongList 404')
          setStopSearch(true);
        } else {
          let x = [...list, ...result];
          x = x.filter(
            (thing, ind, self) =>
              ind === self.findIndex((t) => t.name === thing.name)
          );
          setList(x);
        }
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          'Error when get songs',
          // eslint-disable-next-line no-console
          [{ text: 'OK', onPress: () => console.log(`OK Pressed ${err}`) }]
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /**
   * Filter on/off
   *
   */
  const toggleFilter = () => setIsFilter(!isFilter);

  /**
   * Reverse search on/off
   *
   */
  const toggleReverse = () =>
    setSearchOptions({
      ...searchOptions,
      isReverse: !searchOptions.isReverse
    });

  /**
   * Open drawer
   *
   */
  const openDrawer = () => navigation.openDrawer();

  /**
   * Call when pressing search button
   *
   */
  const onSearch = () => {
    setList([]);
    setIsFilter(false);
    setStopSearch(false);
    setSearchOptions({
      ...searchOptions,
      page: 1
    });
  };

  /**
   * Reset filter variables
   *
   */
  const resetFilter = () => {
    setSearchOptions(defaultFilter);
  };

  /**
   * Save `is_event`
   *
   */
  const selectEvent = (value) => () =>
    setSearchOptions({
      ...searchOptions,
      is_event: value
    });

  /**
   * Save `attribute`
   *
   */
  const selectAttribute = (value) => () =>
    setSearchOptions({
      ...searchOptions,
      attribute: value
    });

  /**
   * Save `main_unit`
   *
   */
  const selectMainUnit = (value) => () =>
    setSearchOptions({
      ...searchOptions,
      main_unit: value
    });

  /**
   * Save ordering
   *
   */
  const selectOrdering = (itemValue) =>
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
      <Text style={Fonts.style.center}>No result</Text>
    </View>
  );

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Surface style={[AppStyles.header, styles.header]}>
        <IconButton icon={'menu'} onPress={openDrawer} />
        <View style={AppStyles.searchHeader}>
          <TextInput
            style={AppStyles.searchInput}
            onChangeText={(text) =>
              setSearchOptions({
                ...searchOptions,
                search: text
              })
            }
            onSubmitEditing={onSearch}
            placeholder={'Search song...'}
          />
          <IconButton
            icon={'search'}
            onPress={onSearch}
            style={AppStyles.searchButton}
          />
        </View>
        <IconButton icon={'ios-more'} onPress={toggleFilter} />
      </Surface>
      {/* FILTER */}
      {isFilter && (
        <Surface style={styles.filterContainer}>
          <AttributeRow
            attribute={searchOptions.attribute}
            selectAttribute={selectAttribute}
          />
          <EventRow
            isEvent={searchOptions.is_event}
            selectEvent={selectEvent}
          />
          <MainUnitRow
            mainUnit={searchOptions.main_unit}
            selectMainUnit={selectMainUnit}
          />
          <OrderingRow
            orderingItem={OrderingGroup.SONG}
            selectedOrdering={searchOptions.selectedOrdering}
            selectOrdering={selectOrdering}
            isReverse={searchOptions.isReverse}
            toggleReverse={toggleReverse}
          />
          <TouchableRipple onPress={resetFilter} style={styles.resetView}>
            <Text style={styles.resetText}>RESET</Text>
          </TouchableRipple>
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
}

export default SongsScreen;
