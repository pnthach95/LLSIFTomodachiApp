/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import React from 'react';
import {
  Text, View, FlatList, TextInput,
  TouchableNativeFeedback, Alert, ScrollView,
  Image, LayoutAnimation, UIManager,
} from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import Fade from '~/Components/Fade/Fade';
import YearRow from '~/Components/YearRow/YearRow';
import CardItem from '~/Components/CardItem/CardItem';
import EventRow from '~/Components/EventRow/EventRow';
import SkillRow from '~/Components/SkillRow';
import RarityRow from '~/Components/RarityRow/RarityRow';
import RegionRow from '~/Components/RegionRow/RegionRow';
import SchoolRow from '~/Components/SchoolRow';
import Touchable from '~/Components/Touchable/Touchable';
import SubUnitRow from '~/Components/SubUnitRow';
import IdolNameRow from '~/Components/IdolNameRow';
import MainUnitRow from '~/Components/MainUnitRow/MainUnitRow';
import OrderingRow from '~/Components/OrderingRow/OrderingRow';
import AttributeRow from '~/Components/AttributeRow/AttributeRow';
import PromoCardRow from '~/Components/PromoCardRow/PromoCardRow';
import SquareButton from '~/Components/SquareButton/SquareButton';
import Card2PicsItem from '~/Components/Card2PicsItem/Card2PicsItem';
import SpecialCardRow from '~/Components/SpecialCardRow/SpecialCardRow';
import LLSIFService from '~/Services/LLSIFService';
import SplashScreen from '../SplashScreen/SplashScreen';
import { Colors, ApplicationStyles, Images } from '~/Theme';
import styles from './styles';
import { loadSettings } from '~/Utils';
import { OrderingGroup } from '~/Config';

/**
 * [Card List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#get-the-list-of-cards)
 *
 * State:
 * - `isLoading`: Loading state
 * - `data`: Data for FlatList
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
 * @class CardsScreen
 * @extends {React.PureComponent}
 */
