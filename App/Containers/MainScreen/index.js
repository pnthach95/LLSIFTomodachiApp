import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { create } from 'apisauce'
import FastImage from 'react-native-fast-image'
import { Metrics } from '../../Theme'

const LLSIFApiClient = create({
  baseURL: Config.API_URL,
  timeout: 3000,
})

export default class MainScreen extends React.Component {
  state = {
    isLoading: true,
    data: null,
    page: 1
  }

  async getCards(page) {
    await data = LLSIFApiClient.get(Config.CARDS, { ordering: '-release_date', page: page })
    this.setState({ data: data, isLoading: true, page: this.state.page + 1 })
  }

  _keyExtractor = (item, index) => 'card' + item.id;

  _renderItem = ({ item }) => (
    <TouchableOpacity style={{ width: Metrics.fullWidth / 2 }}>
      <FastImage
        source={{
          uri: item.card_image,
          priority: FastImage.priority.normal,
        }} />
      <Text>Name: {item.idol.name}</Text>
      <Text>School: {item.idol.school}</Text>
      <Text>Year: {item.idol.year}</Text>
      <Text>Main unit: {item.idol.main_unit}</Text>
      <Text>Sub unit: {item.idol.sub_unit}</Text>
      <Text>Rarity: {item.idol.rarity}</Text>
      <Text>Attribute: {item.idol.attribute}</Text>
    </TouchableOpacity>
  );

  componentDidMount() {
    getCards(1)
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
            renderItem={this._renderItem} />
        }
      </View>
    )
  }
}
