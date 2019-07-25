import React from 'react';
import {
  View, FlatList, Text,
  TextInput, Alert, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import ElevatedView from 'react-native-elevated-view';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';

import ConnectStatus from '~/Components/ConnectStatus';
import Fade from '~/Components/Fade/Fade';
import SkillRow from '~/Components/SkillRow';
import EventItem from '~/Components/EventItem/EventItem';
import RegionRow from '~/Components/RegionRow/RegionRow';
import Touchable from '~/Components/Touchable/Touchable';
import IdolNameRow from '~/Components/IdolNameRow';
import MainUnitRow from '~/Components/MainUnitRow/MainUnitRow';
import AttributeRow from '~/Components/AttributeRow/AttributeRow';
import SquareButton from '~/Components/SquareButton/SquareButton';
import SplashScreen from '../SplashScreen/SplashScreen';
import { Colors, ApplicationStyles, Images } from '~/Theme';
import styles from './styles';
import LLSIFService from '~/Services/LLSIFService';
import { loadSettings } from '~/Utils';

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
export default class EventsScreen extends React.Component {
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
    this.onEndReached = _.debounce(this.onEndReached, 500);
  }

  static propTypes = {
    isConnected: PropTypes.bool,
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => <Icon name='md-calendar' size={30}
      color={focused ? Colors.pink : Colors.inactive} />,
    tabBarLabel: 'Events',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive,
    },
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      if (this.state.list.length === 0) {
        loadSettings().then((res) => {
          this.setState({
            is_english: res.worldwide_only ? 'False' : '',
            isLoading: true,
          }, () => this.getEvents());
        });
      }
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  /**
   * Key extractor for FlatList
   *
   * @memberof EventsScreen
   */
  keyExtractor = item => `event ${item.japanese_name}`;

  /**
   * Render item in FlatList
   *
   * @memberof EventsScreen
   */
  renderItem = ({ item }) => <EventItem item={item} onPress={this.navigateToEventDetail(item)} />;

  /**
   * Navigate to Event Detail Screen
   *
   * @param {Object} item
   * @memberof EventsScreen
   */
  navigateToEventDetail = item => () => {
    if (this.props.isConnected) {
      this.props.navigation.navigate('EventDetailScreen', { eventName: item.japanese_name });
    }
  }

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   *
   * @memberof CardsScreen
   */
  onEndReached = () => {
    if (this.state.stopSearch) return;
    this.getEvents();
  }

  /**
   * Get event list
   *
   * @param {Number} [page=this.state.page] Page number
   * @memberof EventsScreen
   */
  getEvents(page = this.state.page) {
    if (this.props.isConnected === false) {
      this.setState({ isLoading: false });
      return;
    }
    const theFilter = {
      ordering: this.state.ordering,
      page_size: this.state.page_size,
      page,
    };
    if (this.state.idol !== 'All') theFilter.idol = this.state.idol;
    if (this.state.skill !== 'All') theFilter.skill = this.state.skill;
    let isEnglish = this.state.is_english;
    if (isEnglish !== '') {
      if (isEnglish === 'True') isEnglish = 'False';
      else isEnglish = 'True';
      theFilter.is_english = isEnglish;
    }
    if (this.state.main_unit !== '') theFilter.main_unit = this.state.main_unit;
    if (this.state.attribute !== '') theFilter.attribute = this.state.attribute;
    if (this.state.search !== '') theFilter.search = this.state.search;
    // eslint-disable-next-line no-console
    console.log(`Events.getEvents ${JSON.stringify(theFilter)}`);
    LLSIFService.fetchEventList(theFilter).then((result) => {
      if (result === 404) {
        // console.log('LLSIFService.fetchEventList 404');
        this.setState({ stopSearch: true });
      } else {
        let x = [...this.state.list, ...result];
        // eslint-disable-next-line max-len
        x = x.filter((thing, index, self) => index === self.findIndex(t => t.japanese_name === thing.japanese_name));
        this.setState({
          list: x,
          isLoading: false,
          page: page + 1,
        });
      }
    }).catch((err) => {
      Alert.alert('Error', 'Error when get songs',
        // eslint-disable-next-line no-console
        [{ text: 'OK', onPress: () => console.log('OK Pressed', err) }]);
    });
  }

  /**
   * Open drawer
   *
   * @memberof EventsScreen
   */
  openDrawer = () => this.props.navigation.openDrawer();

  /**
   * Call when pressing search button
   *
   * @memberof EventsScreen
   */
  onSearch = () => {
    this.setState({
      list: [], page: 1, isFilter: false, stopSearch: false,
    });
    this.getEvents(1);
  }

  /**
   * Reset filter
   *
   * @memberof EventsScreen
   */
  resetFilter = () => {
    this.setState({
      ordering: this.defaultFilter.ordering,
      page_size: this.defaultFilter.page_size,
      page: this.defaultFilter.page,
      idol: this.defaultFilter.idol,
      search: this.defaultFilter.search,
      main_unit: this.defaultFilter.main_unit,
      skill: this.defaultFilter.skill,
      attribute: this.defaultFilter.attribute,
      is_english: this.defaultFilter.is_english,
    });
  }

  /**
   * Filter on/off
   *
   * @memberof EventsScreen
   */
  toggleFilter = () => this.setState({ isFilter: !this.state.isFilter });

  /**
   * Save `attribute`
   *
   * @param {String} value
   * @memberof EventsScreen
   */
  selectAttribute = value => () => this.setState({ attribute: value });

  /**
   * Save `main_unit`
   *
   * @param {String} value
   * @memberof EventsScreen
   */
  selectMainUnit = value => () => this.setState({ main_unit: value });

  /**
   * Save `is_english`
   *
   * @param {String} value
   * @memberof EventsScreen
   */
  selectRegion = value => () => this.setState({ is_english: value });

  /**
   * Save `skill`
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof EventsScreen
   */
  selectSkill = itemValue => this.setState({ skill: itemValue });

  /**
   * Save `idol`
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof EventsScreen
   */
  selectIdol = itemValue => this.setState({ idol: itemValue });

  /**
   * Render footer of FlatList
   *
   * @memberof EventsScreen
   */
  renderFooter = <View style={[ApplicationStyles.center, styles.margin10]}>
    <Image source={Images.alpaca} />
  </View>

  renderEmpty = <View style={styles.margin10}>
    <Text style={styles.resetText}>No result</Text>
  </View>

  render() {
    return (
      <View style={styles.container}>
        <Fade visible={this.state.isLoading}
          style={[ApplicationStyles.screen, ApplicationStyles.absolute]}>
          <SplashScreen bgColor={Colors.violet} />
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
                placeholder={'Search event...'}
                style={ApplicationStyles.searchInput} />
              <SquareButton name={'ios-search'} onPress={this.onSearch}
                style={ApplicationStyles.searchButton} />
            </View>
            <SquareButton name={'ios-more'} onPress={this.toggleFilter} />
          </ElevatedView>

          {/* FILTER */}
          {this.state.isFilter
            && <ElevatedView elevation={5} style={styles.filterContainer}>
              <IdolNameRow name={this.state.idol} selectIdol={this.selectIdol} />
              <MainUnitRow mainUnit={this.state.main_unit} selectMainUnit={this.selectMainUnit} />
              <SkillRow skill={this.state.skill} selectSkill={this.selectSkill} />
              <AttributeRow attribute={this.state.attribute}
                selectAttribute={this.selectAttribute} />
              <RegionRow japanOnly={this.state.is_english} selectRegion={this.selectRegion} />
              <Touchable onPress={this.resetFilter} useForeground
                style={styles.resetView}>
                <Text style={styles.resetText}>RESET</Text>
              </Touchable>
            </ElevatedView>}
          <ConnectStatus />
          {/* LIST */}
          <FlatList data={this.state.list}
            contentContainerStyle={styles.content}
            initialNumToRender={6}
            keyExtractor={this.keyExtractor}
            style={styles.list}
            ListEmptyComponent={this.renderEmpty}
            ListFooterComponent={this.renderFooter}
            onEndReached={this.onEndReached}
            renderItem={this.renderItem} />
        </Fade>
      </View>
    );
  }
}
