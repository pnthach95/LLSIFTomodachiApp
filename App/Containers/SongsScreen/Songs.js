import React from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import SongItem from '../../Components/SongItem/SongItem'
import SplashScreen from '../SplashScreen/SplashScreen'
import { LLSIFService } from '../../Services/LLSIFService'
import { Colors } from '../../Theme'
import styles from './styles'

class SongsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      list: [],
      isFilter: false,
      filter: {
        ordering: '-id',
        page_size: 20,
        page: 1,
        expand_event: ''
      }
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

  _keyExtractor = (item, index) => `song ${item.name}`

  _renderItem = ({ item }) => (
    <SongItem item={item} onPress={() => this.navigateToSongDetail(item)} />
  )

  navigateToSongDetail(item) {
    this.props.navigation.navigate('SongDetailScreen', { item: item })
  }

  /**
   *Khi scroll đến cuối danh sách
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    this.getSongs()
  }

  getSongs() {
    console.log(`========== Events.getEvents.page ${this.state.filter.page} ==========`)
    LLSIFService.fetchSongList(this.state.filter).then((result) => {
      var x = [...this.state.list, ...result]
      x = x.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.name === thing.name
        ))
      )
      var _filter = this.state.filter
      _filter.page++
      this.setState({
        list: x,
        isLoading: false,
        filter: _filter
      })
    }).catch((err) => {
      //  TODO
    })
  }

  render() {
    if (this.state.isLoading) return <SplashScreen />
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.content}
          data={this.state.list}
          initialNumToRender={6}
          numColumns={2}
          keyExtractor={this._keyExtractor}
          style={styles.list}
          onEndReached={this._onEndReached}
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
)(SongsScreen)
