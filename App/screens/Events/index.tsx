import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Alert,
  Image,
  StyleSheet
} from 'react-native';
import { Text, Button, Appbar, useTheme } from 'react-native-paper';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import EventItem from '~/Components/EventItem';
import RegionRow from '~/Components/RegionRow';
import PickerRow from '~/Components/PickerRow';
import MainUnitRow from '~/Components/MainUnitRow';
import AttributeRow from '~/Components/AttributeRow';
import { Metrics, AppStyles, Images } from '~/Theme';
import LLSIFService from '~/Services/LLSIFService';
import UserContext from '~/Context/UserContext';
import type {
  EventSearchParams,
  EventsScreenProps,
  EventObject,
  AttributeType,
  MainUnitNames,
  BooleanOrEmpty,
  SkillType
} from '~/Utils/types';

/**
 * [Event List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#get-the-list-of-events)
 */
const EventsScreen: React.FC<EventsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { state } = useContext(UserContext);
  const defaultFilter: EventSearchParams = {
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
  const [searchOptions, setSearchOptions] = useState(defaultFilter);
  const onEndReached = _.debounce(onEndReaching, 500);

  useEffect(() => {
    if (searchOptions.page > 0) {
      void getEvents();
    }
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
        eventName: item.japanese_name,
        prevStatusBarColor: colors.card
      });
    };

    return <EventItem item={item} onPress={navigateToEventDetail} />;
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  function onEndReaching() {
    if (searchOptions.page > 0) {
      setSearchOptions({
        ...searchOptions,
        page: searchOptions.page + 1
      });
    }
  }

  /**
   * Get event list
   */
  const getEvents = async () => {
    const params: EventSearchParams = {
      ordering: searchOptions.ordering,
      page_size: searchOptions.page_size,
      page: searchOptions.page
    };
    if (searchOptions.idol !== 'All') params.idol = searchOptions.idol;
    if (searchOptions.skill !== 'All') params.skill = searchOptions.skill;
    let isEnglish = searchOptions.is_english;
    if (isEnglish !== '') {
      if (isEnglish === 'True') isEnglish = 'False';
      else isEnglish = 'True';
      params.is_english = isEnglish;
    }
    if (searchOptions.main_unit !== '')
      params.main_unit = searchOptions.main_unit;
    if (searchOptions.attribute !== '')
      params.attribute = searchOptions.attribute;
    if (searchOptions.search !== '') params.search = searchOptions.search;
    // console.log(`Events.getEvents ${JSON.stringify(theFilter)}`);
    try {
      const result = await LLSIFService.fetchEventList(params);
      if (result === 404) {
        // console.log('LLSIFService.fetchEventList 404');
        setSearchOptions({ ...searchOptions, page: 0 });
      } else if (Array.isArray(result)) {
        let x = [];
        if (searchOptions.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (thing, index, self) =>
            index ===
            self.findIndex((t) => t.japanese_name === thing.japanese_name)
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
      Alert.alert('Error', 'Error when get songs', [{ text: 'OK' }]);
      // console.log('OK Pressed', err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Call when pressing search button
   */
  const onSearch = () => {
    setList([]);
    setIsFilter(false);
    setSearchOptions({ ...searchOptions, page: 1 });
  };

  /**
   * Reset filter
   */
  const resetFilter = () =>
    setSearchOptions({ ...defaultFilter, page: searchOptions.page });

  /**
   * Filter on/off
   */
  const toggleFilter = () => setIsFilter(!isFilter);

  /**
   * Save `attribute`
   */
  const selectAttribute = (value: AttributeType) =>
    setSearchOptions({ ...searchOptions, attribute: value });

  /**
   * Save `main_unit`
   */
  const selectMainUnit = (value: MainUnitNames) =>
    setSearchOptions({ ...searchOptions, main_unit: value });

  /**
   * Save `is_english`
   */
  const selectRegion = (value: BooleanOrEmpty) =>
    setSearchOptions({ ...searchOptions, is_english: value });

  /**
   * Save `skill`
   */
  const selectSkill = (itemValue: SkillType) =>
    setSearchOptions({ ...searchOptions, skill: itemValue });

  /**
   * Save `idol`
   */
  const selectIdol = (itemValue: string) =>
    setSearchOptions({ ...searchOptions, idol: itemValue });

  /**
   * Render footer of FlatList
   */
  const renderFooter = (
    <View style={[AppStyles.center, styles.margin10]}>
      <Image source={Images.alpaca} />
    </View>
  );

  const renderEmpty = (
    <View style={[AppStyles.center, styles.flatListElement]}>
      <Text>{isLoading ? 'Loading' : 'No result'}</Text>
    </View>
  );

  const onChangeText = (text: string) =>
    setSearchOptions({ ...searchOptions, search: text });

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Appbar.Header style={{ backgroundColor: colors.card }}>
        <View style={AppStyles.searchHeader}>
          <TextInput
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            placeholder='Search event...'
            style={AppStyles.searchInput}
          />
        </View>
        <Appbar.Action icon='magnify' onPress={onSearch} />
        <Appbar.Action icon='dots-horizontal' onPress={toggleFilter} />
      </Appbar.Header>

      {/* FILTER */}
      {isFilter && (
        <View
          style={[styles.filterContainer, { backgroundColor: colors.surface }]}>
          <PickerRow
            name='Idol'
            value={searchOptions.idol || 'All'}
            list={state.cachedData.idols}
            onSelect={selectIdol}
          />
          <MainUnitRow
            mainUnit={searchOptions.main_unit || ''}
            selectMainUnit={selectMainUnit}
          />
          <PickerRow
            name='Skill'
            value={searchOptions.skill || 'All'}
            list={state.cachedData.skills}
            onSelect={selectSkill}
          />
          <AttributeRow
            attribute={searchOptions.attribute || ''}
            selectAttribute={selectAttribute}
          />
          <RegionRow
            japanOnly={searchOptions.is_english || ''}
            selectRegion={selectRegion}
          />
          <Button mode='contained' onPress={resetFilter}>
            RESET
          </Button>
        </View>
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
  content: {
    alignItems: 'center'
  },
  filterContainer: {
    padding: 10
  },
  flatListElement: {
    margin: Metrics.baseMargin
  },
  list: {
    padding: Metrics.smallMargin
  },
  margin10: {
    margin: 10
  }
});

export default EventsScreen;
