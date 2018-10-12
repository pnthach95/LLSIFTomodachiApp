import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'

import { Metrics, Colors, ApplicationStyles } from '../../Theme'
import CardItem from '../../Components/CardItem/CardItem'
import SplashScreen from '../SplashScreen/SplashScreen'
import { LLSIFService } from '../../Services/LLSIFService'

class CardsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      page: 1
    }
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

  _keyExtractor = (item, index) => 'card' + item.id

  _renderItem = ({ item }) => (
    <CardItem item={item} onPress={() => this.navigateToCardDetail(item)} />
  )

  getCards() {
    console.log(`========== Cards.getCards.page ${this.state.page} ==========`)
    LLSIFService.fetchCardList(this.state.page).then((result) => {
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

  navigateToCardDetail(item) {
    this.props.navigation.navigate('CardDetailScreen', { item: item })
  }

  componentDidMount() {
    this.getCards()
  }

  render() {
    if (this.state.isLoading) return (<SplashScreen bgColor={Colors.green} />)
    return (
      <View style={{ flex: 1, backgroundColor: Colors.green, }}>
        <View style={[ApplicationStyles.header, { backgroundColor: 'white' }]}>
          <Text>TOOLBAR</Text>
        </View>
        <FlatList
          data={this.state.data}
          numColumns={2}
          keyExtractor={this._keyExtractor}
          onEndReached={() => this.getCards()}
          style={{ padding: Metrics.smallMargin }}
          renderItem={this._renderItem} />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardsScreen)
