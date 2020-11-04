import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Alert,
  Image,
  StyleSheet
} from 'react-native';
import { IconButton, Text, Surface, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import SkillRow from '~/Components/SkillRow';
import EventItem from '~/Components/EventItem';
import RegionRow from '~/Components/RegionRow';
import IdolNameRow from '~/Components/IdolNameRow';
import MainUnitRow from '~/Components/MainUnitRow';
import AttributeRow from '~/Components/AttributeRow';
import LoadingScreen from '../Loading';
import { Metrics, Colors, Fonts, AppStyles, Images } from '~/Theme';
import LLSIFService from '~/Services/LLSIFService';
import UserContext from '~/Context/UserContext';
import type {
  EventsScreenProps,
  EventObject,
  AttributeType,
  MainUnitNames,
  BooleanOrEmpty,
  SkillType
} from '~/Utils/types';

type FilterType = {
  ordering: string;
  page_size: number;
  page: number;
  idol?: string;
  search?: string;
  main_unit?: MainUnitNames;
  skill?: SkillType;
  attribute?: AttributeType;
  is_english?: BooleanOrEmpty;
};

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
const EventsScreen: React.FC<EventsScreenProps> = ({ navigation }) => {
  const { state } = useContext(UserContext);
  const defaultFilter: FilterType = {
    ordering: '-beginning',
    page_size: 30,
    page: 1,
    idol: 'All',
    search: '',
    main_unit: '',
    skill: 'All',
    attribute: '',
    is_english: state.options.worldwideOnly ? 'False' : ''
  };

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<EventObject[]>([]);
  const [isFilter, setIsFilter] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const [searchOptions, setSearchOptions] = useState(defaultFilter);
  const onEndReached = _.debounce(onEndReaching, 500);

  useEffect(() => {
    getEvents();
  }, [searchOptions.page]);

  /**
   * Key extractor for FlatList
   *
   */
  const keyExtractor = (item: EventObject) => `event ${item.japanese_name}`;

  /**
   * Render item in FlatList
   *
   */
  const renderItem = ({ item }: { item: EventObject }) => {
    /**
     * Navigate to Event Detail Screen
     *
     */
    const navigateToEventDetail = () => {
      navigation.navigate('EventDetailScreen', {
        eventName: item.japanese_name
      });
    };

    return <EventItem item={item} onPress={navigateToEventDetail} />;
  };
  renderItem.propTypes = {
    item: PropTypes.shape({
      japanese_name: PropTypes.string.isRequired
    })
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
   * Get event list
   */
  function getEvents() {
    const theFilter: FilterType = {
      ordering: searchOptions.ordering,
      page_size: searchOptions.page_size,
      page: searchOptions.page
    };
    if (searchOptions.idol !== 'All') theFilter.idol = searchOptions.idol;
    if (searchOptions.skill !== 'All') theFilter.skill = searchOptions.skill;
    let isEnglish = searchOptions.is_english;
    if (isEnglish !== '') {
      if (isEnglish === 'True') isEnglish = 'False';
      else isEnglish = 'True';
      theFilter.is_english = isEnglish;
    }
    if (searchOptions.main_unit !== '')
      theFilter.main_unit = searchOptions.main_unit;
    if (searchOptions.attribute !== '')
      theFilter.attribute = searchOptions.attribute;
    if (searchOptions.search !== '') theFilter.search = searchOptions.search;
    // eslint-disable-next-line no-console
    console.log(`Events.getEvents ${JSON.stringify(theFilter)}`);
    LLSIFService.fetchEventList(theFilter)
      .then((result) => {
        if (result === 404) {
          // console.log('LLSIFService.fetchEventList 404');
          setStopSearch(true);
        } else if (Array.isArray(result)) {
          let x = [...list, ...result];
          // eslint-disable-next-line max-len
          x = x.filter(
            (thing, index, self) =>
              index ===
              self.findIndex((t) => t.japanese_name === thing.japanese_name)
          );
          setList(x);
        } else {
          throw Error('null');
        }
      })
      .catch((err) => {
        Alert.alert(
          'Error',
          'Error when get songs',
          // eslint-disable-next-line no-console
          [{ text: 'OK', onPress: () => console.log('OK Pressed', err) }]
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /**
   * Call when pressing search button
   */
  const onSearch = () => {
    setList([]);
    setIsFilter(false);
    setStopSearch(false);
    setSearchOptions({
      ...searchOptions,
      page: 1
    });
    getEvents();
  };

  /**
   * Reset filter
   */
  const resetFilter = () => {
    setSearchOptions(defaultFilter);
  };

  /**
   * Filter on/off
   */
  const toggleFilter = () => setIsFilter(!isFilter);

  /**
   * Save `attribute`
   */
  const selectAttribute = (value: AttributeType) => () =>
    setSearchOptions({
      ...searchOptions,
      attribute: value
    });

  /**
   * Save `main_unit`
   */
  const selectMainUnit = (value: MainUnitNames) => () =>
    setSearchOptions({
      ...searchOptions,
      main_unit: value
    });

  /**
   * Save `is_english`
   */
  const selectRegion = (value: BooleanOrEmpty) => () =>
    setSearchOptions({
      ...searchOptions,
      is_english: value
    });

  /**
   * Save `skill`
   */
  const selectSkill = (itemValue: SkillType) =>
    setSearchOptions({
      ...searchOptions,
      skill: itemValue
    });

  /**
   * Save `idol`
   */
  const selectIdol = (itemValue: string) =>
    setSearchOptions({
      ...searchOptions,
      idol: itemValue
    });

  /**
   * Render footer of FlatList
   */
  const renderFooter = (
    <View style={[AppStyles.center, styles.margin10]}>
      <Image source={Images.alpaca} />
    </View>
  );

  const renderEmpty = (
    <View style={styles.margin10}>
      <Text style={styles.resetText}>No result</Text>
    </View>
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  const onChangeText = (text: string): void =>
    setSearchOptions({
      ...searchOptions,
      search: text
    });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Surface style={[AppStyles.header, styles.header]}>
        <View style={AppStyles.searchHeader}>
          <TextInput
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            placeholder={'Search event...'}
            style={AppStyles.searchInput}
          />
          <IconButton
            icon={'magnify'}
            onPress={onSearch}
            style={AppStyles.searchButton}
          />
        </View>
        <IconButton icon={'more'} onPress={toggleFilter} />
      </Surface>

      {/* FILTER */}
      {isFilter && (
        <Surface style={styles.filterContainer}>
          <IdolNameRow
            name={searchOptions.idol || ''}
            selectIdol={selectIdol}
          />
          <MainUnitRow
            mainUnit={searchOptions.main_unit || ''}
            selectMainUnit={selectMainUnit}
          />
          <SkillRow
            skill={searchOptions.skill || 'All'}
            selectSkill={selectSkill}
          />
          <AttributeRow
            attribute={searchOptions.attribute || 'All'}
            selectAttribute={selectAttribute}
          />
          <RegionRow
            japanOnly={searchOptions.is_english || ''}
            selectRegion={selectRegion}
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
        contentContainerStyle={styles.content}
        initialNumToRender={6}
        keyExtractor={keyExtractor}
        style={styles.list}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        onEndReached={onEndReached}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.violet,
    flex: 1
  },
  content: {
    alignItems: 'center'
  },
  filterContainer: {
    backgroundColor: Colors.white,
    elevation: 5,
    padding: 10
  },
  header: {
    backgroundColor: Colors.white,
    elevation: 5
  },
  list: {
    padding: Metrics.smallMargin
  },
  margin10: {
    margin: 10
  },
  resetText: {
    ...Fonts.style.white,
    ...Fonts.style.center
  },
  resetView: {
    alignItems: 'stretch',
    backgroundColor: Colors.red,
    justifyContent: 'center',
    marginTop: 10,
    padding: 10
  }
});

export default EventsScreen;
