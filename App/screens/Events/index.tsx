import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {Alert, Image, StatusBar, StyleSheet, View} from 'react-native';
import {Appbar, Button, Searchbar, Text, useTheme} from 'react-native-paper';
import {useImmer} from 'use-immer';
import ConnectStatus from '~/Components/ConnectStatus';
import EventItem from '~/Components/EventItem';
import ImgSelectionRow from '~/Components/ImgSelectionRow';
import PickerRow from '~/Components/PickerRow';
import SelectionRow from '~/Components/SelectionRow';
import Space from '~/Components/space';
import {AttributeData, MainUnitData, RegionData} from '~/Config';
import LLSIFService from '~/Services/LLSIFService';
import {AppStyles, Images, Metrics} from '~/Theme';
import {useStorage} from '~/Utils';
import useStore from '~/store';
import {initAppOptions} from '~/store/init';
import type {MainTabScreenProps} from '~/typings/navigation';

/** Key extractor for FlatList */
const keyExtractor = (item: EventObject) => `event ${item.japanese_name}`;

/**
 * [Event List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#get-the-list-of-events)
 */
const EventsScreen = ({navigation}: MainTabScreenProps<'EventsScreen'>) => {
  const {colors} = useTheme();
  const [settings] = useStorage('settings', initAppOptions);
  const cachedData = useStore(s => s.cachedData);
  const defaultParams: EventSearchParams = {
    ordering: '-beginning',
    page_size: 30,
    page: 1,
    idol: 'All',
    search: '',
    main_unit: '',
    skill: 'All',
    attribute: '',
    is_english: settings.worldwideOnly ? 'False' : '',
  };

  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<EventObject[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchParams, setSearchParams] = useImmer(defaultParams);

  useEffect(() => {
    getEvents(defaultParams);
  }, []);

  /** Render item in FlatList */
  const renderItem = ({item}: {item: EventObject}) => {
    /** Navigate to Event Detail Screen */
    const navigateToEventDetail = () => {
      navigation.navigate('EventDetailScreen', {
        eventName: item.japanese_name,
      });
    };

    return <EventItem item={item} onPress={navigateToEventDetail} />;
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getEvents when no event was found (404).
   */
  const onEndReached = () => {
    if (searchParams.page > 0 && !isLoading) {
      const newSP = {...searchParams, page: searchParams.page + 1};
      setSearchParams(newSP);
      getEvents(newSP);
    }
  };

  /** Get event list */
  const getEvents = async (sp: EventSearchParams) => {
    const params: EventSearchParams = {
      ordering: sp.ordering,
      page_size: sp.page_size,
      page: sp.page,
    };
    if (sp.idol !== 'All') {
      params.idol = sp.idol;
    }
    if (sp.skill !== 'All') {
      params.skill = sp.skill;
    }
    let isEnglish = sp.is_english;
    if (isEnglish !== '') {
      if (isEnglish === 'True') {
        isEnglish = 'False';
      } else {
        isEnglish = 'True';
      }
      params.is_english = isEnglish;
    }
    if (sp.main_unit !== '') {
      params.main_unit = sp.main_unit;
    }
    if (sp.attribute !== '') {
      params.attribute = sp.attribute;
    }
    if (sp.search !== '') {
      params.search = sp.search;
    }
    // console.log(`Events.getEvents ${JSON.stringify(params)}`);
    try {
      setIsLoading(true);
      const result = await LLSIFService.fetchEventList(params);
      if (result === 404) {
        // console.log('LLSIFService.fetchEventList 404');
        setSearchParams({...sp, page: 0});
      } else if (Array.isArray(result)) {
        let x = [];
        if (sp.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (item, index, self) =>
            index ===
            self.findIndex(t => t.japanese_name === item.japanese_name),
        );
        if (x.length === 0) {
          setSearchParams({...sp, page: 0});
        }
        setList(x);
      } else {
        setSearchParams({...sp, page: 0});
        throw new Error('null');
      }
    } catch (err) {
      Alert.alert('Error', 'Error when get songs', [{text: 'OK'}]);
      // console.log('error', err);
    } finally {
      setIsLoading(false);
    }
  };

  /** Call when pressing search button */
  const onSearch = () => {
    setList([]);
    setShowFilter(false);
    setSearchParams({...searchParams, page: 1});
    getEvents({...searchParams, page: 1});
  };

  /** Reset filter */
  const resetFilter = () =>
    setSearchParams({...defaultParams, page: searchParams.page});

  /** Filter on/off */
  const toggleFilter = () => setShowFilter(!showFilter);

  /** Save `attribute` */
  const selectAttribute = (value: Combined) => {
    setSearchParams(draft => {
      draft.attribute = value as AttributeType;
    });
  };

  /** Save `main_unit` */
  const selectMainUnit = (value: Combined) => {
    setSearchParams(draft => {
      draft.main_unit = value as MainUnitNames;
    });
  };

  /** Save `is_english` */
  const selectRegion = (value: CombinedWithBOE) => {
    setSearchParams(draft => {
      draft.is_english = value as BooleanOrEmpty;
    });
  };

  /** Save `skill` */
  const selectSkill = (value: string) => {
    setSearchParams(draft => {
      draft.skill = value as SkillType;
    });
  };

  /** Save `idol` */
  const selectIdol = (value: string) => {
    setSearchParams(draft => {
      draft.idol = value;
    });
  };

  const renderEmpty = (
    <View style={[AppStyles.center, styles.flatListElement]}>
      <Text>{isLoading ? 'Loading' : 'No result'}</Text>
    </View>
  );

  const onChangeText = (text: string) => {
    setSearchParams(draft => {
      draft.search = text;
    });
  };

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Appbar.Header
        statusBarHeight={StatusBar.currentHeight}
        style={{backgroundColor: colors.card}}>
        <View style={AppStyles.searchHeader}>
          <Searchbar
            placeholder="Search event..."
            style={AppStyles.noElevation}
            value={searchParams.search || ''}
            onChangeText={onChangeText}
            onIconPress={onSearch}
            onSubmitEditing={onSearch}
          />
        </View>
        <Appbar.Action icon="dots-horizontal" onPress={toggleFilter} />
      </Appbar.Header>

      {/* FILTER */}
      {showFilter && (
        <View
          style={[styles.filterContainer, {backgroundColor: colors.surface}]}>
          <PickerRow
            list={cachedData.idols}
            name="Idol"
            value={searchParams.idol || 'All'}
            onSelect={selectIdol}
          />
          <ImgSelectionRow
            data={MainUnitData}
            setValue={selectMainUnit}
            title="Main unit"
            value={searchParams.main_unit || ''}
          />
          <PickerRow
            list={cachedData.skills}
            name="Skill"
            value={searchParams.skill || 'All'}
            onSelect={selectSkill}
          />
          <ImgSelectionRow
            data={AttributeData}
            setValue={selectAttribute}
            title="Attribute"
            value={searchParams.attribute || ''}
          />
          <SelectionRow
            data={RegionData}
            setValue={selectRegion}
            title="Region"
            value={searchParams.is_english || ''}
          />
          <Button mode="contained" onPress={resetFilter}>
            RESET
          </Button>
        </View>
      )}
      <ConnectStatus />
      {/* LIST */}
      <FlashList
        contentContainerStyle={styles.list}
        data={list}
        estimatedItemSize={100}
        ItemSeparatorComponent={Space}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
        onEndReached={onEndReached}
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
    paddingVertical: Metrics.smallMargin,
  },
});

/** Render footer of FlatList */
const renderFooter = (
  <View style={[AppStyles.center, styles.flatListElement]}>
    <Image source={Images.alpaca} />
  </View>
);

export default EventsScreen;
