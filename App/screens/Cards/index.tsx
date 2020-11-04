import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
  Image,
  StyleSheet
} from 'react-native';
import { Text, Button, Appbar, Surface, FAB } from 'react-native-paper';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import YearRow from '~/Components/YearRow';
import CardItem from '~/Components/CardItem';
import EventRow from '~/Components/EventRow';
import SkillRow from '~/Components/SkillRow';
import RarityRow from '~/Components/RarityRow';
import RegionRow from '~/Components/RegionRow';
import SchoolRow from '~/Components/SchoolRow';
import SubUnitRow from '~/Components/SubUnitRow';
import IdolNameRow from '~/Components/IdolNameRow';
import MainUnitRow from '~/Components/MainUnitRow';
import OrderingRow from '~/Components/OrderingRow';
import AttributeRow from '~/Components/AttributeRow';
import PromoCardRow from '~/Components/PromoCardRow';
import Card2PicsItem from '~/Components/Card2PicsItem';
import SpecialCardRow from '~/Components/SpecialCardRow';
import LLSIFService from '~/Services/LLSIFService';
import LoadingScreen from '../Loading';
import { Metrics, Colors, AppStyles, Images } from '~/Theme';
import UserContext from '~/Context/UserContext';
import { OrderingGroup } from '~/Config';
import type {
  AttributeType,
  BooleanOrEmpty,
  CardObject,
  CardsScreenProps,
  MainUnitNames,
  RarityType,
  SkillType,
  YearType
} from '~/Utils/types';

type FilterType = {
  search?: string; // Keyword for search
  selectedOrdering?: string; // Selected ordering option {label: string, value: string}
  isReverse?: boolean; // Is reverse (boolean)
  page_size: number; // Number of object per API call
  page: number; // Page number
  name?: string; // Idol name
  rarity?: RarityType; // Rarity (None, N, R, SR, SSR, UR)
  attribute?: AttributeType; // Attribute (None, Smile, Pure, Cool, All)
  japan_only?: BooleanOrEmpty; // Japan only (None, False, True)
  is_promo?: BooleanOrEmpty; // Is promo (None, True, False)
  is_special?: BooleanOrEmpty; // Is special (None, True, False)
  is_event?: BooleanOrEmpty; // Is event (None, True, False)
  skill?: SkillType; // Skill name
  idol_main_unit?: MainUnitNames; // Main unit (None, μ's, Aqours)
  idol_sub_unit?: string; // Sub unit
  idol_school?: string; // School name
  idol_year?: YearType; // Year (None, First, Second, Third)
  ordering?: string;
};

/**
 * [Card List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#get-the-list-of-cards)
 *
 * State:
 * - `isLoading`: Loading state
 * - `list`: Data for FlatList
 * - `isFilter`: Filter on/off
 * - `stopSearch`: Prevent calling API
 *
 */
