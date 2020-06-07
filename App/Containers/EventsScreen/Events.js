import React, { useState, useEffect } from 'react';
import {
  View, FlatList, Text,
  TextInput, Alert, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import SkillRow from '~/Components/SkillRow';
import EventItem from '~/Components/EventItem/EventItem';
import RegionRow from '~/Components/RegionRow/RegionRow';
import Touchable from '~/Components/Touchable/Touchable';
import IdolNameRow from '~/Components/IdolNameRow';
import MainUnitRow from '~/Components/MainUnitRow/MainUnitRow';
import AttributeRow from '~/Components/AttributeRow/AttributeRow';
import SquareButton from '~/Components/SquareButton/SquareButton';
import SplashScreen from '../SplashScreen/SplashScreen';
import { Colors, ApplicationStyles, Images } from '~/Theme';
import styles from './styles';
import LLSIFService from '~/Services/LLSIFService';
import { loadSettings } from '~/Utils';

/**
 * [Event List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#get-the-list-of-events)
 *
 * State:
 * - `isLoading`: Loading state
 * - `list`: Data for FlatList
 * - `isFilter`: Filter on/off
 * - `stopSearch`: Prevent calling API
 * - `ordering`: Ordering by any field (See link above)
 * - `page_size`: Number of object per API call
 * - `page`: Page number
 * - `search`: Keyword for search
 * - `idol`: Idol name
 * - `main_unit`: Main unit (None, μ's, Aqours)
 * - `skill`: Skill name
 * - `attribute`: Attribute (None, Smile, Pure, Cool, All)
 * - `is_english`: Is English
 *
 */
function EventsScreen({ navigation }) {
  const defaultFilter = {
    ordering: '-beginning',
    page_size: 30,
    page: 1,
    idol: 'All',
    search: '',
    main_unit: '',
    skill: 'All',
    attribute: '',
    is_english: '',
  };

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const [searchOptions, setSearchOptions] = useState(defaultFilter);
  const onEndReached = _.debounce(onEndReaching, 500);

  useEffect(() => {
    loadSettings().then((res) => {
      setSearchOptions({
        ...searchOptions,
        is_english: res.worldwide_only ? 'False' : '',
      });
    });
  }, []);

  useEffect(() => {
    getEvents();
  }, [searchOptions.page]);

  /**
   * Key extractor for FlatList
   *
   */
  const keyExtractor = (item) => `event ${item.japanese_name}`;

  /**
   * Render item in FlatList
   *
   */
  const renderItem = ({ item }) => {
    /**
     * Navigate to Event Detail Screen
     *
     */
    const navigateToEventDetail = () => {
      navigation.navigate('EventDetailScreen', {
        eventName: item.japanese_name,
      });
    };

    return <EventItem item={item}
      onPress={navigateToEventDetail} />;
  };
  renderItem.propTypes = {
    item: PropTypes.shape({
      japanese_name: PropTypes.string.isRequired,
    }),
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
      page: searchOptions.page + 1,
    });
  }

  /**
   * Get event list
   *
   */
  function getEvents() {
    const theFilter = {
      ordering: searchOptions.ordering,
      page_size: searchOptions.page_size,
      page: searchOptions.page,
    };
    if (searchOptions.idol !== 'All') theFilter.idol = searchOptions.idol;
    if (searchOptions.skill !== 'All') theFilter.skill = searchOptions.skill;
    let isEnglish = searchOptions.is_english;
    if (isEnglish !== '') {
      if (isEnglish === 'True') isEnglish = 'False';
      else isEnglish = 'True';
      theFilter.is_english = isEnglish;
    }
    if (searchOptions.main_unit !== '') theFilter.main_unit = searchOptions.main_unit;
    if (searchOptions.attribute !== '') theFilter.attribute = searchOptions.attribute;
    if (searchOptions.search !== '') theFilter.search = searchOptions.search;
    // eslint-disable-next-line no-console
    console.log(`Events.getEvents ${JSON.stringify(theFilter)}`);
    LLSIFService.fetchEventList(theFilter).then((result) => {
      if (result === 404) {
        // console.log('LLSIFService.fetchEventList 404');
        setStopSearch(true);
      } else {
        let x = [...list, ...result];
        // eslint-disable-next-line max-len
        x = x.filter((thing, index, self) => index === self.findIndex((t) => t.japanese_name === thing.japanese_name));
        setList(x);
      }
    }).catch((err) => {
      Alert.alert('Error', 'Error when get songs',
        // eslint-disable-next-line no-console
        [{ text: 'OK', onPress: () => console.log('OK Pressed', err) }]);
    }).finally(() => {
      setIsLoading(false);
    });
  }

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
      page: 1,
    });
    getEvents();
  };

  /**
   * Reset filter
   *
   */
  const resetFilter = () => {
    setSearchOptions(defaultFilter);
  };

  /**
   * Filter on/off
   *
   */
  const toggleFilter = () => setIsFilter(!isFilter);

  /**
   * Save `attribute`
   *
   * @param {String} value
   */
  const selectAttribute = (value) => () => setSearchOptions({
    ...searchOptions,
    attribute: value,
  });

  /**
   * Save `main_unit`
   *
   * @param {String} value
   */
  const selectMainUnit = (value) => () => setSearchOptions({
    ...searchOptions,
    main_unit: value,
  });

  /**
   * Save `is_english`
   *
   * @param {String} value
   */
  const selectRegion = (value) => () => setSearchOptions({
    ...searchOptions,
    is_english: value,
  });

  /**
   * Save `skill`
   *
   * @param {String} itemValue
   */
  const selectSkill = (itemValue) => setSearchOptions({
    ...searchOptions,
    skill: itemValue,
  });

  /**
   * Save `idol`
   *
   * @param {String} itemValue
   */
  const selectIdol = (itemValue) => setSearchOptions({
    ...searchOptions,
    idol: itemValue,
  });

  /**
   * Render footer of FlatList
   *
   */
  const renderFooter = <View style={[ApplicationStyles.center, styles.margin10]}>
    <Image source={Images.alpaca} />
  </View>;

  const renderEmpty = <View style={styles.margin10}>
    <Text style={styles.resetText}>No result</Text>
  </View>;

  if (isLoading) {
    return <SplashScreen bgColor={Colors.violet} />;
  }

  return <View style={styles.container}>
    {/* HEADER */}
    <ElevatedView elevation={5} style={[ApplicationStyles.header, styles.header]}>
      <SquareButton name={'ios-menu'} onPress={openDrawer} />
      <View style={ApplicationStyles.searchHeader}>
        <TextInput
          onChangeText={(text) => setSearchOptions({
            ...searchOptions,
            search: text,
          })}
          onSubmitEditing={onSearch}
          placeholder={'Search event...'}
          style={ApplicationStyles.searchInput} />
        <SquareButton name={'ios-search'} onPress={onSearch}
          style={ApplicationStyles.searchButton} />
      </View>
      <SquareButton name={'ios-more'} onPress={toggleFilter} />
    </ElevatedView>

    {/* FILTER */}
    {isFilter
      && <ElevatedView elevation={5} style={styles.filterContainer}>
        <IdolNameRow name={searchOptions.idol} selectIdol={selectIdol} />
        <MainUnitRow mainUnit={searchOptions.main_unit} selectMainUnit={selectMainUnit} />
        <SkillRow skill={searchOptions.skill} selectSkill={selectSkill} />
        <AttributeRow attribute={searchOptions.attribute}
          selectAttribute={selectAttribute} />
        <RegionRow japanOnly={searchOptions.is_english} selectRegion={selectRegion} />
        <Touchable onPress={resetFilter} useForeground
          style={styles.resetView}>
          <Text style={styles.resetText}>RESET</Text>
        </Touchable>
      </ElevatedView>}
    <ConnectStatus />
    {/* LIST */}
    <FlatList data={list}
      contentContainerStyle={styles.content}
      initialNumToRender={6}
      keyExtractor={keyExtractor}
      style={styles.list}
      ListEmptyComponent={renderEmpty}
      ListFooterComponent={renderFooter}
      onEndReached={onEndReached}
      renderItem={renderItem} />
  </View>;
}

export default EventsScreen;
