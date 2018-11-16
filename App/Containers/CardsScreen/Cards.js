import React from 'react'
import { Text, View, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import { getWorldwideOnly } from '../../Stores/Settings/Selectors'
import YearRow from '../../Components/YearRow/YearRow'
import CardItem from '../../Components/CardItem/CardItem'
import EventRow from '../../Components/EventRow/EventRow'
import SkillRow from '../../Components/SkillRow/SkillRow'
import RarityRow from '../../Components/RarityRow/RarityRow'
import RegionRow from '../../Components/RegionRow/RegionRow'
import SchoolRow from '../../Components/SchoolRow/SchoolRow'
import SubUnitRow from '../../Components/SubUnitRow/SubUnitRow'
import IdolNameRow from '../../Components/IdolNameRow/IdolNameRow'
import MainUnitRow from '../../Components/MainUnitRow/MainUnitRow'
import AttributeRow from '../../Components/AttributeRow/AttributeRow'
import PromoCardRow from '../../Components/PromoCardRow/PromoCardRow'
import SquareButton from '../../Components/SquareButton/SquareButton'
import SpecialCardRow from '../../Components/SpecialCardRow/SpecialCardRow'
import { LLSIFService } from '../../Services/LLSIFService'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Colors, ApplicationStyles } from '../../Theme'
import styles from './styles'

