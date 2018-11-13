import React from 'react'
import { View, FlatList, Text, TextInput, Alert, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import SkillRow from '../../Components/SkillRow/SkillRow'
import EventItem from '../../Components/EventItem/EventItem'
import RegionRow from '../../Components/RegionRow/RegionRow'
import IdolNameRow from '../../Components/IdolNameRow/IdolNameRow'
import MainUnitRow from '../../Components/MainUnitRow/MainUnitRow'
import AttributeRow from '../../Components/AttributeRow/AttributeRow'
import SquareButton from '../../Components/SquareButton/SquareButton'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Colors, ApplicationStyles } from '../../Theme'
import styles from './styles'
import { LLSIFService } from '../../Services/LLSIFService'

const defaultFilter = {
  ordering: '-beginning',
  page_size: 30,
  page: 1,
  idol: 'All',
  search: '',
  main_unit: '',
  skill: 'All',
  attribute: '',
  is_english: ''
}

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
    super(props)
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
      is_english: ''
    }
    this._onEndReached = _.debounce(this._onEndReached, 500)
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon name='md-calendar' size={30} color={focused ? Colors.pink : Colors.inactive} />
    ),
    tabBarLabel: 'Events',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  componentDidMount() {
    this.getEvents()
  }

  /**
   * Key extractor for FlatList
   *
   * @memberof EventsScreen
   */
  _keyExtractor = (item, index) => `event ${item.japanese_name}`

  /**
   * Render item in FlatList
   *
   * @memberof EventsScreen
   */
  _renderItem = ({ item }) => <EventItem item={item} onPress={this.navigateToEventDetail(item)} />

  /**
   * Navigate to Event Detail Screen
   *
   * @param {Object} item
   * @memberof EventsScreen
   */
  navigateToEventDetail = (item) => () => this.props.navigation.navigate('EventDetailScreen', { eventName: item.japanese_name })

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    if (this.state.stopSearch) return
    this.getEvents()
  }

  /**
   * Get event list
   *
   * @param {Number} [page=this.state.page] Page number
   * @memberof EventsScreen
   */
  getEvents(page = this.state.page) {
    var _filter = {
      ordering: this.state.ordering,
      page_size: this.state.page_size,
      page: page
    }
    if (this.state.idol !== 'All') _filter.idol = this.state.idol
    if (this.state.skill !== 'All') _filter.skill = this.state.skill
    var _is_english = this.state.is_english
    if (_is_english.length !== 0) {
      if (_is_english === 'True') _is_english = 'False'
      else _is_english = 'True'
      _filter.is_english = _is_english
    }
    if (this.state.main_unit.length !== 0) _filter.main_unit = this.state.main_unit
    if (this.state.attribute.length !== 0) _filter.attribute = this.state.attribute
    if (this.state.search.length != 0) _filter.search = this.state.search
    console.log(`========== Events.getEvents`, _filter)
    LLSIFService.fetchEventList(_filter).then((result) => {
      if (_.isString(result)) {
        this.setState({ stopSearch: true })
      } else {
        var x = [...this.state.list, ...result]
        x = x.filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t.japanese_name === thing.japanese_name
          ))
        )
        this.setState({
          list: x,
          isLoading: false,
          page: page + 1
        })
      }
    }).catch((err) => {
      Alert.alert('Error', 'Error when get songs',
        [{ text: 'OK', onPress: () => console.log('OK Pressed', err) }])
    })
  }
  /**
   * Call when pressing search button
   *
   * @memberof EventsScreen
   */
  onSearch = () => {
    this.setState({ list: [], page: 1, isFilter: false, stopSearch: false })
    this.getEvents(1)
  }

  /**
   * Reset filter
   *
   * @memberof EventsScreen
   */
  resetFilter = () => {
    this.setState({
      ordering: defaultFilter.ordering,
      page_size: defaultFilter.page_size,
      page: defaultFilter.page,
      idol: defaultFilter.idol,
      search: defaultFilter.search,
      main_unit: defaultFilter.main_unit,
      skill: defaultFilter.skill,
      attribute: defaultFilter.attribute,
      is_english: defaultFilter.is_english
    })
  }

  /**
   * Filter on/off
   *
   * @memberof EventsScreen
   */
  toggleFilter = () => this.setState({ isFilter: !this.state.isFilter })

  /**
   * Save `attribute`
   *
   * @param {String} value
   * @memberof EventsScreen
   */
  selectAttribute = (value) => () => this.setState({ attribute: value })

  /**
   * Save `main_unit`
   *
   * @param {String} value
   * @memberof EventsScreen
   */
  selectMainUnit = (value) => () => this.setState({ main_unit: value })

  /**
   * Save `is_english`
   * 
   * @param {String} value
   * @memberof EventsScreen
   */
  selectRegion = (value) => () => this.setState({ is_english: value })

  /**
   * Save `skill`
   * 
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof EventsScreen
   */
  selectSkill = (itemValue, itemIndex) => this.setState({ skill: itemValue })

  /**
   * Save `idol`
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof EventsScreen
   */
  selectIdol = (itemValue, itemIndex) => this.setState({ idol: itemValue })

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.violet} />
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[ApplicationStyles.header, styles.header]}>
          <TextInput style={styles.textInput}
            onChangeText={text => this.setState({ search: text })}
            onSubmitEditing={this.onSearch}
            placeholder={'Type here...'}
            value={this.state.search} />
          <SquareButton name={'ios-search'} onPress={this.onSearch} />
          <SquareButton name={'ios-more'} onPress={this.toggleFilter} />
        </View>

        {/* FILTER */}
        {this.state.isFilter &&
          <View style={styles.filterContainer}>
            <IdolNameRow name={this.state.idol} selectIdol={this.selectIdol} />
            <MainUnitRow main_unit={this.state.main_unit} selectMainUnit={this.selectMainUnit} />
            <SkillRow skill={this.state.skill} selectSkill={this.selectSkill} />
            <AttributeRow attribute={this.state.attribute} selectAttribute={this.selectAttribute} />
            <RegionRow japan_only={this.state.is_english} selectRegion={this.selectRegion} />
            <View style={styles.resetView}>
              <TouchableOpacity onPress={this.resetFilter}
                style={styles.resetButton}>
                <Text style={styles.resetText}>RESET</Text>
              </TouchableOpacity>
            </View>
          </View>}

        {/* LIST */}
        <FlatList
          contentContainerStyle={styles.content}
          data={this.state.list}
          initialNumToRender={6}
          keyExtractor={this._keyExtractor}
          style={styles.list}
          onEndReached={this._onEndReached}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen)
