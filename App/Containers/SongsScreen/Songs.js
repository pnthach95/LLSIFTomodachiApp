import React from 'react';
import {
  View, FlatList, TextInput, Alert, Text, Image,
} from 'react-native';
import { connect } from 'react-redux';
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
import { LLSIFService } from '~/Services/LLSIFService';
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
class SongsScreen extends React.Component {
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
    this._onEndReached = _.debounce(this._onEndReached, 500);
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
    this._getSongs();
  }

  /**
   * Key extractor for FlatList
   *
   * @memberof SongsScreen
   */
  _keyExtractor = (item, index) => `song ${item.name}`;

  /**
   * Render item in FlatList
   *
   * @param {Object} item
   * @memberof SongsScreen
   */
  _renderItem = ({ item }) => <SongItem item={item}
    onPress={() => this._navigateToSongDetail(item)} />

  /**
   * Navigate to Song Detail Screen
   *
   * @param {Object} item
   * @memberof SongsScreen
   */
  _navigateToSongDetail(item) {
    this.props.navigation.navigate('SongDetailScreen', { item });
  }

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    if (this.state.stopSearch) return;
    this._getSongs();
  }

  /**
   * Fetch song list
   *
   * @param {Number} [page=this.state.page] page
   * @memberof SongsScreen
   */
  _getSongs(page = this.state.page) {
    const _ordering = (this.state.isReverse ? '-' : '') + this.state.selectedOrdering;
    const _filter = {
      ordering: _ordering,
      page_size: this.state.page_size,
      page,
      expand_event: this.state.expand_event,
      // is_daily_rotation: this.state.is_daily_rotation
    };
    if (this.state.attribute !== '') _filter.attribute = this.state.attribute;
    if (this.state.available !== '') _filter.available = this.state.available;
    if (this.state.is_event !== '') _filter.is_event = this.state.is_event;
    if (this.state.main_unit !== '') _filter.main_unit = this.state.main_unit;
    if (this.state.search !== '') _filter.search = this.state.search;
    console.log(`Songs.getSongs ${JSON.stringify(_filter)}`);
    LLSIFService.fetchSongList(_filter).then((result) => {
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
        [{ text: 'OK', onPress: () => console.log(`OK Pressed ${err}`) }]);
    });
  }

  /**
   * Filter on/off
   *
   * @memberof SongsScreen
   */
  _toggleFilter = () => this.setState({ isFilter: !this.state.isFilter });

  /**
   * Reverse search on/off
   *
   * @memberof SongsScreen
   */
  _toggleReverse = () => this.setState({ isReverse: !this.state.isReverse });

  /**
   * Open drawer
   *
   * @memberof SongsScreen
   */
  _openDrawer = () => this.props.navigation.openDrawer();

  /**
   * Call when pressing search button
   *
   * @memberof SongsScreen
   */
  _onSearch = () => {
    this.setState({
      list: [], page: 1, isFilter: false, stopSearch: false,
    });
    this._getSongs(1);
  }

  /**
   * Reset filter variables
   *
   * @memberof SongsScreen
   */
  _resetFilter = () => {
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
      search: '',
    });
  }

  /**
   * Save `is_event`
   *
   * @param {String} value
   * @memberof SongsScreen
   */
  _selectEvent = value => () => this.setState({ is_event: value });

  /**
   * Save `attribute`
   *
   * @memberof SongsScreen
   */
  _selectAttribute = value => () => this.setState({ attribute: value });

  /**
   * Save `main_unit`
   *
   * @memberof SongsScreen
   */
  _selectMainUnit = value => () => this.setState({ main_unit: value });

  /**
   * Save ordering
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof SongsScreen
   */
  _selectOrdering = (itemValue, itemIndex) => this.setState({ selectedOrdering: itemValue });

  /**
   * Render footer in FlatList
   */
  renderFooter = <View style={[ApplicationStyles.center, styles.flatListElement]}>
    <Image source={Images.alpaca} />
  </View>

  renderEmpty = <View style={styles.flatListElement}>
    <Text style={{ textAlign: 'center' }}>No result</Text>
  </View>

  render() {
    return (
      <View style={ApplicationStyles.screen}>
        <Fade visible={this.state.isLoading} style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          <SplashScreen />
        </Fade>
        <Fade visible={!this.state.isLoading} style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          {/* HEADER */}
          <ElevatedView elevation={5} style={[ApplicationStyles.header, styles.header]}>
            <SquareButton name={'ios-menu'} onPress={this._openDrawer} />
            <View style={ApplicationStyles.searchHeader}>
              <TextInput style={ApplicationStyles.searchInput}
                onChangeText={text => this.setState({ search: text })}
                onSubmitEditing={this._onSearch}
                placeholder={'Search song...'}
                value={this.state.search} />
              <SquareButton name={'ios-search'} onPress={this._onSearch}
                style={ApplicationStyles.searchButton} />
            </View>
            <SquareButton name={'ios-more'} onPress={this._toggleFilter} />
          </ElevatedView>
          {/* FILTER */}
          {this.state.isFilter
            && <ElevatedView elevation={5} style={styles.filterContainer}>
              <AttributeRow attribute={this.state.attribute} selectAttribute={this._selectAttribute} />
              <EventRow is_event={this.state.is_event} selectEvent={this._selectEvent} />
              <MainUnitRow main_unit={this.state.main_unit} selectMainUnit={this._selectMainUnit} />
              <OrderingRow orderingItem={OrderingGroup.SONG}
                selectedOrdering={this.state.selectedOrdering} selectOrdering={this._selectOrdering}
                isReverse={this.state.isReverse} toggleReverse={this._toggleReverse} />
              <Touchable onPress={this._resetFilter} useForeground
                style={styles.resetView}>
                <Text style={styles.resetText}>RESET</Text>
              </Touchable>
            </ElevatedView>}

          {/* LIST */}
          <FlatList data={this.state.list}
            initialNumToRender={6}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            style={styles.list}
            onEndReached={this._onEndReached}
            ListEmptyComponent={this.renderEmpty}
            ListFooterComponent={this.renderFooter}
            renderItem={this._renderItem} />
        </Fade>
      </View>
    );
  }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(SongsScreen);
