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
import { Text, Button, Appbar, FAB, useTheme } from 'react-native-paper';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import YearRow from '~/Components/YearRow';
import CardItem from '~/Components/CardItem';
import EventRow from '~/Components/EventRow';
import RarityRow from '~/Components/RarityRow';
import RegionRow from '~/Components/RegionRow';
import PickerRow from '~/Components/PickerRow';
import MainUnitRow from '~/Components/MainUnitRow';
import OrderingRow from '~/Components/OrderingRow';
import AttributeRow from '~/Components/AttributeRow';
import PromoCardRow from '~/Components/PromoCardRow';
import Card2PicsItem from '~/Components/Card2PicsItem';
import SpecialCardRow from '~/Components/SpecialCardRow';
import LLSIFService from '~/Services/LLSIFService';
import { Metrics, AppStyles, Images } from '~/Theme';
import UserContext from '~/Context/UserContext';
import { OrderingGroup } from '~/Config';
import type {
  AttributeType,
  BooleanOrEmpty,
  CardObject,
  CardSearchParams,
  CardsScreenProps,
  MainUnitNames,
  RarityType,
  SkillType,
  YearType
} from '~/Utils/types';

/**
 * [Card List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#get-the-list-of-cards)
 */
const CardsScreen: React.FC<CardsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { state } = useContext(UserContext);
  const defaultFilter: CardSearchParams = {
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

  useEffect(() => {
    if (searchOptions.page > 0) {
      void getCards();
    }
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
      navigation.navigate('CardDetailScreen', {
        item,
        prevStatusBarColor: colors.card
      });
    };

    if (column === 1) {
      return <Card2PicsItem item={item} onPress={navigateToCardDetail} />;
    }
    return <CardItem item={item} onPress={navigateToCardDetail} />;
  };

  /**
   * Get card list
   */
  const getCards = async () => {
    const ordering =
      (searchOptions?.isReverse ? '-' : '') +
      (searchOptions.selectedOrdering || '');
    const params: CardSearchParams = {
      ordering,
      page_size: searchOptions.page_size,
      page: searchOptions.page
    };
    if (searchOptions.attribute !== '')
      params.attribute = searchOptions.attribute;
    if (searchOptions.idol_main_unit !== '')
      params.idol_main_unit = searchOptions.idol_main_unit;
    if (searchOptions.idol_sub_unit !== 'All')
      params.idol_sub_unit = searchOptions.idol_sub_unit;
    if (searchOptions.idol_school !== 'All')
      params.idol_school = searchOptions.idol_school;
    if (searchOptions.name !== 'All') params.name = searchOptions.name;
    if (searchOptions.skill !== 'All') params.skill = searchOptions.skill;
    if (searchOptions.is_event !== '') params.is_event = searchOptions.is_event;
    if (searchOptions.is_promo !== '') params.is_promo = searchOptions.is_promo;
    if (searchOptions.japan_only !== '')
      params.japan_only = searchOptions.japan_only;
    if (searchOptions.idol_year !== '')
      params.idol_year = searchOptions.idol_year;
    if (searchOptions.is_special !== '')
      params.is_special = searchOptions.is_special;
    if (searchOptions.rarity !== '') params.rarity = searchOptions.rarity;
    if (searchOptions.search !== '') params.search = searchOptions.search;
    // console.log(`Cards.getCards: ${JSON.stringify(theFilter)}`);
    try {
      setIsLoading(true);
      const result = await LLSIFService.fetchCardList(params);
      if (result === 404) {
        // console.log('LLSIFService.fetchCardList 404');
        setSearchOptions({ ...searchOptions, page: 0 });
      } else if (Array.isArray(result)) {
        let x = [];
        if (searchOptions.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (card, index, self) =>
            index === self.findIndex((t) => t.id === card.id)
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
      Alert.alert('Error', 'Error when get cards', [{ text: 'OK' }]);
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
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  const onEndReaching = () => {
    if (searchOptions.page > 0) {
      setSearchOptions({
        ...searchOptions,
        page: searchOptions.page + 1
      });
    }
  };

  const onEndReached = _.debounce(onEndReaching, 1000);

  /**
   * Filter on/off
   */
  const toggleFilter = () => setIsFilter(!isFilter);

  /**
   * Reverse search on/off
   */
  const toggleReverse = () =>
    setSearchOptions({ ...searchOptions, isReverse: !searchOptions.isReverse });

  /**
   * Switch 1 column and 2 columns
   */
  const switchColumn = () => setColumn(column === 1 ? 2 : 1);

  /**
   * Save is_promo
   */
  const selectPromo = (value: BooleanOrEmpty) =>
    setSearchOptions({ ...searchOptions, is_promo: value });

  /**
   * Save is_special
   */
  const selectSpecial = (value: BooleanOrEmpty) =>
    setSearchOptions({ ...searchOptions, is_special: value });

  /**
   * Save is_event
   */
  const selectEvent = (value: BooleanOrEmpty) =>
    setSearchOptions({ ...searchOptions, is_event: value });

  /**
   * Save idol_main_unit
   */
  const selectMainUnit = (value: MainUnitNames) =>
    setSearchOptions({ ...searchOptions, idol_main_unit: value });

  /**
   * Save rarity
   */
  const selectRarity = (value: RarityType) =>
    setSearchOptions({ ...searchOptions, rarity: value });

  /**
   * Save attribute
   */
  const selectAttribute = (value: AttributeType) =>
    setSearchOptions({ ...searchOptions, attribute: value });

  /**
   * Save idol_year
   */
  const selectYear = (value: YearType) =>
    setSearchOptions({ ...searchOptions, idol_year: value });

  /**
   * Save region
   */
  const selectRegion = (value: BooleanOrEmpty) =>
    setSearchOptions({ ...searchOptions, japan_only: value });

  /**
   * Save idol_sub_unit
   */
  const selectSubUnit = (itemValue: string) =>
    setSearchOptions({ ...searchOptions, idol_sub_unit: itemValue });

  /**
   * Save idol name
   */
  const selectIdol = (itemValue: string) =>
    setSearchOptions({ ...searchOptions, name: itemValue });

  /**
   * Save school
   */
  const selectSchool = (itemValue: string) =>
    setSearchOptions({ ...searchOptions, idol_school: itemValue });

  /**
   * Save skill
   */
  const selectSkill = (itemValue: SkillType) =>
    setSearchOptions({ ...searchOptions, skill: itemValue });

  /**
   * Save ordering
   */
  const selectOrdering = (value: string) =>
    setSearchOptions({ ...searchOptions, selectedOrdering: value });

  /**
   * Reset filter variables
   */
  const resetFilter = () =>
    setSearchOptions({ ...defaultFilter, page: searchOptions.page });

  /**
   * Render footer of FlatList
   */
  const renderFooter = (
    <View style={[AppStyles.center, styles.flatListElement]}>
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
            placeholder='Search card...'
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
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <PickerRow
              name='Idol'
              list={state.cachedData.idols}
              value={searchOptions.name || ''}
              onSelect={selectIdol}
            />
            <RarityRow
              rarity={searchOptions.rarity || ''}
              selectRarity={selectRarity}
            />
            <AttributeRow
              attribute={searchOptions.attribute || ''}
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
            <PickerRow
              name='Skill'
              value={searchOptions.skill || 'All'}
              list={state.cachedData.skills}
              onSelect={selectSkill}
            />
            <MainUnitRow
              mainUnit={searchOptions.idol_main_unit || ''}
              selectMainUnit={selectMainUnit}
            />
            <PickerRow
              name='Subunit'
              value={searchOptions.idol_sub_unit || ''}
              list={state.cachedData.subUnits}
              onSelect={selectSubUnit}
            />
            <PickerRow
              name='School'
              value={searchOptions.idol_school || ''}
              list={state.cachedData.schools}
              onSelect={selectSchool}
            />
            <YearRow
              idolYear={searchOptions.idol_year || ''}
              selectYear={selectYear}
            />
            <OrderingRow
              list={OrderingGroup.CARD}
              selectedItem={
                searchOptions.selectedOrdering || OrderingGroup.CARD[1].value
              }
              onSelect={selectOrdering}
              isReverse={searchOptions.isReverse || false}
              toggleReverse={toggleReverse}
            />

            {/* RESET BUTTON */}
            <Button mode='contained' onPress={resetFilter}>
              RESET
            </Button>
          </ScrollView>
        </View>
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
      <FAB
        icon={column === 1 ? 'view-grid' : 'view-agenda'}
        onPress={switchColumn}
        style={styles.fab}
      />
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
