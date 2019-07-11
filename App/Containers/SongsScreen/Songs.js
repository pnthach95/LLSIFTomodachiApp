import React from 'react';
import {
  View, FlatList, TextInput, Alert, Text, Image,
} from 'react-native';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import Fade from '~/Components/Fade/Fade';
import EventRow from '~/Components/EventRow/EventRow';
import SongItem from '~/Components/SongItem/SongItem';
import Touchable from '~/Components/Touchable/Touchable';
import MainUnitRow from '~/Components/MainUnitRow/MainUnitRow';
import OrderingRow from '~/Components/OrderingRow/OrderingRow';
import AttributeRow from '~/Components/AttributeRow/AttributeRow';
import SquareButton from '~/Components/SquareButton/SquareButton';
import SplashScreen from '../SplashScreen/SplashScreen';
import LLSIFService from '~/Services/LLSIFService';
import { Colors, ApplicationStyles, Images } from '~/Theme';
import { OrderingGroup } from '~/Config';
import styles from './styles';

const defaultFilter = {
  selectedOrdering: OrderingGroup.SONG[0].value,
  isReverse: true,
  ordering: '-id',
  page_size: 20,
  page: 1,
  expand_event: '',
  search: '',
  attribute: '',
  is_event: '',
  is_daily_rotation: '',
  available: '',
  main_unit: '',
};

/**
 * [Song List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Songs#get-the-list-of-songs)
 *
 * State:
 * - `isLoading`: Loading state
 * - `list`: Data for FlatList
 * - `isFilter`: Filter on/off
 * - `ordering`: Ordering by any field (See link above)
 * - `page_size`: Number of object per API call
 * - `page`: Page number
 * - `expand_event`: Will return the full Event object in the event field
 * - `search`: Keyword for search
 * - `attribute`: Attribute (None, Smile, Pure, Cool, All)
 * - `is_event`: Is event (None, True, False)
 * - `is_daily_rotation`: *TODO*
 * - `available`: *TODO*
 * - `main_unit`: Main unit (None, μ's, Aqours)
 * - `stopSearch`: Prevent calling API
 *
 * @class SongsScreen
 * @extends {React.Component}
 */
