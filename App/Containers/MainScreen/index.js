import React from 'react'
import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { create } from 'apisauce'
import FastImage from 'react-native-fast-image'
import Config from '../../Config'
import { Metrics } from '../../Theme'

const LLSIFApiClient = create({
  baseURL: 'https://schoolido.lu/api/',//Config.API_URL,
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
    var data = await LLSIFApiClient.get('cards', { ordering: '-release_date', page: page })
    var arrayData = data.data.results.map((item) => {
      return {
        id: item.id,
        rarity: item.rarity,
        attribute: item.attribute,
        cardImage: item.card_image ? 'https:' + item.card_image : null,
        cardIdolizedImage: item.card_idolized_image ? 'https:' + item.card_idolized_image : null,
        idol: {
          name: item.idol.name,
          school: item.idol.school,
          year: item.idol.year,
          mainUnit: item.idol.main_unit,
          subUnit: item.idol.sub_unit
        }
      }
    })
    var x = [...this.state.data, ...arrayData]
    this.setState({ data: x, isLoading: false, page: this.state.page + 1 })
  }

  _keyExtractor = (item, index) => 'card' + item.id;

  _renderItem = ({ item }) => (
    <TouchableOpacity style={{ width: Metrics.fullWidth / 2, backgroundColor: 'white', }}>
      <FastImage
        style={{ width: Metrics.fullWidth / 2, height: 200 }}
        source={{
          uri: item.cardImage ? item.cardImage : item.cardIdolizedImage,
          priority: FastImage.priority.normal,
        }} />
      <Text>Name: {item.idol.name}</Text>
      <Text>School: {item.idol.school}</Text>
      <Text>Year: {item.idol.year}</Text>
      <Text>Main unit: {item.idol.mainUnit}</Text>
      <Text>Sub unit: {item.idol.sub_unit}</Text>
      <Text>Rarity: {item.rarity}</Text>
      <Text>Attribute: {item.attribute}</Text>
    </TouchableOpacity>
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
            renderItem={this._renderItem} />
        }
      </View>
    )
  }
}
