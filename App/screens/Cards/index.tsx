import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  FlatList,
  Alert,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {
  Text,
  Button,
  Appbar,
  FAB,
  Searchbar,
  useTheme,
} from 'react-native-paper';
import { responsiveHeight } from 'react-native-responsive-dimensions';
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
  YearType,
} from '~/Utils/types';

/**
 * [Card List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#get-the-list-of-cards)
 */
const CardsScreen: React.FC<CardsScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const { state } = useContext(UserContext);
  const defaultParams: CardSearchParams = {
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
    idol_year: '',
  };
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState(defaultParams);
  const [column, setColumn] = useState(2);
  const [list, setList] = useState<CardObject[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [runSearch, setRunSearch] = useState(0);

  useEffect(() => {
    if (searchParams.page > 0) {
      void getCards();
    }
  }, [searchParams.page, runSearch]);

  /** Key extractor in FlatList */
  const keyExtractor = (item: CardObject) => `card ${item.id}`;

  /** Render item in FlatList */
  const renderItem = ({ item }: { item: CardObject }) => {
    /** Navigate to Card Detail Screen */
    const navigateToCardDetail = () => {
      navigation.navigate('CardDetailScreen', {
        item,
        prevStatusBarColor: colors.card,
      });
    };

    if (column === 1) {
      return <Card2PicsItem item={item} onPress={navigateToCardDetail} />;
    }
    return <CardItem item={item} onPress={navigateToCardDetail} />;
  };

  /** Get card list */
  const getCards = async () => {
    const ordering =
      (searchParams?.isReverse ? '-' : '') +
      (searchParams.selectedOrdering || '');
    const params: CardSearchParams = {
      ordering,
      page_size: searchParams.page_size,
      page: searchParams.page,
    };
    if (searchParams.attribute !== '')
      params.attribute = searchParams.attribute;
    if (searchParams.idol_main_unit !== '')
      params.idol_main_unit = searchParams.idol_main_unit;
    if (searchParams.idol_sub_unit !== 'All')
      params.idol_sub_unit = searchParams.idol_sub_unit;
    if (searchParams.idol_school !== 'All')
      params.idol_school = searchParams.idol_school;
    if (searchParams.name !== 'All') params.name = searchParams.name;
    if (searchParams.skill !== 'All') params.skill = searchParams.skill;
    if (searchParams.is_event !== '') params.is_event = searchParams.is_event;
    if (searchParams.is_promo !== '') params.is_promo = searchParams.is_promo;
    if (searchParams.japan_only !== '')
      params.japan_only = searchParams.japan_only;
    if (searchParams.idol_year !== '')
      params.idol_year = searchParams.idol_year;
    if (searchParams.is_special !== '')
      params.is_special = searchParams.is_special;
    if (searchParams.rarity !== '') params.rarity = searchParams.rarity;
    if (searchParams.search !== '') params.search = searchParams.search;
    // console.log(`Cards.getCards: ${JSON.stringify(theFilter)}`);
    try {
      setIsLoading(true);
      const result = await LLSIFService.fetchCardList(params);
      if (result === 404) {
        // console.log('LLSIFService.fetchCardList 404');
        setSearchParams({ ...searchParams, page: 0 });
      } else if (Array.isArray(result)) {
        let x = [];
        if (searchParams.page === 1) {
          x = [...result];
        } else {
          x = [...list, ...result];
        }
        x = x.filter(
          (card, index, self) =>
            index === self.findIndex((t) => t.id === card.id),
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
      // console.log('OK Pressed', err);
      Alert.alert('Error', 'Error when get cards', [{ text: 'OK' }]);
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

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   */
  const onEndReaching = () => {
    if (searchParams.page > 0) {
      setSearchParams({ ...searchParams, page: searchParams.page + 1 });
    }
  };

  const onEndReached = _.debounce(onEndReaching, 1000);

  /** Filter on/off */
  const toggleFilter = () => setShowFilter(!showFilter);

  /** Reverse search on/off */
  const toggleReverse = () =>
    setSearchParams({ ...searchParams, isReverse: !searchParams.isReverse });

  /** Switch 1 column and 2 columns */
  const switchColumn = () => setColumn(column === 1 ? 2 : 1);

  /** Save is_promo */
  const selectPromo = (value: BooleanOrEmpty) =>
    setSearchParams({ ...searchParams, is_promo: value });

  /** Save is_special */
  const selectSpecial = (value: BooleanOrEmpty) =>
    setSearchParams({ ...searchParams, is_special: value });

  /** Save is_event */
  const selectEvent = (value: BooleanOrEmpty) =>
    setSearchParams({ ...searchParams, is_event: value });

  /** Save idol_main_unit */
  const selectMainUnit = (value: MainUnitNames) =>
    setSearchParams({ ...searchParams, idol_main_unit: value });

  /** Save rarity */
  const selectRarity = (value: RarityType) =>
    setSearchParams({ ...searchParams, rarity: value });

  /** Save attribute */
  const selectAttribute = (value: AttributeType) =>
    setSearchParams({ ...searchParams, attribute: value });

  /** Save idol_year */
  const selectYear = (value: YearType) =>
    setSearchParams({ ...searchParams, idol_year: value });

  /** Save region */
  const selectRegion = (value: BooleanOrEmpty) =>
    setSearchParams({ ...searchParams, japan_only: value });

  /** Save idol_sub_unit */
  const selectSubUnit = (itemValue: string) =>
    setSearchParams({ ...searchParams, idol_sub_unit: itemValue });

  /** Save idol name */
  const selectIdol = (itemValue: string) =>
    setSearchParams({ ...searchParams, name: itemValue });

  /** Save school */
  const selectSchool = (itemValue: string) =>
    setSearchParams({ ...searchParams, idol_school: itemValue });

  /** Save skill */
  const selectSkill = (itemValue: SkillType) =>
    setSearchParams({ ...searchParams, skill: itemValue });

  /** Save ordering */
  const selectOrdering = (value: string) =>
    setSearchParams({ ...searchParams, selectedOrdering: value });

  /** Reset filter variables */
  const resetFilter = () =>
    setSearchParams({ ...defaultParams, page: searchParams.page });

  /** Render footer of FlatList */
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
            placeholder='Search card...'
            style={AppStyles.noElevation}
          />
        </View>
        <Appbar.Action icon='dots-horizontal' onPress={toggleFilter} />
      </Appbar.Header>

      {/* FILTER */}
      {showFilter && (
        <View
          style={[styles.filterContainer, { backgroundColor: colors.surface }]}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <PickerRow
              name='Idol'
              list={state.cachedData.idols}
              value={searchParams.name || ''}
              onSelect={selectIdol}
            />
            <RarityRow
              value={searchParams.rarity || ''}
              setValue={selectRarity}
            />
            <AttributeRow
              value={searchParams.attribute || ''}
              setValue={selectAttribute}
            />
            <RegionRow
              value={searchParams.japan_only || ''}
              setValue={selectRegion}
            />
            <PromoCardRow
              value={searchParams.is_promo || ''}
              setValue={selectPromo}
            />
            <SpecialCardRow
              value={searchParams.is_special || ''}
              setValue={selectSpecial}
            />
            <EventRow
              value={searchParams.is_event || ''}
              setValue={selectEvent}
            />
            <PickerRow
              name='Skill'
              value={searchParams.skill || 'All'}
              list={state.cachedData.skills}
              onSelect={selectSkill}
            />
            <MainUnitRow
              value={searchParams.idol_main_unit || ''}
              setValue={selectMainUnit}
            />
            <PickerRow
              name='Subunit'
              value={searchParams.idol_sub_unit || ''}
              list={state.cachedData.subUnits}
              onSelect={selectSubUnit}
            />
            <PickerRow
              name='School'
              value={searchParams.idol_school || ''}
              list={state.cachedData.schools}
              onSelect={selectSchool}
            />
            <YearRow
              value={searchParams.idol_year || ''}
              setValue={selectYear}
            />
            <OrderingRow
              list={OrderingGroup.CARD}
              selectedItem={
                searchParams.selectedOrdering || OrderingGroup.CARD[1].value
              }
              onSelect={selectOrdering}
              isReverse={searchParams.isReverse || false}
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
    padding: Metrics.baseMargin,
  },
  fab: {
    bottom: 0,
    margin: 16,
    position: 'absolute',
    right: 0,
  },
  filterContainer: {
    height: responsiveHeight(35),
  },
  flatListElement: {
    margin: Metrics.baseMargin,
  },
  list: {
    padding: Metrics.smallMargin,
  },
});

export default CardsScreen;