const CardsScreen: React.FC<CardsScreenProps> = ({ navigation }) => {
  const { state } = useContext(UserContext);
  const defaultFilter: FilterType = {
    search: '',
    selectedOrdering: OrderingGroup.CARD[1].value,
    isReverse: true,
    page_size: 30,
    page: 1,
    name: 'All',
    rarity: '',
    attribute: '',
    japan_only: state.options.worldwideOnly ? 'False' : '',
    is_promo: '',
    is_special: '',
    is_event: '',
    skill: 'All',
    idol_main_unit: '',
    idol_sub_unit: 'All',
    idol_school: 'All',
    idol_year: ''
  };
  const [isLoading, setIsLoading] = useState(true);
  const [searchOptions, setSearchOptions] = useState(defaultFilter);
  const [column, setColumn] = useState(2);
  const [list, setList] = useState<CardObject[]>([]);
  const [isFilter, setIsFilter] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const onEndReached = _.debounce(onEndReaching, 1000);

  useEffect(() => {
    void getCards();
  }, [searchOptions.page]);

  /**
   * Key extractor in FlatList
   */
  const keyExtractor = (item: CardObject) => `card ${item.id}`;

  /**
   * Render item in FlatList
   */
  const renderItem = ({ item }: { item: CardObject }) => {
    /**
     * Navigate to Card Detail Screen
     */
    const navigateToCardDetail = () => {
      navigation.navigate('CardDetailScreen', { item });
    };

    if (column === 1) {
      return <Card2PicsItem item={item} onPress={navigateToCardDetail} />;
    }
    return <CardItem item={item} onPress={navigateToCardDetail} />;
  };

  /**
   * Get card list
   */
  async function getCards() {
    const ordering =
      (searchOptions?.isReverse ? '-' : '') +
      (searchOptions.selectedOrdering || '');
    const theFilter: FilterType = {
      ordering,
      page_size: searchOptions.page_size,
      page: searchOptions.page
    };
    if (searchOptions.attribute !== '')
      theFilter.attribute = searchOptions.attribute;
    if (searchOptions.idol_main_unit !== '')
      theFilter.idol_main_unit = searchOptions.idol_main_unit;
    if (searchOptions.idol_sub_unit !== 'All')
      theFilter.idol_sub_unit = searchOptions.idol_sub_unit;
    if (searchOptions.idol_school !== 'All')
      theFilter.idol_school = searchOptions.idol_school;
    if (searchOptions.name !== 'All') theFilter.name = searchOptions.name;
    if (searchOptions.skill !== 'All') theFilter.skill = searchOptions.skill;
    if (searchOptions.is_event !== '')
      theFilter.is_event = searchOptions.is_event;
    if (searchOptions.is_promo !== '')
      theFilter.is_promo = searchOptions.is_promo;
    if (searchOptions.japan_only !== '')
      theFilter.japan_only = searchOptions.japan_only;
    if (searchOptions.idol_year !== '')
      theFilter.idol_year = searchOptions.idol_year;
    if (searchOptions.is_special !== '')
      theFilter.is_special = searchOptions.is_special;
    if (searchOptions.rarity !== '') theFilter.rarity = searchOptions.rarity;
    if (searchOptions.search !== '') theFilter.search = searchOptions.search;
    // console.log(`Cards.getCards: ${JSON.stringify(theFilter)}`);
    try {
      const result = await LLSIFService.fetchCardList(theFilter);
      if (result === 404) {
        // console.log('LLSIFService.fetchCardList 404');
        setStopSearch(true);
      } else if (Array.isArray(result)) {
        let x = [...list, ...result];
        x = x.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t.id === thing.id)
        );
        setList(x);
      } else {
        throw Error('null');
      }
    } catch (err) {
      console.log('OK Pressed', err);
      Alert.alert('Error', 'Error when get cards', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Call when pressing search button
   */
  const onSearch = () => {
    setList([]);
    setIsFilter(false);
    setStopSearch(false);
    void getCards();
  };

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  function onEndReaching() {
    if (stopSearch) return;
    setSearchOptions({
      ...searchOptions,
      page: (searchOptions.page || 1) + 1
    });
  }

  /**
   * Filter on/off
   */
  const toggleFilter = () => {
    setIsFilter(!isFilter);
  };

  /**
   * Reverse search on/off
   */
  const toggleReverse = () => {
    setSearchOptions({
      ...searchOptions,
      isReverse: !searchOptions.isReverse
    });
  };

  /**
   * Switch 1 column and 2 columns
   */
  const switchColumn = () => {
    setColumn(column === 1 ? 2 : 1);
  };

  /**
   * Save is_promo
   */
  const selectPromo = (value: BooleanOrEmpty) => () => {
    setSearchOptions({
      ...searchOptions,
      is_promo: value
    });
  };

  /**
   * Save is_special
   */
  const selectSpecial = (value: BooleanOrEmpty) => () => {
    setSearchOptions({
      ...searchOptions,
      is_special: value
    });
  };

  /**
   * Save is_event
   */
  const selectEvent = (value: BooleanOrEmpty) => () => {
    setSearchOptions({
      ...searchOptions,
      is_event: value
    });
  };

  /**
   * Save idol_main_unit
   */
  const selectMainUnit = (value: MainUnitNames) => () => {
    setSearchOptions({
      ...searchOptions,
      idol_main_unit: value
    });
  };

  /**
   * Save rarity
   */
  const selectRarity = (value: RarityType) => () => {
    setSearchOptions({
      ...searchOptions,
      rarity: value
    });
  };

  /**
   * Save attribute
   */
  const selectAttribute = (value: AttributeType) => () => {
    setSearchOptions({
      ...searchOptions,
      attribute: value
    });
  };

  /**
   * Save idol_year
   */
  const selectYear = (value: YearType) => () =>
    setSearchOptions({
      ...searchOptions,
      idol_year: value
    });

  /**
   * Save region
   */
  const selectRegion = (value: BooleanOrEmpty) => () => {
    setSearchOptions({
      ...searchOptions,
      japan_only: value
    });
  };

  /**
   * Save idol_sub_unit
   */
  const selectSubUnit = (itemValue: string) => {
    setSearchOptions({
      ...searchOptions,
      idol_sub_unit: itemValue
    });
  };

  /**
   * Save idol name
   */
  const selectIdol = (itemValue: string) => {
    setSearchOptions({
      ...searchOptions,
      name: itemValue
    });
  };

  /**
   * Save school
   */
  const selectSchool = (itemValue: string) => {
    setSearchOptions({
      ...searchOptions,
      idol_school: itemValue
    });
  };

  /**
   * Save skill
   */
  const selectSkill = (itemValue: SkillType) => {
    setSearchOptions({
      ...searchOptions,
      skill: itemValue
    });
  };

  /**
   * Save ordering
   */
  const selectOrdering = (itemValue: string) => {
    setSearchOptions({
      ...searchOptions,
      selectedOrdering: itemValue
    });
  };

  /**
   * Reset filter variables
   */
  const resetFilter = () => {
    setSearchOptions(defaultFilter);
  };

  /**
   * Render footer of FlatList
   */
  const renderFooter = (
    <View style={[AppStyles.center, styles.flatListElement]}>
      <Image source={Images.alpaca} />
    </View>
  );

  const renderEmpty = (
    <View style={styles.flatListElement}>
      <Text>No result</Text>
    </View>
  );

  const onChangeText = (text: string): void =>
    setSearchOptions({
      ...searchOptions,
      search: text
    });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={AppStyles.screen}>
      {/* HEADER */}
      <Appbar.Header>
        <View style={AppStyles.searchHeader}>
          <TextInput
            onChangeText={onChangeText}
            onSubmitEditing={onSearch}
            placeholder='Search card...'
            style={AppStyles.searchInput}
          />
        </View>
        <Appbar.Action icon='magnify' onPress={onSearch} />
        <Appbar.Action icon='dots-horizontal' onPress={toggleFilter} />
      </Appbar.Header>

      {/* FILTER */}
      {isFilter && (
        <Surface style={styles.filterContainer}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <IdolNameRow
              name={searchOptions.name || ''}
              selectIdol={selectIdol}
            />
            <RarityRow
              rarity={searchOptions.rarity || ''}
              selectRarity={selectRarity}
            />
            <AttributeRow
              attribute={searchOptions.attribute || 'All'}
              selectAttribute={selectAttribute}
            />
            <RegionRow
              japanOnly={searchOptions.japan_only || ''}
              selectRegion={selectRegion}
            />
            <PromoCardRow
              isPromo={searchOptions.is_promo || ''}
              selectPromo={selectPromo}
            />
            <SpecialCardRow
              isSpecial={searchOptions.is_special || ''}
              selectSpecial={selectSpecial}
            />
            <EventRow
              isEvent={searchOptions.is_event || ''}
              selectEvent={selectEvent}
            />
            <SkillRow
              skill={searchOptions.skill || 'All'}
              selectSkill={selectSkill}
            />
            <MainUnitRow
              mainUnit={searchOptions.idol_main_unit || ''}
              selectMainUnit={selectMainUnit}
            />
            <SubUnitRow
              idolSubUnit={searchOptions.idol_sub_unit || ''}
              selectSubUnit={selectSubUnit}
            />
            <SchoolRow
              idolSchool={searchOptions.idol_school || ''}
              selectSchool={selectSchool}
            />
            <YearRow
              idolYear={searchOptions.idol_year || ''}
              selectYear={selectYear}
            />
            <OrderingRow
              orderingItem={OrderingGroup.CARD}
              selectedOrdering={searchOptions.selectedOrdering}
              selectOrdering={selectOrdering}
              isReverse={searchOptions.isReverse || false}
              toggleReverse={toggleReverse}
            />

            {/* RESET BUTTON */}
            <Button mode='contained' onPress={resetFilter}>
              RESET
            </Button>
          </ScrollView>
        </Surface>
      )}
      <ConnectStatus />
      {/* LIST */}
      <FlatList
        data={list}
        key={`${column}c`}
        showsVerticalScrollIndicator={false}
        numColumns={column}
        initialNumToRender={8}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        style={styles.list}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
      />
      <FAB icon='calendar' onPress={switchColumn} style={styles.fab} />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: Metrics.baseMargin
  },
  fab: {
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0
  },
  filterContainer: {
    backgroundColor: Colors.white,
    elevation: 5,
    height: Metrics.screenHeight * 0.35
  },
  flatListElement: {
    margin: Metrics.baseMargin
  },
  list: {
    padding: Metrics.smallMargin
  }
});

export default CardsScreen;