export default class CardsScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.defaultFilter = {
      search: '',
      selectedOrdering: OrderingGroup.CARD[0].value,
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
      idol_year: '',
    };

    this.state = {
      isLoading: true,
      column: 2,
      isActionButtonVisible: true,
      data: [],
      isFilter: false,
      stopSearch: false,
      search: '',
      selectedOrdering: OrderingGroup.CARD[0].value,
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
      idol_year: '',
    };
    this.onEndReached = _.debounce(this.onEndReached, 1000);
    this.listViewOffset = 0;
    UIManager.setLayoutAnimationEnabledExperimental
      && UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  static propTypes = {
    isConnected: PropTypes.bool,
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => <Icon name='ios-photos' size={30}
      color={focused ? Colors.pink : Colors.inactive} />,
    tabBarLabel: 'Cards',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive,
    },
  }

  componentDidMount() {
    loadSettings()
      .then(res => this.setState({ japan_only: res.worldwide_only ? 'False' : '' }, () => this.getCards()));
  }

  /**
   * Key extractor in FlatList
   *
   * @memberof CardsScreen
   */
  keyExtractor = item => `card ${item.id}`;

  /**
   * Render item in FlatList
   *
   * @memberof CardsScreen
   */
  renderItem = ({ item }) => (this.state.column === 1
    ? <Card2PicsItem item={item} onPress={this.navigateToCardDetail(item)} />
    : <CardItem item={item} onPress={this.navigateToCardDetail(item)} />);

  onScroll = (event) => {
    // Simple fade-in / fade-out animation
    const CustomLayoutLinear = {
      duration: 100,
      create: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
      delete: { type: LayoutAnimation.Types.linear, property: LayoutAnimation.Properties.opacity },
    };
    // Check if the user is scrolling up or down
    // by confronting the new scroll position with your own one
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = (currentOffset > 0 && currentOffset > this.listViewOffset)
      ? 'down'
      : 'up';
    // If the user is scrolling down (and the action-button is still visible) hide it
    const isActionButtonVisible = direction === 'up';
    if (isActionButtonVisible !== this.state.isActionButtonVisible) {
      LayoutAnimation.configureNext(CustomLayoutLinear);
      this.setState({ isActionButtonVisible });
    }
    // Update your scroll position
    this.listViewOffset = currentOffset;
  }

  /**
   * Navigate to Card Detail Screen
   *
   * @param {Object} item Card's information
   * @memberof CardsScreen
   */
  navigateToCardDetail = item => () => {
    if (this.props.isConnected) {
      this.props.navigation.navigate('CardDetailScreen', { item });
    }
  }

  /**
   * Get card list
   *
   * @param {Number} [page=this.state.page] Page number
   * @memberof CardsScreen
   */
  getCards(page = this.state.page) {
    if (this.props.isConnected === false) {
      this.setState({ isLoading: false });
      return;
    }
    const ordering = (this.state.isReverse ? '-' : '') + this.state.selectedOrdering;
    const theFilter = {
      ordering,
      page_size: this.state.page_size,
      page,
    };
    if (this.state.attribute !== '') theFilter.attribute = this.state.attribute;
    if (this.state.idol_main_unit !== '') theFilter.idol_main_unit = this.state.idol_main_unit;
    if (this.state.idol_sub_unit !== 'All') theFilter.idol_sub_unit = this.state.idol_sub_unit;
    if (this.state.idol_school !== 'All') theFilter.idol_school = this.state.idol_school;
    if (this.state.name !== 'All') theFilter.name = this.state.name;
    if (this.state.skill !== 'All') theFilter.skill = this.state.skill;
    if (this.state.is_event !== '') theFilter.is_event = this.state.is_event;
    if (this.state.is_promo !== '') theFilter.is_promo = this.state.is_promo;
    if (this.state.japan_only !== '') theFilter.japan_only = this.state.japan_only;
    if (this.state.idol_year !== '') theFilter.idol_year = this.state.idol_year;
    if (this.state.is_special !== '') theFilter.is_special = this.state.is_special;
    if (this.state.rarity !== '') theFilter.rarity = this.state.rarity;
    if (this.state.search !== '') theFilter.search = this.state.search;
    console.log(`Cards.getCards: ${JSON.stringify(theFilter)}`);
    LLSIFService.fetchCardList(theFilter).then((result) => {
      if (result === 404) {
        // console.log('LLSIFService.fetchCardList 404');
        this.setState({ stopSearch: true });
      } else {
        let x = [...this.state.data, ...result];
        x = x.filter((thing, index, self) => index === self.findIndex(t => t.id === thing.id));
        this.setState({
          data: x,
          isLoading: false,
          page: page + 1,
        });
      }
    }).catch((err) => {
      Alert.alert('Error', 'Error when get cards',
        [{ text: 'OK', onPress: () => console.log(`OK Pressed, ${err}`) }]);
    });
  }

  /**
   * Open drawer
   *
   * @memberof CardsScreen
   */
  openDrawer = () => this.props.navigation.openDrawer();

  /**
   * Call when pressing search button
   *
   * @memberof CardsScreen
   */
  onSearch = () => {
    this.setState({ data: [], isFilter: false, stopSearch: false });
    this.getCards(1);
  }

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   *
   * @memberof CardsScreen
   */
  onEndReached = () => {
    if (this.state.stopSearch) return;
    this.getCards();
  }

  /**
   * Filter on/off
   *
   * @memberof CardsScreen
   */
  toggleFilter = () => this.setState({ isFilter: !this.state.isFilter });

  /**
   * Reverse search on/off
   *
   * @memberof CardsScreen
   */
  toggleReverse = () => this.setState({ isReverse: !this.state.isReverse });

  /**
   * Switch 1 column and 2 columns
   *
   * @memberof CardsScreen
   */
  switchColumn = () => this.setState({ column: this.state.column === 1 ? 2 : 1 });

  /**
   * Save is_promo
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectPromo = value => () => this.setState({ is_promo: value });

  /**
   * Save is_special
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectSpecial = value => () => this.setState({ is_special: value });

  /**
   * Save is_event
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectEvent = value => () => this.setState({ is_event: value });

  /**
   * Save idol_main_unit
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectMainUnit = value => () => this.setState({ idol_main_unit: value });

  /**
   * Save rarity
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectRarity = value => () => this.setState({ rarity: value });

  /**
   * Save attribute
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectAttribute = value => () => this.setState({ attribute: value });

  /**
   * Save idol_year
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectYear = value => () => this.setState({ idol_year: value });

  /**
   * Save region
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectRegion = value => () => this.setState({ japan_only: value });

  /**
   * Save idol_sub_unit
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectSubUnit = itemValue => this.setState({ idol_sub_unit: itemValue });

  /**
   * Save idol name
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectIdol = itemValue => this.setState({ name: itemValue });

  /**
   * Save school
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectSchool = itemValue => this.setState({ idol_school: itemValue });

  /**
   * Save skill
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectSkill = itemValue => this.setState({ skill: itemValue });

  /**
   * Save ordering
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectOrdering = itemValue => this.setState({ selectedOrdering: itemValue });

  /**
   * Reset filter variables
   *
   * @memberof CardsScreen
   */
  resetFilter = () => {
    this.setState({
      name: this.defaultFilter.name,
      rarity: this.defaultFilter.rarity,
      attribute: this.defaultFilter.attribute,
      japan_only: this.defaultFilter.japan_only,
      is_promo: this.defaultFilter.is_promo,
      is_special: this.defaultFilter.is_special,
      is_event: this.defaultFilter.is_event,
      skill: this.defaultFilter.skill,
      idol_main_unit: this.defaultFilter.idol_main_unit,
      idol_sub_unit: this.defaultFilter.idol_sub_unit,
      idol_school: this.defaultFilter.idol_school,
      idol_year: this.defaultFilter.idol_year,
      selectedOrdering: this.defaultFilter.selectedOrdering,
      isReverse: this.defaultFilter.isReverse,
      search: '',
    });
  }

  /**
   * Render footer of FlatList
   *
   * @memberof CardsScreen
   */
  renderFooter = <View style={[ApplicationStyles.center, styles.flatListElement]}>
    <Image source={Images.alpaca} />
  </View>

  renderEmpty = <View style={styles.flatListElement}>
    <Text style={styles.resetText}>No result</Text>
  </View>

  render() {
    return (
      <View style={styles.container}>
        <Fade visible={this.state.isLoading}
          style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          <SplashScreen bgColor={Colors.green} />
        </Fade>
        <Fade visible={!this.state.isLoading}
          style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          {/* HEADER */}
          <ElevatedView elevation={5} style={[ApplicationStyles.header, styles.header]}>
            <SquareButton name={'ios-menu'} onPress={this.openDrawer} />
            <View style={ApplicationStyles.searchHeader}>
              <TextInput value={this.state.search}
                onChangeText={text => this.setState({ search: text })}
                onSubmitEditing={this.onSearch}
                placeholder={'Search card...'}
                style={ApplicationStyles.searchInput} />
              <SquareButton name={'ios-search'} onPress={this.onSearch}
                style={ApplicationStyles.searchButton} />
            </View>
            <SquareButton name={'ios-more'} onPress={this.toggleFilter} />
          </ElevatedView>

          {/* FILTER */}
          {this.state.isFilter
            && <ElevatedView elevation={5} style={styles.filterContainer}>
              <ScrollView contentContainerStyle={styles.contentContainer}>
                <IdolNameRow name={this.state.name} selectIdol={this.selectIdol} />
                <RarityRow rarity={this.state.rarity} selectRarity={this.selectRarity} />
                <AttributeRow attribute={this.state.attribute}
                  selectAttribute={this.selectAttribute} />
                <RegionRow japanOnly={this.state.japan_only} selectRegion={this.selectRegion} />
                <PromoCardRow isPromo={this.state.is_promo} selectPromo={this.selectPromo} />
                <SpecialCardRow isSpecial={this.state.is_special}
                  selectSpecial={this.selectSpecial} />
                <EventRow isEvent={this.state.is_event} selectEvent={this.selectEvent} />
                <SkillRow skill={this.state.skill} selectSkill={this.selectSkill} />
                <MainUnitRow mainUnit={this.state.idol_main_unit}
                  selectMainUnit={this.selectMainUnit} />
                <SubUnitRow idolSubUnit={this.state.idol_sub_unit}
                  selectSubUnit={this.selectSubUnit} />
                <SchoolRow idolSchool={this.state.idol_school} selectSchool={this.selectSchool} />
                <YearRow idolYear={this.state.idol_year} selectYear={this.selectYear} />
                <OrderingRow orderingItem={OrderingGroup.CARD}
                  selectedOrdering={this.state.selectedOrdering}
                  selectOrdering={this.selectOrdering}
                  isReverse={this.state.isReverse}
                  toggleReverse={this.toggleReverse} />

                {/* RESET BUTTON */}
                <Touchable onPress={this.resetFilter} useForeground
                  style={styles.resetView}>
                  <Text style={styles.resetText}>RESET</Text>
                </Touchable>
              </ScrollView>
            </ElevatedView>}
          <ConnectStatus />
          {/* LIST */}
          <FlatList data={this.state.data}
            key={`${this.state.column}c`}
            showsVerticalScrollIndicator={false}
            numColumns={this.state.column}
            initialNumToRender={8}
            keyExtractor={this.keyExtractor}
            onEndReached={this.onEndReached}
            style={styles.list}
            onScroll={this.onScroll}
            ListEmptyComponent={this.renderEmpty}
            ListFooterComponent={this.renderFooter}
            renderItem={this.renderItem} />
          {this.state.isActionButtonVisible
            && <View style={[styles.floatButton, ApplicationStyles.center]}>
              <Touchable onPress={this.switchColumn}
                background={TouchableNativeFeedback.Ripple(Colors.green, true)}>
                <Image source={Images.column[this.state.column - 1]}
                  style={styles.floatButtonSize} />
              </Touchable>
            </View>}
        </Fade>
      </View>
    );
  }
}
