import React from 'react'
import { Text, View, FlatList, TextInput, Picker, TouchableOpacity, Switch } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import { getIdols, getSchools, getSkills, getSubunits } from '../../Stores/CachedData/Selectors'
import SquareButton from '../../Components/SquareButton/SquareButton'
import CardItem from '../../Components/CardItem/CardItem'
import SplashScreen from '../SplashScreen/SplashScreen'
import { LLSIFService } from '../../Services/LLSIFService'
import { Colors, ApplicationStyles } from '../../Theme'
import styles from './styles'

const PickerItem = Picker.Item
const defaultFilter = {
  ordering: '-release_date',
  page_size: 20,
  page: 1,
  idol: '',
  rarity: '',
  attribute: '',
  worldwide_only: false,
  promo_card: '',
  special_card: '',
  event_card: '',
  skill: '',
  main_unit: '',
  sub_unit: '',
  school: '',
  year: ''
}

class CardsScreen extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      data: [],
      page: 1,
      isFilter: false,
      filter: {
        ordering: '-release_date',
        page_size: 20,
        page: 1,
        idol: '',
        rarity: '',
        attribute: '',
        worldwide_only: false,
        promo_card: '',
        special_card: '',
        event_card: '',
        skill: '',
        main_unit: '',
        sub_unit: '',
        school: '',
        year: ''
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

  _keyExtractor = (item, index) => `card${item.id}`

  _renderItem = ({ item }) => (
    <CardItem item={item} onPress={() => this.navigateToCardDetail(item)} />
  )

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

  _onEndReached = () => {
    this.getCards()
  }

  navigateToCardDetail(item) {
    this.props.navigation.navigate('CardDetailScreen', { item: item })
  }

  componentDidMount() {
    this.getCards()
  }

  toggleFilter = () => {
    this.setState({ isFilter: !this.state.isFilter })
  }

  render() {
    if (this.state.isLoading) return (<SplashScreen bgColor={Colors.green} />)
    return (
      <View style={styles.container}>
        <View style={[ApplicationStyles.header, styles.header]}>
          <TextInput style={{ flex: 1, borderColor: '#333', borderWidth: 1.5, margin: 6 }}
            onFocus={e => {
              this.setState({ onSearchFocus: true })
            }}
          />
          <SquareButton name={'ios-search'} />
          <SquareButton name={'ios-more'} onPress={this.toggleFilter} />
        </View>

        {this.state.isFilter &&
          <View style={{ width: '100%', backgroundColor: 'white', padding: 10 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Idol</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.filter.idol}
                  onValueChange={(itemValue, itemIndex) => {
                    var _filter = this.state.filter
                    _filter.idol = itemValue
                    this.setState({ filter: _filter })
                  }}
                >
                  {this.props.idols.map((item, index) =>
                    <PickerItem key={'idol' + index} label={item} />)}
                </Picker>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Rarity</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>N</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>R</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>SR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>SSR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>UR</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Attribute</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>Smile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>Pure</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>Cool</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>Special</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Worldwide only</Text>
              </View>
              <Switch />
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Promo card</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>Only</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>None</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Special card</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>Only</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>None</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Event card</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>Only</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>None</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
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

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Main unit</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row' }}>
                <TouchableOpacity>
                  <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>{`μ's`}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ paddingLeft: 20 }}>
                  <Text>Aqours</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Sub unit</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.filter.sub_unit}
                  onValueChange={(itemValue, itemIndex) => {
                    var _filter = this.state.filter
                    _filter.sub_unit = itemValue
                    this.setState({ filter: _filter })
                  }}>
                  {this.props.subUnits.map((item, index) =>
                    <PickerItem key={'subUnit' + index} label={item} />)}
                </Picker>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>School</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Picker
                  mode={'dropdown'}
                  selectedValue={this.state.filter.school}
                  onValueChange={(itemValue, itemIndex) => {
                    var _filter = this.state.filter
                    _filter.school = itemValue
                    this.setState({ filter: _filter })
                  }}>
                  {this.props.schools.map((item, index) =>
                    <PickerItem key={'school' + index} label={item} />)}
                </Picker>
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>Year</Text>
              </View>
              <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity>
                  <Text>All</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>1st Year</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>2nd Year</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text>3rd Year</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ alignItems: 'stretch' }}>
              <TouchableOpacity style={{ backgroundColor: 'red', justifyContent: 'center', margin: 5, padding: 10 }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>RESET</Text>
              </TouchableOpacity>
            </View>
          </View>}

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
  idols: getIdols(state),
  schools: getSchools(state),
  subUnits: getSubunits(state),
  skills: getSkills(state)
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsScreen)
