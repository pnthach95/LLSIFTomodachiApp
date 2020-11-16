import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Alert, Image, StyleSheet } from 'react-native';
import { Text, Button, Appbar, Searchbar, useTheme } from 'react-native-paper';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import EventItem from '~/Components/EventItem';
import SelectionRow from '~/Components/SelectionRow';
import PickerRow from '~/Components/PickerRow';
import ImgSelectionRow from '~/Components/ImgSelectionRow';
import { Metrics, AppStyles, Images } from '~/Theme';
import LLSIFService from '~/Services/LLSIFService';
import UserContext from '~/Context/UserContext';
import { AttributeData, MainUnitData, RegionData } from '~/Config';
import type {
  EventSearchParams,
  EventsScreenProps,
  EventObject,
  AttributeType,
  MainUnitNames,
  BooleanOrEmpty,
  SkillType,
  Combined,
  CombinedWithBOE,
} from '~/Utils/types';

/**
 * [Event List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#get-the-list-of-events)
 */
const EventsScreen: React.FC<EventsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { state } = useContext(UserContext);
  const defaultParams: EventSearchParams = {
    ordering: '-beginning',
    page_size: 30,
    page: 1,
    idol: 'All',
    search: '',
    main_unit: '',
    skill: 'All',
    attribute: '',
    is_english: state.options.worldwideOnly ? 'False' : '',
  };

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<EventObject[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useState(defaultParams);
  const [runSearch, setRunSearch] = useState(0);

  useEffect(() => {
    if (searchParams.page > 0) {
      void getEvents();
    }
  }, [searchParams.page, runSearch]);

  /** Key extractor for FlatList */
  const keyExtractor = (item: EventObject) => `event ${item.japanese_name}`;

  /** Render item in FlatList */
  const renderItem = ({ item }: { item: EventObject }) => {
    /** Navigate to Event Detail Screen */
    const navigateToEventDetail = () => {
      navigation.navigate('EventDetailScreen', {
        eventName: item.japanese_name,
        prevStatusBarColor: colors.card,
      });
    };

    return <EventItem item={item} onPress={navigateToEventDetail} />;
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getEvents when no event was found (404).
   */
  const onEndReaching = () => {
    if (searchParams.page > 0) {
      setSearchParams({ ...searchParams, page: searchParams.page + 1 });
    }
  };

  const onEndReached = _.debounce(onEndReaching, 500);

  /** Get event list */
  const getEvents = async () => {
    const params: EventSearchParams = {
      ordering: searchParams.ordering,
      page_size: searchParams.page_size,
      page: searchParams.page,
    };
    if (searchParams.idol !== 'All') params.idol = searchParams.idol;
    if (searchParams.skill !== 'All') params.skill = searchParams.skill;
    let isEnglish = searchParams.is_english;
    if (isEnglish !== '') {
      if (isEnglish === 'True') isEnglish = 'False';
      else isEnglish = 'True';
      params.is_english = isEnglish;
    }
    if (searchParams.main_unit !== '')
      params.main_unit = searchParams.main_unit;
    if (searchParams.attribute !== '')
      params.attribute = searchParams.attribute;
    if (searchParams.search !== '') params.search = searchParams.search;
    // console.log(`Events.getEvents ${JSON.stringify(params)}`);
    try {
      setIsLoading(true);
      const result = await LLSIFService.fetchEventList(params);
      if (result === 404) {
        // console.log('LLSIFService.fetchEventList 404');
        setSearchParams({ ...searchParams, page: 0 });
      } else if (Array.isArray(result)) {
        let x = [];
        if (searchParams.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (thing, index, self) =>
            index ===
            self.findIndex((t) => t.japanese_name === thing.japanese_name),
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
      Alert.alert('Error', 'Error when get songs', [{ text: 'OK' }]);
      // console.log('error', err);
    } finally {
      setIsLoading(false);
    }
  };

  /** Call when pressing search button */
  const onSearch = () => {
    setList([]);
    setShowFilter(false);
    if (searchParams.page === 1) {
      setRunSearch(runSearch + 1);
    }
    setSearchParams({ ...searchParams, page: 1 });
  };

  /** Reset filter */
  const resetFilter = () =>
    setSearchParams({ ...defaultParams, page: searchParams.page });

  /** Filter on/off */
  const toggleFilter = () => setShowFilter(!showFilter);

  /** Save `attribute` */
  const selectAttribute = (value: Combined) =>
    setSearchParams({ ...searchParams, attribute: value as AttributeType });

  /** Save `main_unit` */
  const selectMainUnit = (value: Combined) =>
    setSearchParams({ ...searchParams, main_unit: value as MainUnitNames });

  /** Save `is_english` */
  const selectRegion = (value: CombinedWithBOE) =>
    setSearchParams({ ...searchParams, is_english: value as BooleanOrEmpty });

  /** Save `skill` */
  const selectSkill = (value: string) =>
    setSearchParams({ ...searchParams, skill: value as SkillType });

  /** Save `idol` */
  const selectIdol = (value: string) =>
    setSearchParams({ ...searchParams, idol: value });

  /** Render footer of FlatList */
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
    setSearchParams({ ...searchParams, search: text });

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Appbar.Header style={{ backgroundColor: colors.card }}>
        <View style={AppStyles.searchHeader}>
          <Searchbar
            value={searchParams.search || ''}
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            onIconPress={onSearch}
            placeholder='Search event...'
            style={AppStyles.noElevation}
          />
        </View>
        <Appbar.Action icon='dots-horizontal' onPress={toggleFilter} />
      </Appbar.Header>

      {/* FILTER */}
      {showFilter && (
        <View
          style={[styles.filterContainer, { backgroundColor: colors.surface }]}>
          <PickerRow
            name='Idol'
            value={searchParams.idol || 'All'}
            list={state.cachedData.idols}
            onSelect={selectIdol}
          />
          <ImgSelectionRow
            title='Main unit'
            data={MainUnitData}
            value={searchParams.main_unit || ''}
            setValue={selectMainUnit}
          />
          <PickerRow
            name='Skill'
            value={searchParams.skill || 'All'}
            list={state.cachedData.skills}
            onSelect={selectSkill}
          />
          <ImgSelectionRow
            title='Attribute'
            data={AttributeData}
            value={searchParams.attribute || ''}
            setValue={selectAttribute}
          />
          <SelectionRow
            title='Region'
            data={RegionData}
            value={searchParams.is_english || ''}
            setValue={selectRegion}
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
    alignItems: 'center',
  },
  filterContainer: {
    padding: 10,
  },
  flatListElement: {
    margin: Metrics.baseMargin,
  },
  list: {
    padding: Metrics.smallMargin,
  },
  margin10: {
    margin: 10,
  },
});

export default EventsScreen;
