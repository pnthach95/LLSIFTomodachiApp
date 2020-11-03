import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  TouchableNativeFeedback,
  Alert,
  ScrollView,
  Image,
  LayoutAnimation
} from 'react-native';
import { Text, IconButton, Surface, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';
import _ from 'lodash';

import useStatusBar from '~/hooks/useStatusBar';
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
import SplashScreen from '../Splash';
import { Colors, AppStyles, Images } from '~/Theme';
import styles from './styles';
import { loadSettings } from '~/Utils';
import { OrderingGroup } from '~/Config';
import {
  AttributeType,
  BooleanOrEmpty,
  CardObject,
  CardsScreenProps,
  MainUnitNames,
  RarityType,
  SkillType,
  YearType
} from '~/Utils/type';

/**
 * [Card List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#get-the-list-of-cards)
 *
 * State:
 * - `isLoading`: Loading state
 * - `list`: Data for FlatList
 * - `isFilter`: Filter on/off
 * - `stopSearch`: Prevent calling API
 * - `search`: Keyword for search
 * - `selectedOrdering`: Selected ordering option {label: string, value: string}
 * - `isReverse`: Is reverse (boolean)
 * - `page_size`: Number of object per API call
 * - `page`: Page number
 * - `name`: Idol name
 * - `rarity`: Rarity (None, N, R, SR, SSR, UR)
 * - `attribute`: Attribute (None, Smile, Pure, Cool, All)
 * - `japan_only`: Japan only (None, False, True)
 * - `is_promo`: Is promo (None, True, False)
 * - `is_special`: Is special (None, True, False)
 * - `is_event`: Is event (None, True, False)
 * - `skill`: Skill name
 * - `idol_main_unit`: Main unit (None, μ's, Aqours)
 * - `idol_sub_unit`: Sub unit
 * - `idol_school`: School name
 * - `idol_year`: Year (None, First, Second, Third)
 *
 */
const CardsScreen: React.FC<CardsScreenProps> = ({ navigation }) => {
  useStatusBar('dark-content', Colors.white);
  const defaultFilter = {
    search: '',
    selectedOrdering: OrderingGroup.CARD[1].value,
    isReverse: true,
    page_size: 30,
    page: 1,
    name: 'All',
    rarity: '',
    attribute: '',
    japan_only: '',
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
  const [searchOptions, setSearchOptions] = useState<typeof defaultFilter>(
    defaultFilter
  );
  const [column, setColumn] = useState(2);
  const [isActionButtonVisible, setIsActionButtonVisible] = useState(true);
  const [list, setList] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  const [stopSearch, setStopSearch] = useState(false);
  const onEndReached = _.debounce(onEndReaching, 1000);
  let listViewOffset = 0;

  useEffect(() => {
    loadSettings().then((res) => {
      setSearchOptions({
        ...searchOptions,
        japan_only: res.worldwide_only ? 'False' : ''
      });
    });
  }, []);

  useEffect(() => {
    getCards();
  }, [searchOptions.page]);

  /**
   * Key extractor in FlatList
   *
   * @memberof CardsScreen
   */
  const keyExtractor = (item: CardObject) => `card ${item.id}`;

  /**
   * Render item in FlatList
   *
   * @memberof CardsScreen
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

  const onScroll = (event) => {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity
      }
    };
    // Check if the user is scrolling up or down
    // by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction =
      currentOffset > 0 && currentOffset > listViewOffset ? 'down' : 'up';
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisibleTmp = direction === 'up';
    if (isActionButtonVisibleTmp !== isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear);
      setIsActionButtonVisible(isActionButtonVisibleTmp);
    }
    // Update your scroll position
    listViewOffset = currentOffset;
  };

  /**
   * Get card list
   *
   */
  async function getCards() {
    const ordering =
      (searchOptions.isReverse ? '-' : '') + searchOptions.selectedOrdering;
    const theFilter = {
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
      } else {
        let x = [...list, ...result];
        x = x.filter(
          (thing, index, self) =>
            index === self.findIndex((t) => t.id === thing.id)
        );
        setList(x);
      }
    } catch (err) {
      Alert.alert('Error', 'Error when get cards', [
        { text: 'OK', onPress: () => console.log(`OK Pressed, ${err}`) }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  /** Open drawer */
  const openDrawer = useCallback(() => navigation.openDrawer(), []);

  /**
   * Call when pressing search button
   *
   */
  const onSearch = () => {
    setList([]);
    setIsFilter(false);
    setStopSearch(false);
    getCards();
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
   * Filter on/off
   *
   */
  const toggleFilter = () => {
    setIsFilter(!isFilter);
  };

  /**
   * Reverse search on/off
   *
   */
  const toggleReverse = () => {
    setSearchOptions({
      ...searchOptions,
      isReverse: !searchOptions.isReverse
    });
  };

  /**
   * Switch 1 column and 2 columns
   *
   */
  const switchColumn = () => {
    setColumn(column === 1 ? 2 : 1);
  };

  /**
   * Save is_promo
   *
   * @param {String} value
   */
  const selectPromo = (value: BooleanOrEmpty) => () => {
    setSearchOptions({
      ...searchOptions,
      is_promo: value
    });
  };

  /**
   * Save is_special
   *
   * @param {String} value
   */
  const selectSpecial = (value: BooleanOrEmpty) => () => {
    setSearchOptions({
      ...searchOptions,
      is_special: value
    });
  };

  /**
   * Save is_event
   *
   * @param {String} itemValue
   */
  const selectEvent = (value: BooleanOrEmpty) => () => {
    setSearchOptions({
      ...searchOptions,
      is_event: value
    });
  };

  /**
   * Save idol_main_unit
   *
   * @param {String} value
   */
  const selectMainUnit = (value: MainUnitNames) => () => {
    setSearchOptions({
      ...searchOptions,
      idol_main_unit: value
    });
  };

  /**
   * Save rarity
   *
   * @param {String} value
   */
  const selectRarity = (value: RarityType) => () => {
    setSearchOptions({
      ...searchOptions,
      rarity: value
    });
  };

  /**
   * Save attribute
   *
   * @param {String} value
   */
  const selectAttribute = (value: AttributeType) => () => {
    setSearchOptions({
      ...searchOptions,
      attribute: value
    });
  };

  /**
   * Save idol_year
   *
   * @param {String} value
   */
  const selectYear = (value: YearType) => () =>
    setSearchOptions({
      ...searchOptions,
      idol_year: value
    });

  /**
   * Save region
   *
   * @param {String} value
   */
  const selectRegion = (value: BooleanOrEmpty) => () => {
    setSearchOptions({
      ...searchOptions,
      japan_only: value
    });
  };

  /**
   * Save idol_sub_unit
   *
   * @param {String} itemValue
   */
  const selectSubUnit = (itemValue: string) => {
    setSearchOptions({
      ...searchOptions,
      idol_sub_unit: itemValue
    });
  };

  /**
   * Save idol name
   *
   * @param {String} itemValue
   */
  const selectIdol = (itemValue: string) => {
    setSearchOptions({
      ...searchOptions,
      name: itemValue
    });
  };

  /**
   * Save school
   *
   * @param {String} itemValue
   */
  const selectSchool = (itemValue: string) => {
    setSearchOptions({
      ...searchOptions,
      idol_school: itemValue
    });
  };

  /**
   * Save skill
   *
   * @param {String} itemValue
   */
  const selectSkill = (itemValue: SkillType) => {
    setSearchOptions({
      ...searchOptions,
      skill: itemValue
    });
  };

  /**
   * Save ordering
   *
   * @param {String} itemValue
   */
  const selectOrdering = (itemValue) => {
    setSearchOptions({
      ...searchOptions,
      selectedOrdering: itemValue
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
   * Render footer of FlatList
   *
   */
  const renderFooter = (
    <View style={[AppStyles.center, styles.flatListElement]}>
      <Image source={Images.alpaca} />
    </View>
  );

  const renderEmpty = (
    <View style={styles.flatListElement}>
      <Text style={styles.resetText}>No result</Text>
    </View>
  );

  if (isLoading) {
    return <SplashScreen bgColor={Colors.green} />;
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Surface style={[AppStyles.header, styles.header]}>
        <IconButton icon={'menu'} onPress={openDrawer} />
        <View style={AppStyles.searchHeader}>
          <TextInput
            onChangeText={(text) =>
              setSearchOptions({
                ...searchOptions,
                search: text
              })
            }
            onSubmitEditing={onSearch}
            placeholder={'Search card...'}
            style={AppStyles.searchInput}
          />
          <IconButton
            icon={'ios-search'}
            onPress={onSearch}
            style={AppStyles.searchButton}
          />
        </View>
        <IconButton icon={'ios-more'} onPress={toggleFilter} />
      </Surface>

      {/* FILTER */}
      {isFilter && (
        <Surface style={styles.filterContainer}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <IdolNameRow name={searchOptions.name} selectIdol={selectIdol} />
            <RarityRow
              rarity={searchOptions.rarity}
              selectRarity={selectRarity}
            />
            <AttributeRow
              attribute={searchOptions.attribute}
              selectAttribute={selectAttribute}
            />
            <RegionRow
              japanOnly={searchOptions.japan_only}
              selectRegion={selectRegion}
            />
            <PromoCardRow
              isPromo={searchOptions.is_promo}
              selectPromo={selectPromo}
            />
            <SpecialCardRow
              isSpecial={searchOptions.is_special}
              selectSpecial={selectSpecial}
            />
            <EventRow
              isEvent={searchOptions.is_event}
              selectEvent={selectEvent}
            />
            <SkillRow skill={searchOptions.skill} selectSkill={selectSkill} />
            <MainUnitRow
              mainUnit={searchOptions.idol_main_unit}
              selectMainUnit={selectMainUnit}
            />
            <SubUnitRow
              idolSubUnit={searchOptions.idol_sub_unit}
              selectSubUnit={selectSubUnit}
            />
            <SchoolRow
              idolSchool={searchOptions.idol_school}
              selectSchool={selectSchool}
            />
            <YearRow
              idolYear={searchOptions.idol_year}
              selectYear={selectYear}
            />
            <OrderingRow
              orderingItem={OrderingGroup.CARD}
              selectedOrdering={searchOptions.selectedOrdering}
              selectOrdering={selectOrdering}
              isReverse={searchOptions.isReverse}
              toggleReverse={toggleReverse}
            />

            {/* RESET BUTTON */}
            <TouchableRipple onPress={resetFilter} style={styles.resetView}>
              <Text style={styles.resetText}>RESET</Text>
            </TouchableRipple>
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
        onScroll={onScroll}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        renderItem={renderItem}
      />
      {isActionButtonVisible && (
        <View style={[styles.floatButton, AppStyles.center]}>
          <TouchableRipple
            onPress={switchColumn}
            background={TouchableNativeFeedback.Ripple(Colors.green, true)}
          >
            <Image
              source={Images.column[column - 1]}
              style={styles.floatButtonSize}
            />
          </TouchableRipple>
        </View>
      )}
    </View>
  );
};

export default CardsScreen;
