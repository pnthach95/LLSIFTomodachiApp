import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { create } from 'apisauce'
import Icon from 'react-native-vector-icons/Ionicons'
import { Config } from '../../Config'
import { Metrics, Colors } from '../../Theme'
import CardItem from '../../Components/CardItem'
import SplashScreen from '../SplashScreen/SplashScreen'

const LLSIFApiClient = create({
  baseURL: Config.API_URL,
  timeout: 3000,
})

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

  async getCards(page) {
    var data = await LLSIFApiClient.get(Config.CARDS, { ordering: '-release_date', page: page })
    var x = [...this.state.data, ...data.data.results]
    this.setState({ data: x, isLoading: false, page: this.state.page + 1 })
  }

  _keyExtractor = (item, index) => 'card' + item.id;

  _renderItem = ({ item }) => (
    <CardItem item={item} />
  );

  componentDidMount() {
    this.getCards(1)
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.green, }}>
        {this.state.isLoading ? <SplashScreen /> :
          <FlatList
            data={this.state.data}
            numColumns={2}
            keyExtractor={this._keyExtractor}
            onEndReached={() => this.getCards(this.state.page)}
            style={{ padding: Metrics.smallMargin }}
            renderItem={this._renderItem} />
        }
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