export default class SongsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOrdering: OrderingGroup.SONG[0].value,
      isReverse: true,
      isLoading: true,
      list: [],
      isFilter: false,
      ordering: '-id',
      page_size: 20,
      page: 1,
      expand_event: '',
      search: '',
      attribute: '',
      is_event: '',
      is_daily_rotation: '',
      available: '',
      main_unit: '',
      stopSearch: false,
    };
    this.onEndReached = _.debounce(this.onEndReached, 500);
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => <Icon name='ios-musical-notes' size={30}
      color={focused ? Colors.pink : Colors.inactive} />,
    tabBarLabel: 'Songs',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive,
    },
  }

  componentDidMount() {
    this.getSongs();
  }

  /**
   * Key extractor for FlatList
   *
   * @memberof SongsScreen
   */
  keyExtractor = item => `song ${item.name}`;

  /**
   * Render item in FlatList
   *
   * @param {Object} item
   * @memberof SongsScreen
   */
  renderItem = ({ item }) => <SongItem item={item}
    onPress={() => this.navigateToSongDetail(item)} />

  /**
   * Navigate to Song Detail Screen
   *
   * @param {Object} item
   * @memberof SongsScreen
   */
  navigateToSongDetail(item) {
    this.props.navigation.navigate('SongDetailScreen', { item });
  }

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   *
   * @memberof CardsScreen
   */
  onEndReached = () => {
    if (this.state.stopSearch) return;
    this.getSongs();
  }

  /**
   * Fetch song list
   *
   * @param {Number} [page=this.state.page] page
   * @memberof SongsScreen
   */
  getSongs(page = this.state.page) {
    const ordering = (this.state.isReverse ? '-' : '') + this.state.selectedOrdering;
    const theFilter = {
      ordering,
      page_size: this.state.page_size,
      page,
      expand_event: this.state.expand_event,
      // is_daily_rotation: this.state.is_daily_rotation
    };
    if (this.state.attribute !== '') theFilter.attribute = this.state.attribute;
    if (this.state.available !== '') theFilter.available = this.state.available;
    if (this.state.is_event !== '') theFilter.is_event = this.state.is_event;
    if (this.state.main_unit !== '') theFilter.main_unit = this.state.main_unit;
    if (this.state.search !== '') theFilter.search = this.state.search;
    // eslint-disable-next-line no-console
    console.log(`Songs.getSongs ${JSON.stringify(theFilter)}`);
    LLSIFService.fetchSongList(theFilter).then((result) => {
      if (result === 404) {
        // console.log('LLSIFService.fetchSongList 404')
        this.setState({ stopSearch: true });
      } else {
        let x = [...this.state.list, ...result];
        x = x.filter((thing, index, self) => index === self.findIndex(t => t.name === thing.name));
        this.setState({
          list: x,
          isLoading: false,
          page: page + 1,
        });
      }
    }).catch((err) => {
      Alert.alert('Error', 'Error when get songs',
        // eslint-disable-next-line no-console
        [{ text: 'OK', onPress: () => console.log(`OK Pressed ${err}`) }]);
    });
  }

  /**
   * Filter on/off
   *
   * @memberof SongsScreen
   */
  toggleFilter = () => this.setState({ isFilter: !this.state.isFilter });

  /**
   * Reverse search on/off
   *
   * @memberof SongsScreen
   */
  toggleReverse = () => this.setState({ isReverse: !this.state.isReverse });

  /**
   * Open drawer
   *
   * @memberof SongsScreen
   */
  openDrawer = () => this.props.navigation.openDrawer();

  /**
   * Call when pressing search button
   *
   * @memberof SongsScreen
   */
  onSearch = () => {
    this.setState({
      list: [], page: 1, isFilter: false, stopSearch: false,
    });
    this.getSongs(1);
  }

  /**
   * Reset filter variables
   *
   * @memberof SongsScreen
   */
  resetFilter = () => {
    this.setState({
      ordering: defaultFilter.ordering,
      page_size: defaultFilter.page_size,
      page: defaultFilter.page,
      expand_event: defaultFilter.expand_event,
      search: defaultFilter.search,
      attribute: defaultFilter.attribute,
      is_event: defaultFilter.is_event,
      is_daily_rotation: defaultFilter.is_daily_rotation,
      available: defaultFilter.available,
      main_unit: defaultFilter.main_unit,
      selectedOrdering: defaultFilter.selectedOrdering,
      isReverse: defaultFilter.isReverse,
    });
  }

  /**
   * Save `is_event`
   *
   * @param {String} value
   * @memberof SongsScreen
   */
  selectEvent = value => () => this.setState({ is_event: value });

  /**
   * Save `attribute`
   *
   * @memberof SongsScreen
   */
  selectAttribute = value => () => this.setState({ attribute: value });

  /**
   * Save `main_unit`
   *
   * @memberof SongsScreen
   */
  selectMainUnit = value => () => this.setState({ main_unit: value });

  /**
   * Save ordering
   *
   * @param {String} itemValue
   * @memberof SongsScreen
   */
  selectOrdering = itemValue => this.setState({ selectedOrdering: itemValue });

  /**
   * Render footer in FlatList
   */
  renderFooter = <View style={[ApplicationStyles.center, styles.flatListElement]}>
    <Image source={Images.alpaca} />
  </View>

  renderEmpty = <View style={styles.flatListElement}>
    <Text style={styles.textCenter}>No result</Text>
  </View>

  render() {
    return (
      <View style={ApplicationStyles.screen}>
        <Fade visible={this.state.isLoading}
          style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          <SplashScreen />
        </Fade>
        <Fade visible={!this.state.isLoading}
          style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          {/* HEADER */}
          <ElevatedView elevation={5} style={[ApplicationStyles.header, styles.header]}>
            <SquareButton name={'ios-menu'} onPress={this.openDrawer} />
            <View style={ApplicationStyles.searchHeader}>
              <TextInput style={ApplicationStyles.searchInput}
                onChangeText={text => this.setState({ search: text })}
                onSubmitEditing={this.onSearch}
                placeholder={'Search song...'}
                value={this.state.search} />
              <SquareButton name={'ios-search'} onPress={this.onSearch}
                style={ApplicationStyles.searchButton} />
            </View>
            <SquareButton name={'ios-more'} onPress={this.toggleFilter} />
          </ElevatedView>
          {/* FILTER */}
          {this.state.isFilter
            && <ElevatedView elevation={5} style={styles.filterContainer}>
              <AttributeRow attribute={this.state.attribute}
                selectAttribute={this.selectAttribute} />
              <EventRow is_event={this.state.is_event} selectEvent={this.selectEvent} />
              <MainUnitRow main_unit={this.state.main_unit} selectMainUnit={this.selectMainUnit} />
              <OrderingRow orderingItem={OrderingGroup.SONG}
                selectedOrdering={this.state.selectedOrdering} selectOrdering={this.selectOrdering}
                isReverse={this.state.isReverse} toggleReverse={this.toggleReverse} />
              <Touchable onPress={this.resetFilter} useForeground
                style={styles.resetView}>
                <Text style={styles.resetText}>RESET</Text>
              </Touchable>
            </ElevatedView>}

          {/* LIST */}
          <FlatList data={this.state.list}
            initialNumToRender={6}
            numColumns={2}
            keyExtractor={this.keyExtractor}
            style={styles.list}
            onEndReached={this.onEndReached}
            ListEmptyComponent={this.renderEmpty}
            ListFooterComponent={this.renderFooter}
            renderItem={this.renderItem} />
        </Fade>
      </View>
    );
  }
}
