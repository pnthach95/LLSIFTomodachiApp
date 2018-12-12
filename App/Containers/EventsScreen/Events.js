import React from 'react';
import { View, FlatList, Text, TextInput, Alert, Image } from 'react-native';
import { connect } from 'react-redux';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import SkillRow from '../../Components/SkillRow/SkillRow';
import EventItem from '../../Components/EventItem/EventItem';
import RegionRow from '../../Components/RegionRow/RegionRow';
import Touchable from '../../Components/Touchable/Touchable';
import IdolNameRow from '../../Components/IdolNameRow/IdolNameRow';
import MainUnitRow from '../../Components/MainUnitRow/MainUnitRow';
import AttributeRow from '../../Components/AttributeRow/AttributeRow';
import SquareButton from '../../Components/SquareButton/SquareButton';
import SplashScreen from '../SplashScreen/SplashScreen';
import { Colors, ApplicationStyles, Images } from '../../Theme';
import styles from './styles';
import { LLSIFService } from '../../Services/LLSIFService';
import { loadSettings } from '../../Utils';

/**
 * [Event List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Events#get-the-list-of-events)
 *
 * State:
 * - `isLoading`: Loading state
 * - `list`: Data for FlatList
 * - `isFilter`: Filter on/off
 * - `stopSearch`: Prevent calling API
 * - `ordering`: Ordering by any field (See link above)
 * - `page_size`: Number of object per API call
 * - `page`: Page number
 * - `search`: Keyword for search
 * - `idol`: Idol name
 * - `main_unit`: Main unit (None, μ's, Aqours)
 * - `skill`: Skill name
 * - `attribute`: Attribute (None, Smile, Pure, Cool, All)
 * - `is_english`: Is English
 *
 * @class EventsScreen
 * @extends {React.Component}
 */
class EventsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.defaultFilter = {
      ordering: '-beginning',
      page_size: 30,
      page: 1,
      idol: 'All',
      search: '',
      main_unit: '',
      skill: 'All',
      attribute: '',
      is_english: '',
    };
    this.state = {
      isLoading: true,
      list: [],
      isFilter: false,
      stopSearch: false,
      ordering: '-beginning',
      page_size: 30,
      page: 1,
      search: '',
      idol: 'All',
      main_unit: '',
      skill: 'All',
      attribute: '',
      is_english: '',
    };
    this._onEndReached = _.debounce(this._onEndReached, 500);
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) =>
      <Icon name='md-calendar' size={30}
        color={focused ? Colors.pink : Colors.inactive} />,
    tabBarLabel: 'Events',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  componentDidMount() {
    loadSettings().then(res => {
      this.setState({ is_english: res.worldwide_only ? 'False' : '' }, () => this._getEvents());
    })
  }

  /**
   * Key extractor for FlatList
   *
   * @memberof EventsScreen
   */
  _keyExtractor = (item, index) => `event ${item.japanese_name}`;

  /**
   * Render item in FlatList
   *
   * @memberof EventsScreen
   */
  _renderItem = ({ item }) => <EventItem item={item} onPress={this._navigateToEventDetail(item)} />;

  /**
   * Navigate to Event Detail Screen
   *
   * @param {Object} item
   * @memberof EventsScreen
   */
  _navigateToEventDetail = (item) => () => this.props.navigation.navigate('EventDetailScreen', { eventName: item.japanese_name });

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    if (this.state.stopSearch) return;
    this._getEvents();
  }

  /**
   * Get event list
   *
   * @param {Number} [page=this.state.page] Page number
   * @memberof EventsScreen
   */
  _getEvents(page = this.state.page) {
    var _filter = {
      ordering: this.state.ordering,
      page_size: this.state.page_size,
      page: page
    };
    if (this.state.idol !== 'All') _filter.idol = this.state.idol;
    if (this.state.skill !== 'All') _filter.skill = this.state.skill;
    var _is_english = this.state.is_english;
    if (_is_english !== '') {
      if (_is_english === 'True') _is_english = 'False';
      else _is_english = 'True';
      _filter.is_english = _is_english;
    }
    if (this.state.main_unit !== '') _filter.main_unit = this.state.main_unit;
    if (this.state.attribute !== '') _filter.attribute = this.state.attribute;
    if (this.state.search !== '') _filter.search = this.state.search;
    // console.log(`========== Events.getEvents`, _filter);
    LLSIFService.fetchEventList(_filter).then((result) => {
      if (result === 404) {
        // console.log('LLSIFService.fetchEventList 404');
        this.setState({ stopSearch: true });
      } else {
        var x = [...this.state.list, ...result];
        x = x.filter((thing, index, self) =>
          index === self.findIndex(t => t.japanese_name === thing.japanese_name)
        );
        this.setState({
          list: x,
          isLoading: false,
          page: page + 1
        });
      }
    }).catch(err => {
      Alert.alert('Error', 'Error when get songs',
        [{ text: 'OK', onPress: () => console.log('OK Pressed', err) }]);
    });
  }

  /**
   * Open drawer
   *
   * @memberof EventsScreen
   */
  _openDrawer = () => this.props.navigation.openDrawer();

  /**
   * Call when pressing search button
   *
   * @memberof EventsScreen
   */
  _onSearch = () => {
    this.setState({ list: [], page: 1, isFilter: false, stopSearch: false });
    this._getEvents(1);
  }

  /**
   * Reset filter
   *
   * @memberof EventsScreen
   */
  _resetFilter = () => {
    this.setState({
      ordering: this.defaultFilter.ordering,
      page_size: this.defaultFilter.page_size,
      page: this.defaultFilter.page,
      idol: this.defaultFilter.idol,
      search: this.defaultFilter.search,
      main_unit: this.defaultFilter.main_unit,
      skill: this.defaultFilter.skill,
      attribute: this.defaultFilter.attribute,
      is_english: this.defaultFilter.is_english
    });
  }

  /**
   * Filter on/off
   *
   * @memberof EventsScreen
   */
  _toggleFilter = () => this.setState({ isFilter: !this.state.isFilter });

  /**
   * Save `attribute`
   *
   * @param {String} value
   * @memberof EventsScreen
   */
  _selectAttribute = (value) => () => this.setState({ attribute: value });

  /**
   * Save `main_unit`
   *
   * @param {String} value
   * @memberof EventsScreen
   */
  _selectMainUnit = (value) => () => this.setState({ main_unit: value });

  /**
   * Save `is_english`
   *
   * @param {String} value
   * @memberof EventsScreen
   */
  _selectRegion = (value) => () => this.setState({ is_english: value });

  /**
   * Save `skill`
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof EventsScreen
   */
  _selectSkill = (itemValue, itemIndex) => this.setState({ skill: itemValue });

  /**
   * Save `idol`
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof EventsScreen
   */
  _selectIdol = (itemValue, itemIndex) => this.setState({ idol: itemValue });

  /**
   * Render footer of FlatList
   *
   * @memberof EventsScreen
   */
  renderFooter = <View style={[ApplicationStyles.center, { margin: 10 }]}>
    <Image source={Images.alpaca} />
  </View>

  renderEmpty = <View style={{ margin: 10 }}>
    <Text style={styles.resetText}>No result</Text>
  </View>

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.violet} />;
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <ElevatedView elevation={5} style={[ApplicationStyles.header, styles.header]}>
          <SquareButton name={'ios-menu'} onPress={this._openDrawer} />
          <View style={ApplicationStyles.searchHeader}>
            <TextInput value={this.state.search}
              onChangeText={text => this.setState({ search: text })}
              onSubmitEditing={this._onSearch}
              placeholder={'Search event...'}
              style={ApplicationStyles.searchInput} />
            <SquareButton name={'ios-search'} onPress={this._onSearch}
              style={ApplicationStyles.searchButton} />
          </View>
          <SquareButton name={'ios-more'} onPress={this._toggleFilter} />
        </ElevatedView>

        {/* FILTER */}
        {this.state.isFilter &&
          <View style={styles.filterContainer}>
            <IdolNameRow name={this.state.idol} selectIdol={this._selectIdol} />
            <MainUnitRow main_unit={this.state.main_unit} selectMainUnit={this._selectMainUnit} />
            <SkillRow skill={this.state.skill} selectSkill={this._selectSkill} />
            <AttributeRow attribute={this.state.attribute} selectAttribute={this._selectAttribute} />
            <RegionRow japan_only={this.state.is_english} selectRegion={this._selectRegion} />
            <Touchable onPress={this._resetFilter} useForeground
              style={styles.resetView}>
              <Text style={styles.resetText}>RESET</Text>
            </Touchable>
          </View>}

        {/* LIST */}
        <FlatList data={this.state.list}
          contentContainerStyle={styles.content}
          initialNumToRender={6}
          keyExtractor={this._keyExtractor}
          style={styles.list}
          ListEmptyComponent={this.renderEmpty}
          ListFooterComponent={this.renderFooter}
          onEndReached={this._onEndReached}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);
