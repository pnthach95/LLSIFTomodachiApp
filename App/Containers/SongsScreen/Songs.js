import React from 'react'
import { View, FlatList, TextInput, Alert, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import SongItem from '../../Components/SongItem/SongItem'
import EventRow from '../../Components/EventRow/EventRow'
import MainUnitRow from '../../Components/MainUnitRow/MainUnitRow'
import AttributeRow from '../../Components/AttributeRow/AttributeRow'
import SquareButton from '../../Components/SquareButton/SquareButton'
import SplashScreen from '../SplashScreen/SplashScreen'
import { LLSIFService } from '../../Services/LLSIFService'
import { Colors, ApplicationStyles } from '../../Theme'
import styles from './styles'

const defaultFilter = {
  ordering: '-id',
  page_size: 20,
  page: 1,
  expand_event: '',
  search: '',
  attribute: '',
  is_event: '',
  is_daily_rotation: '',
  available: '',
  main_unit: ''
}

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
    super(props)
    this.state = {
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
      stopSearch: false
    }
    this._onEndReached = _.debounce(this._onEndReached, 500)
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon name='ios-musical-notes' size={30} color={focused ? Colors.pink : Colors.inactive} />
    ),
    tabBarLabel: 'Songs',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  componentDidMount() {
    this.getSongs()
  }

  /**
   * Key extractor for FlatList
   *
   * @memberof SongsScreen
   */
  _keyExtractor = (item, index) => `song ${item.name}`

  /**
   * Render item in FlatList
   *
   * @param {Object} item
   * @memberof SongsScreen
   */
  _renderItem = ({ item }) => <SongItem item={item} onPress={() => this.navigateToSongDetail(item)} />

  /**
   * Navigate to Song Detail Screen
   *
   * @param {Object} item
   * @memberof SongsScreen
   */
  navigateToSongDetail(item) {
    this.props.navigation.navigate('SongDetailScreen', { item: item })
  }

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    if (this.state.stopSearch) return
    this.getSongs()
  }

  getSongs(page = this.state.page) {
    let _filter = {
      ordering: this.state.ordering,
      page_size: this.state.page_size,
      page: page,
      expand_event: this.state.expand_event,
      attribute: this.state.attribute,
      is_event: this.state.is_event,
      // is_daily_rotation: this.state.is_daily_rotation,
      available: this.state.available,
      main_unit: this.state.main_unit
    }
    if (this.state.search != 0) { _filter.search = this.state.search }
    console.log(`========== Songs.getSongs`, _filter)
    LLSIFService.fetchSongList(_filter).then((result) => {
      if (_.isString(result)) {
        this.setState({ stopSearch: true })
      } else {
        var x = [...this.state.list, ...result]
        x = x.filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t.name === thing.name
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
   * Filter on/off
   *
   * @memberof SongsScreen
   */
  toggleFilter = () => this.setState({ isFilter: !this.state.isFilter })

  _openDrawer = () => this.props.navigation.openDrawer()

  /**
   * Call when pressing search button
   *
   * @memberof SongsScreen
   */
  onSearch = () => {
    this.setState({ list: [], page: 1, isFilter: false, stopSearch: false })
    this.getSongs(1)
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
      search: ''
    })
  }

  /**
   * Save `is_event`
   *
   * @param {String} value
   * @memberof SongsScreen
   */
  selectEvent = (value) => () => this.setState({ is_event: value })

  /**
   * Save `attribute`
   *
   * @memberof SongsScreen
   */
  selectAttribute = (value) => () => this.setState({ attribute: value })

  /**
   * Save `main_unit`
   *
   * @memberof SongsScreen
   */
  selectMainUnit = (value) => () => this.setState({ main_unit: value })

  /**
   * Render footer in FlatList
   */
  renderFooter = () => {
    return (
      <View style={[ApplicationStyles.center, { margin: 10 }]}>
        <Text>End result</Text>
      </View>)
  }

  render() {
    if (this.state.isLoading) return <SplashScreen />
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[ApplicationStyles.header, styles.header]}>
          <SquareButton name={'ios-menu'} onPress={this._openDrawer} />
          <TextInput style={ApplicationStyles.searchInput}
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
            <AttributeRow attribute={this.state.attribute} selectAttribute={this.selectAttribute} />
            <EventRow is_event={this.state.is_event} selectEvent={this.selectEvent} />
            <MainUnitRow main_unit={this.state.main_unit} selectMainUnit={this.selectMainUnit} />

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
          numColumns={2}
          keyExtractor={this._keyExtractor}
          style={styles.list}
          onEndReached={this._onEndReached}
          ListFooterComponent={this.renderFooter}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(SongsScreen)