/**
 * [Card List Screen](https://github.com/MagiCircles/SchoolIdolAPI/wiki/API-Cards#get-the-list-of-cards)
 * 
 * State:
 * - `isLoading`: Loading state
 * - `data`: Data for FlatList
 * - `isFilter`: Filter on/off
 * - `stopSearch`: Prevent calling API
 * - `search`: Keyword for search
 * - `ordering`: Ordering by any field (See link above)
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
class CardsScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.defaultFilter = {
      search: '',
      ordering: '-release_date',
      page_size: 30,
      page: 1,
      name: 'All',
      rarity: '',
      attribute: '',
      japan_only: this.props.worldwideOnly ? 'False' : '',
      is_promo: '',
      is_special: '',
      is_event: '',
      skill: 'All',
      idol_main_unit: '',
      idol_sub_unit: 'All',
      idol_school: 'All',
      idol_year: ''
    }
    this.state = {
      isLoading: true,
      data: [],
      isFilter: false,
      stopSearch: false,
      search: '',
      ordering: '-game_id',
      page_size: 30,
      page: 1,
      name: 'All',
      rarity: '',
      attribute: '',
      japan_only: this.props.worldwideOnly ? 'False' : '',
      is_promo: '',
      is_special: '',
      is_event: '',
      skill: 'All',
      idol_main_unit: '',
      idol_sub_unit: 'All',
      idol_school: 'All',
      idol_year: ''
    }
    this._onEndReached = _.debounce(this._onEndReached, 1000)
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon name='ios-photos' size={30} color={focused ? Colors.pink : Colors.inactive} />
    ),
    tabBarLabel: 'Cards',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  componentDidMount() {
    this.setState({ japan_only: this.props.worldwideOnly ? 'False' : '' })
    this.getCards()
  }

  /**
   * Key extractor in FlatList
   *
   * @memberof CardsScreen
   */
  _keyExtractor = (item, index) => `card ${item.id}`

  /**
   * Render item in FlatList
   *
   * @memberof CardsScreen
   */
  _renderItem = ({ item }) => <CardItem item={item} onPress={this.navigateToCardDetail(item)} />

  /**
   * Navigate to Card Detail Screen
   *
   * @param {Object} item Card's information
   * @memberof CardsScreen
   */
  navigateToCardDetail = (item) => () => this.props.navigation.navigate('CardDetailScreen', { item: item })

  /**
   * Get card list
   *
   * @param {Number} [page=this.state.page] Page number
   * @memberof CardsScreen
   */
  getCards(page = this.state.page) {
    let _skill = this.state.skill
    let _name = this.state.name
    let _sub_unit = this.state.idol_sub_unit
    let _school = this.state.idol_school
    let _filter = {
      ordering: this.state.ordering,
      page_size: this.state.page_size,
      page: page,
      name: _name === 'All' ? '' : _name,
      rarity: this.state.rarity,
      attribute: this.state.attribute,
      japan_only: this.state.japan_only,
      is_promo: this.state.is_promo,
      is_special: this.state.is_special,
      is_event: this.state.is_event,
      skill: _skill === 'All' ? '' : _skill,
      idol_main_unit: this.state.idol_main_unit,
      idol_sub_unit: _sub_unit === 'All' ? '' : _sub_unit,
      idol_school: _school === 'All' ? '' : _school,
      idol_year: this.state.idol_year
    }
    if (this.state.search != '') { _filter.search = this.state.search }
    console.log(`========== Cards.getCards`, _filter)
    LLSIFService.fetchCardList(_filter).then((result) => {
      if (_.isString(result)) {
        this.setState({ stopSearch: true })
      } else {
        var x = [...this.state.data, ...result]
        x = x.filter((thing, index, self) =>
          index === self.findIndex((t) => (
            t.id === thing.id
          ))
        )
        this.setState({
          data: x,
          isLoading: false,
          page: page + 1
        })
      }
    }).catch((err) => {
      Alert.alert('Error', 'Error when get cards',
        [{ text: 'OK', onPress: () => console.log('OK Pressed', err) }])
    })
  }

  /**
   * Call when pressing search button
   *
   * @memberof CardsScreen
   */
  onSearch = () => {
    this.setState({ data: [], isFilter: false, stopSearch: false })
    this.getCards(1)
  }

  /**
   * Call when scrolling to the end of list.
   * stopSearch prevents calling getCards when no card was found (404).
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    if (this.state.stopSearch) return
    this.getCards()
  }

  /**
   * Filter on/off
   *
   * @memberof CardsScreen
   */
  toggleFilter = () => this.setState({ isFilter: !this.state.isFilter })

  /**
   * Save is_promo
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectPromo = (value) => () => this.setState({ is_promo: value })

  /**
   * Save is_special
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectSpecial = (value) => () => this.setState({ is_special: value })

  /**
   * Save is_event
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectEvent = (value) => () => this.setState({ is_event: value })

  /**
   * Save idol_main_unit
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectMainUnit = (value) => () => this.setState({ idol_main_unit: value })

  /**
   * Save rarity
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectRarity = (value) => () => this.setState({ rarity: value })

  /**
   * Save attribute
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectAttribute = (value) => () => this.setState({ attribute: value })

  /**
   * Save idol_year
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectYear = (value) => () => this.setState({ idol_year: value })

  /**
   * Save region
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectRegion = (value) => () => this.setState({ japan_only: value })

  /**
   * Save idol_sub_unit
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectSubUnit = (itemValue, itemIndex) => this.setState({ idol_sub_unit: itemValue })

  /**
   * Save idol name
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectIdol = (itemValue, itemIndex) => this.setState({ name: itemValue })

  /**
   * Save school
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectSchool = (itemValue, itemIndex) => this.setState({ idol_school: itemValue })

  /**
   * Save skill
   *
   * @param {String} itemValue
   * @param {String} itemIndex unused
   * @memberof CardsScreen
   */
  selectSkill = (itemValue, itemIndex) => this.setState({ skill: itemValue })

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
      search: ''
    })
  }

  /**
   * Render footer of FlatList
   *
   * @memberof CardsScreen
   */
  renderFooter = () => <View style={[ApplicationStyles.center, { margin: 10 }]}>
    <Text>End results</Text>
  </View>

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.green} />
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
            <IdolNameRow name={this.state.name} selectIdol={this.selectIdol} />
            <RarityRow rarity={this.state.rarity} selectRarity={this.selectRarity} />
            <AttributeRow attribute={this.state.attribute} selectAttribute={this.selectAttribute} />
            <RegionRow japan_only={this.state.japan_only} selectRegion={this.selectRegion} />
            <PromoCardRow is_promo={this.state.is_promo} selectPromo={this.selectPromo} />
            <SpecialCardRow is_special={this.state.is_special} selectSpecial={this.selectSpecial} />
            <EventRow is_event={this.state.is_event} selectEvent={this.selectEvent} />
            <SkillRow skill={this.state.skill} selectSkill={this.selectSkill} />
            <MainUnitRow main_unit={this.state.idol_main_unit} selectMainUnit={this.selectMainUnit} />
            <SubUnitRow idol_sub_unit={this.state.idol_sub_unit} selectSubUnit={this.selectSubUnit} />
            <SchoolRow idol_school={this.state.idol_school} selectSchool={this.selectSchool} />
            <YearRow idol_year={this.state.idol_year} selectYear={this.selectYear} />

            {/* RESET BUTTON */}
            <View style={styles.resetView}>
              <TouchableOpacity onPress={this.resetFilter}
                style={styles.resetButton}>
                <Text style={styles.resetText}>RESET</Text>
              </TouchableOpacity>
            </View>
          </View>}

        {/* LIST */}
        <FlatList
          data={this.state.data}
          numColumns={2}
          initialNumToRender={8}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
          style={styles.list}
          ListFooterComponent={this.renderFooter}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  worldwideOnly: getWorldwideOnly(state)
})

const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(CardsScreen)
