import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { create } from 'apisauce'
import { Config } from '../../Config'
import { Metrics } from '../../Theme'
import CardItem from '../../Components/CardItem'

const LLSIFApiClient = create({
  baseURL: Config.API_URL,
  timeout: 3000,
})

export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: [],
      page: 1
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
      <View style={{ flex: 1, backgroundColor: 'black', }}>
        {this.state.isLoading ? <Text>Loading</Text> :
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
