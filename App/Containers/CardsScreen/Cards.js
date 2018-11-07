import React from 'react'
import { Text, View, FlatList, TextInput, Picker, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import Spinkit from 'react-native-spinkit'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import { getIdols, getSchools, getSkills, getSubunits } from '../../Stores/CachedData/Selectors'
import SquareButton from '../../Components/SquareButton/SquareButton'
import CardItem from '../../Components/CardItem/CardItem'
import { LLSIFService } from '../../Services/LLSIFService'
import CardListActions from '../../Stores/CardList/Actions'
import { Colors, ApplicationStyles, Images } from '../../Theme'
import styles from './styles'

const PickerItem = Picker.Item
const defaultFilter = {
  ordering: '-release_date',
  page_size: 20,
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
      ordering: '-release_date',
      page_size: 20,
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

  /**
   * Key extractor
   *
   * @memberof CardsScreen
   */
  _keyExtractor = (item, index) => `card ${item.id}`

  /**
   * Render item trong FlatList
   *
   * @memberof CardsScreen
   */
  _renderItem = ({ item }) =>
    <CardItem item={item} onPress={this.navigateToCardDetail(item)} />

  /**
   * Chuyển đến trang thông tin card
   *
   * @param {Object} item Thông tin của card đó
   * @memberof CardsScreen
   */
  navigateToCardDetail = (item) => () => {
    this.props.navigation.navigate('CardDetailScreen', { item: item })
  }

  /**
   * Lấy danh sách card
   *
   * @memberof CardsScreen
   */
  getCards() {
    // console.log(`========== Cards.getCards.page ${this.state.filter.page} ==========`)
    let _skill = this.state.skill
    let _name = this.state.name
    let _sub_unit = this.state.idol_sub_unit
    let _school = this.state.idol_school
    let _filter = {
      ordering: this.state.ordering,
      page_size: this.state.page_size,
      page: this.state.page,
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
    LLSIFService.fetchCardList(_filter).then((result) => {
      result.sort((a, b) => {
        return a.id < b.id
      })
      var x = [...this.state.data, ...result]
      x = x.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.id === thing.id
        ))
      )

      this.setState({
        data: x,
        isLoading: false,
        page: this.state.page + 1
      })
    }).catch((err) => {
      //  TODO
    })
  }

  /**
   * Khi scroll đến cuối danh sách
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    this.getCards()
    // let _filter = {
    //   ordering: this.state.ordering,
    //   page_size: this.state.page_size,
    //   page: this.state.page,
    //   name: this.state.name,
    //   rarity: this.state.rarity,
    //   attribute: this.state.attribute,
    //   // japan_only: 'on',
    //   is_promo: this.state.is_promo,
    //   is_special: this.state.is_special,
    //   is_event: this.state.is_event,
    //   skill: this.state.skill,
    //   idol_main_unit: this.state.idol_main_unit,
    //   idol_sub_unit: this.state.idol_sub_unit,
    //   idol_school: this.state.idol_school,
    //   idol_year: this.state.idol_year
    // }
    // this.setState({
    //   isLoading: false
    // })
    // this.props.fetchCardList(filter)
  }

  componentDidMount() {
    this.getCards()
  }

  /**
   * Bật tắt bộ lọc
   *
   * @memberof CardsScreen
   */
  toggleFilter = () => this.setState({ isFilter: !this.state.isFilter })

  /**
   * Tìm kiếm theo bộ lọc
   *
   * @memberof CardsScreen
   */
  onSearch = () => {
    this.setState({ data: [], page: 1, isFilter: false })
    // console.log(`========= Cards.onSearch: ${_filter} =========`)
    this.getCards()
  }

  /**
   * Lưu is_promo
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectPromo = (value) => () => this.setState({ is_promo: value })

  renderPromo = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Promo card</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={this.selectPromo('')}
          style={[
            styles.button,
            this.state.is_promo == '' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectPromo('True')}
          style={[
            styles.button,
            this.state.is_promo == 'True' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>Only</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectPromo('False')}
          style={[
            styles.button,
            this.state.is_promo == 'False' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>None</Text>
        </TouchableOpacity>
      </View>
    </View>

  /**
   * Lưu is_special
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectSpecial = (value) => () => this.setState({ is_special: value })

  renderSpecial = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Special card</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={this.selectSpecial('')}
          style={[
            styles.button,
            this.state.is_special == '' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectSpecial('True')}
          style={[
            styles.button,
            this.state.is_special == 'True' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>Only</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectSpecial('False')}
          style={[
            styles.button,
            this.state.is_special == 'False' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>None</Text>
        </TouchableOpacity>
      </View>
    </View>

  /**
   * Lưu is_event
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectEvent = (value) => () => this.setState({ is_event: value })

  renderEvent = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Event card</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={this.selectEvent('')}
          style={[
            styles.button,
            this.state.is_event == '' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectEvent('True')}
          style={[
            styles.button,
            this.state.is_event == 'True' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>Only</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectEvent('False')}
          style={[
            styles.button,
            this.state.is_event == 'False' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>None</Text>
        </TouchableOpacity>
      </View>
    </View>

  /**
   * Lưu idol_main_unit
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectMainUnit = (value) => () => this.setState({ idol_main_unit: value })

  renderMainUnit = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Main unit</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={this.selectMainUnit('')}
          style={[
            styles.button,
            this.state.idol_main_unit == '' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectMainUnit(`μ's`)}
          style={[
            styles.button,
            this.state.idol_main_unit == `μ's` && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>{`μ's`}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectMainUnit('Aqours')}
          style={[
            styles.button,
            this.state.idol_main_unit == 'Aqours' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>Aqours</Text>
        </TouchableOpacity>
      </View>
    </View>

  /**
   * Lưu rarity
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectRarity = (value) => () => this.setState({ rarity: value })

  renderRarity = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Rarity</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={this.selectRarity('')}
          style={[
            styles.button1,
            { paddingLeft: 0 },
            this.state.rarity === '' && styles.selectedValue1
          ]}>
          <Image source={Images.empty} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectRarity('N')}
          style={[
            styles.button1,
            this.state.rarity === 'N' && styles.selectedValue1
          ]}>
          <Image source={Images.rarity[0]} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectRarity('R')}
          style={[
            styles.button1,
            this.state.rarity === 'R' && styles.selectedValue1
          ]}>
          <Image source={Images.rarity[1]} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectRarity('SR')}
          style={[
            styles.button1,
            this.state.rarity === 'SR' && styles.selectedValue1
          ]}>
          <Image source={Images.rarity[2]} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectRarity('SSR')}
          style={[
            styles.button1,
            this.state.rarity === 'SSR' && styles.selectedValue1
          ]}>
          <Image source={Images.rarity[3]} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectRarity('UR')}
          style={[
            styles.button1,
            this.state.rarity === 'UR' && styles.selectedValue1
          ]}>
          <Image source={Images.rarity[4]} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>

  /**
   * Lưu attribute
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectAttribute = (value) => () => this.setState({ attribute: value })

  renderAttribute = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Attribute</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={this.selectAttribute('')}
          style={[
            styles.button1,
            { paddingLeft: 0 },
            this.state.attribute === '' && styles.selectedValue1
          ]}>
          <Image source={Images.empty} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectAttribute('Smile')}
          style={[
            styles.button1,
            this.state.attribute === 'Smile' && styles.selectedValue1
          ]}>
          <Image source={Images.attribute[0]} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectAttribute('Pure')}
          style={[
            styles.button1,
            this.state.attribute === 'Pure' && styles.selectedValue1
          ]}>
          <Image source={Images.attribute[1]} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectAttribute('Cool')}
          style={[
            styles.button1,
            this.state.attribute === 'Cool' && styles.selectedValue1
          ]}>
          <Image source={Images.attribute[2]} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectAttribute('All')}
          style={[
            styles.button1,
            this.state.attribute === 'All' && styles.selectedValue1
          ]}>
          <Image source={Images.attribute[3]} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>

  /**
   * Lưu idol_year
   *
   * @param {String} value
   * @memberof CardsScreen
   */
  selectYear = (value) => () => this.setState({ idol_year: value })

  renderYear = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Year</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={this.selectYear('')}
          style={[
            styles.button,
            this.state.idol_year == '' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectYear('First')}
          style={[
            styles.button,
            this.state.idol_year == 'First' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>1st</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectYear('Second')}
          style={[
            styles.button,
            this.state.idol_year == 'Second' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>2nd</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectYear('Third')}
          style={[
            styles.button,
            this.state.idol_year == 'Third' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>3rd</Text>
        </TouchableOpacity>
      </View>
    </View>

  /**
   * Lưu idol_sub_unit
   *
   * @memberof CardsScreen
   */
  selectSubUnit = (itemValue, itemIndex) => this.setState({ idol_sub_unit: itemValue })

  renderSubUnit = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Sub unit</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Picker
          mode={'dropdown'}
          selectedValue={this.state.idol_sub_unit}
          onValueChange={this.selectSubUnit}>
          {this.props.subUnits.map((item, index) =>
            <PickerItem key={'subUnit' + index} label={item} value={item} />)}
        </Picker>
      </View>
    </View>

  /**
   * Lưu name
   *
   * @memberof CardsScreen
   */
  selectIdol = (itemValue, itemIndex) => this.setState({ name: itemValue })

  renderIdolName = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Idol</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Picker
          mode={'dropdown'}
          selectedValue={this.state.name}
          onValueChange={this.selectIdol}
          style={{ borderColor: 'black', borderWidth: 1 }}
        >
          {this.props.idols.map((item, index) =>
            <PickerItem key={'idol' + index} label={item} value={item} />)}
        </Picker>
      </View>
    </View>

  /**
   * Lưu school
   *
   * @memberof CardsScreen
   */
  selectSchool = (itemValue, itemIndex) => this.setState({ idol_school: itemValue })

  renderSchool = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>School</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Picker
          mode={'dropdown'}
          selectedValue={this.state.idol_school}
          onValueChange={this.selectSchool}>
          {this.props.schools.map((item, index) =>
            <PickerItem key={'school' + index} label={item} value={item} />)}
        </Picker>
      </View>
    </View>

  selectSkill = (itemValue, itemIndex) => this.setState({ skill: itemValue })

  renderSkill = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Skill</Text>
      </View>
      <View style={{ flex: 2 }}>
        <Picker
          mode={'dropdown'}
          selectedValue={this.state.skill}
          onValueChange={this.selectSkill}>
          {this.props.skills.map((item, index) =>
            <PickerItem key={'skill' + index} label={item} value={item} />)}
        </Picker>
      </View>
    </View>

  selectRegion = (item) => () => this.setState({ japan_only: item })

  renderRegion = () =>
    <View style={{ flexDirection: 'row' }}>
      <View style={styles.leftView}>
        <Text>Worldwide only</Text>
      </View>
      <View style={styles.rightView}>
        <TouchableOpacity onPress={this.selectRegion('')}
          style={[
            styles.button,
            this.state.japan_only == '' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectRegion('False')}
          style={[
            styles.button,
            this.state.japan_only == 'False' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>EN Only</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.selectRegion('True')}
          style={[
            styles.button,
            this.state.japan_only == 'True' && styles.selectedValue
          ]}>
          <Text style={styles.buttonText}>JP Only</Text>
        </TouchableOpacity>
      </View>
    </View>

  resetFilter = () => {
    this.setState({
      name: defaultFilter.name,
      rarity: defaultFilter.rarity,
      attribute: defaultFilter.attribute,
      japan_only: defaultFilter.japan_only,
      is_promo: defaultFilter.is_promo,
      is_special: defaultFilter.is_special,
      is_event: defaultFilter.is_event,
      skill: defaultFilter.skill,
      idol_main_unit: defaultFilter.idol_main_unit,
      idol_sub_unit: defaultFilter.idol_sub_unit,
      idol_school: defaultFilter.idol_school,
      idol_year: defaultFilter.idol_year
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={[ApplicationStyles.header, styles.header]}>
          <TextInput style={{ flex: 1, borderColor: '#333', borderWidth: 1.5, margin: 6 }} />
          <SquareButton name={'ios-search'} onPress={this.onSearch} />
          <SquareButton name={'ios-more'} onPress={this.toggleFilter} />
        </View>

        {/* FILTER */}
        {this.state.isFilter &&
          <View style={{ width: '100%', backgroundColor: 'white', padding: 10 }}>
            <this.renderIdolName />
            <this.renderRarity />
            <this.renderAttribute />
            <this.renderRegion />
            <this.renderPromo />
            <this.renderSpecial />
            <this.renderEvent />
            <this.renderSkill />
            <this.renderMainUnit />
            <this.renderSubUnit />
            <this.renderSchool />
            <this.renderYear />

            {/* RESET BUTTON */}
            <View style={{ alignItems: 'stretch' }}>
              <TouchableOpacity onPress={this.resetFilter}
                style={styles.resetButton}>
                <Text style={styles.resetText}>RESET</Text>
              </TouchableOpacity>
            </View>
          </View>}

        {/* CARD LIST */}
        <FlatList
          data={this.state.data}
          numColumns={2}
          initialNumToRender={8}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
          style={styles.list}
          ListFooterComponent={<View style={[ApplicationStyles.center, { margin: 10 }]}>
            <Spinkit type='WanderingCubes' size={30} color='white' />
          </View>}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  /** Danh sách card */
  cards: state.cardList.get('cardList'),
  /** Danh sách idol */
  idols: getIdols(state),
  /** Danh sách trường */
  schools: getSchools(state),
  /** Danh sách sub unit */
  subUnits: getSubunits(state),
  /** Danh sách skill */
  skills: getSkills(state),
  // cardListErrorMessage: state.cardList.get('cardListErrorMessage'),
  // cardListIsLoading: state.cardList.get('cardListIsLoading'),
})

const mapDispatchToProps = (dispatch) => ({
  // fetchCardList: (filter) => dispatch(CardListActions.fetchCardList(filter))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsScreen)
