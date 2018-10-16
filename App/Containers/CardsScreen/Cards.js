import React from 'react'
import { Text, View, FlatList, TextInput, Picker, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import { getIdols, getSchools, getSkills, getSubunits } from '../../Stores/CachedData/Selectors'
import SquareButton from '../../Components/SquareButton/SquareButton'
import CardItem from '../../Components/CardItem/CardItem'
import SplashScreen from '../SplashScreen/SplashScreen'
import { LLSIFService } from '../../Services/LLSIFService'
import { Colors, ApplicationStyles, Images } from '../../Theme'
import styles from './styles'

const PickerItem = Picker.Item
const defaultFilter = {
  ordering: '-release_date',
  page_size: 20,
  page: 1,
  name: '',
  rarity: '',
  attribute: '',
  // japan_only: 'False',
  is_promo: '',
  is_special: '',
  is_event: '',
  skill: '',
  idol_main_unit: '',
  idol_sub_unit: '',
  idol_school: '',
  idol_year: ''
}

/**
 *Màn hình danh sách card
 *
 * @class CardsScreen
 * @extends {React.PureComponent}
 */
class CardsScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: [],
      isFilter: false,
      filter: {
        ordering: '-release_date',
        page_size: 20,
        page: 1,
        name: '',
        rarity: '',
        attribute: '',
        // japan_only: 'on',
        is_promo: '',
        is_special: '',
        is_event: '',
        skill: '',
        idol_main_unit: '',
        idol_sub_unit: '',
        idol_school: '',
        idol_year: ''
      }
    }
    this._onEndReached = _.debounce(this._onEndReached, 500)
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

  /**
   *Key extractor
   *
   * @memberof CardsScreen
   */
  _keyExtractor = (item, index) => `card${item.id}`

  /**
   *Render item trong FlatList
   *
   * @memberof CardsScreen
   */
  _renderItem = ({ item }) => (
    <CardItem item={item} onPress={() => this.navigateToCardDetail(item)} />
  )

  /**
   *Lấy danh sách card
   *
   * @memberof CardsScreen
   */
  getCards() {
    console.log(`========== Cards.getCards.page ${this.state.filter.page} ==========`)
    LLSIFService.fetchCardList(this.state.filter).then((result) => {
      result.sort((a, b) => {
        return a.id < b.id
      })
      var x = [...this.state.data, ...result]
      x = x.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.id === thing.id
        ))
      )
      var _filter = this.state.filter
      _filter.page++
      this.setState({
        data: x,
        isLoading: false,
        filter: _filter
      })
    }).catch((err) => {
      //  TODO
    })
  }

  /**
   *Khi scroll đến cuối danh sách
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    this.getCards()
  }

  /**
   *Chuyển đến trang thông tin card
   *
   * @param {Object} item Thông tin của card đó
   * @memberof CardsScreen
   */
  navigateToCardDetail(item) {
    this.props.navigation.navigate('CardDetailScreen', { item: item })
  }

  componentDidMount() {
    this.getCards()
  }

  /**
   *Bật tắt bộ lọc
   *
   * @memberof CardsScreen
   */
  toggleFilter = () => {
    this.setState({ isFilter: !this.state.isFilter })
  }

  /**
   *Tìm kiếm theo bộ lọc
   *
   * @memberof CardsScreen
   */
  onSearch = () => {
    var _filter = this.state.filter
    _filter.page = 1
    this.setState({ data: [], filter: _filter, isFilter: false })
    console.log(`========= Cards.onSearch: ${_filter} =========`)
    this.getCards()
  }

  /**
   *Lưu is_promo vào filter
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectPromo(value) {
    var _filter = this.state.filter
    _filter.is_promo = value
    this.setState({ filter: _filter })
  }

  /**
   *Lưu is_special vào filter
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectSpecial(value) {
    var _filter = this.state.filter
    _filter.is_special = value
    this.setState({ filter: _filter })
  }

  /**
   *Lưu is_event vào filter
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectEvent(value) {
    var _filter = this.state.filter
    _filter.is_event = value
    this.setState({ filter: _filter })
  }

  /**
   *Lưu idol_main_unit vào filter
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectMainUnit(value) {
    var _filter = this.state.filter
    _filter.idol_main_unit = value
    this.setState({ filter: _filter })
  }

  /**
   *Lưu rarity vào filter
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectRarity(value) {
    var _filter = this.state.filter
    _filter.rarity = value
    this.setState({ filter: _filter })
  }

  /**
   *Lưu attribute vào filter
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectAttribute(value) {
    var _filter = this.state.filter
    _filter.attribute = value
    this.setState({ filter: _filter })
  }

  /**
   *Lưu idol_year vào filter
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectYear(value) {
    var _filter = this.state.filter
    _filter.idol_year = value
    this.setState({ filter: _filter })
  }

  /**
   *Lưu idol_sub_unit vào filter
   *
   * @memberof CardsScreen
   */
  selectSubUnit = (itemValue, itemIndex) => {
    var _filter = this.state.filter
    _filter.idol_sub_unit = itemValue == 'All' ? '' : itemValue
    this.setState({ filter: _filter })
  }

  /**
   *Lưu name vào filter
   *
   * @memberof CardsScreen
   */
  selectIdol = (itemValue, itemIndex) => {
    var _filter = this.state.filter
    _filter.name = itemValue == 'All' ? '' : itemValue
    this.setState({ filter: _filter })
  }

  /**
   *Lưu school vào filter
   *
   * @memberof CardsScreen
   */
  selectSchool = (itemValue, itemIndex) => {
    var _filter = this.state.filter
    _filter.school = itemValue == 'All' ? '' : itemValue
    this.setState({ filter: _filter })
  }

  render() {
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.green} />
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[ApplicationStyles.header, styles.header]}>
          <TextInput style={{ flex: 1, borderColor: '#333', borderWidth: 1.5, margin: 6 }}
            onFocus={e => {
              this.setState({ onSearchFocus: true })
            }}
          />
          <SquareButton name={'ios-search'} onPress={this.onSearch} />
          <SquareButton name={'ios-more'} onPress={this.toggleFilter} />
        </View>
        {/* FILTER */}
        {this.state.isFilter &&
          <View style={{ width: '100%', backgroundColor: 'white', padding: 10 }}>
            {/* IDOL NAME */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Idol</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.filter.idol}
                  onValueChange={this.selectIdol}
                  style={{ borderColor: 'black', borderWidth: 1 }}
                >
                  {this.props.idols.map((item, index) =>
                    <PickerItem key={'idol' + index} label={item} />)}
                </Picker>
              </View>
            </View>

            {/* RARITY */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Rarity</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.button, { paddingLeft: 0 }]}
                  onPress={() => this.selectRarity('')}>
                  <Image source={Images.empty} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectRarity('N')}>
                  <Image source={Images.rarity[0]} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectRarity('R')}>
                  <Image source={Images.rarity[1]} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectRarity('SR')}>
                  <Image source={Images.rarity[2]} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectRarity('SSR')}>
                  <Image source={Images.rarity[3]} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectRarity('UR')}>
                  <Image source={Images.rarity[4]} style={styles.buttonImage} />
                </TouchableOpacity>
              </View>
            </View>

            {/* ATTRIBUTE */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Attribute</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity style={[styles.button, { paddingLeft: 0 }]}
                  onPress={() => this.selectAttribute('')}>
                  <Image source={Images.empty} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectAttribute('Smile')}>
                  <Image source={Images.attribute[0]} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectAttribute('Pure')}>
                  <Image source={Images.attribute[1]} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectAttribute('Cool')}>
                  <Image source={Images.attribute[2]} style={styles.buttonImage} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                  onPress={() => this.selectAttribute('All')}>
                  <Image source={Images.attribute[3]} style={styles.buttonImage} />
                </TouchableOpacity>
              </View>
            </View>

            {/* REGION */}
            {/* <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Worldwide only</Text>
              </View>
              <Switch value={this.state.filter.japan_only == 'on' ? true : false}
                onValueChange={value => {
                  var _filter = this.state.filter
                  _filter.japan_only = value ? 'on' : ''
                  this.setState({ filter: _filter })
                }} />
            </View> */}

            {/* PROMO */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Promo card</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.selectPromo('')}
                  style={[styles.button,
                  this.state.filter.is_promo == '' && styles.selectedValue
                  ]}>
                  <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectPromo('True')}
                  style={[styles.button,
                  this.state.filter.is_promo == 'True' && styles.selectedValue
                  ]}>
                  <Text style={styles.buttonText}>Only</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectPromo('False')}
                  style={[styles.button,
                  this.state.filter.is_promo == 'False' && styles.selectedValue]}
                >
                  <Text style={styles.buttonText}>None</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* SPECIAL */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Special card</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.selectSpecial('')}
                  style={[styles.button,
                  this.state.filter.is_special == '' && styles.selectedValue
                  ]}>
                  <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectSpecial('True')}
                  style={[styles.button,
                  this.state.filter.is_special == 'True' && styles.selectedValue
                  ]}>
                  <Text style={styles.buttonText}>Only</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectSpecial('False')}
                  style={[styles.button,
                  this.state.filter.is_special == 'False' && styles.selectedValue]}
                >
                  <Text style={styles.buttonText}>None</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* EVENT */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Event card</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.selectEvent('')}
                  style={[styles.button,
                  this.state.filter.is_event == '' && styles.selectedValue
                  ]}>
                  <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectEvent('True')}
                  style={[styles.button,
                  this.state.filter.is_event == 'True' && styles.selectedValue
                  ]}>
                  <Text style={styles.buttonText}>Only</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectEvent('False')}
                  style={[styles.button,
                  this.state.filter.is_event == 'False' && styles.selectedValue]}
                >
                  <Text style={styles.buttonText}>None</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* SKILL */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Skill</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.filter.skill}
                  onValueChange={(itemValue, itemIndex) => {
                    var _filter = this.state.filter
                    _filter.skill = itemValue
                    this.setState({ filter: _filter })
                  }}>
                  {this.props.skills.map((item, index) =>
                    <PickerItem key={'skill' + index} label={item} />)}
                </Picker>
              </View>
            </View>

            {/* MAIN UNIT */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Main unit</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.selectMainUnit('')}
                  style={[styles.button,
                  this.state.filter.idol_main_unit == '' && styles.selectedValue
                  ]}>
                  <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectMainUnit(`μ's`)}
                  style={[styles.button,
                  this.state.filter.idol_main_unit == `μ's` && styles.selectedValue
                  ]}>
                  <Text style={styles.buttonText}>{`μ's`}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectMainUnit('Aqours')}
                  style={[styles.button,
                  this.state.filter.idol_main_unit == 'False' && styles.selectedValue]}
                >
                  <Text style={styles.buttonText}>Aqours</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* SUB UNIT */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Sub unit</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.filter.sub_unit}
                  onValueChange={this.selectSubUnit}>
                  {this.props.subUnits.map((item, index) =>
                    <PickerItem key={'subUnit' + index} label={item} />)}
                </Picker>
              </View>
            </View>

            {/* SCHOOL */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>School</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.filter.school}
                  onValueChange={this.selectSchool}>
                  {this.props.schools.map((item, index) =>
                    <PickerItem key={'school' + index} label={item} />)}
                </Picker>
              </View>
            </View>

            {/* YEAR */}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftView}>
                <Text>Year</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.selectYear('')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectYear('First')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>1st</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectYear('Second')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>2nd</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectYear('Third')}
                  style={styles.button}>
                  <Text style={styles.buttonText}>3rd</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* RESET BUTTON */}
            <View style={{ alignItems: 'stretch' }}>
              <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetText}>RESET</Text>
              </TouchableOpacity>
            </View>
          </View>}

        {/* CARD LIST */}
        <FlatList
          data={this.state.data}
          numColumns={2}
          initialNumToRender={4}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
          style={styles.list}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  /** Danh sách idol */
  idols: getIdols(state),
  /** Danh sách trường */
  schools: getSchools(state),
  /** Danh sách sub unit */
  subUnits: getSubunits(state),
  /** Danh sách skill */
  skills: getSkills(state)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsScreen)
