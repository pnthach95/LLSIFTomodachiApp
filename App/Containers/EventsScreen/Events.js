import React from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import _ from 'lodash'

import EventItem from '../../Components/EventItem/Event'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Colors } from '../../Theme'
import styles from './styles'
import { LLSIFService } from '../../Services/LLSIFService'

class EventsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      list: [],
      isFilter: false,
      filter: {
        ordering: '-beginning',
        page_size: 20,
        page: 1,
      }
    }
    this._onEndReached = _.debounce(this._onEndReached, 500)
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      <Icon name='md-calendar' size={30} color={focused ? Colors.pink : Colors.inactive} />
    ),
    tabBarLabel: 'Events',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  _keyExtractor = (item, index) => `event ${item.japanese_name}`

  _renderItem = ({ item }) => (
    <EventItem item={item} onPress={() => this.navigateToEventDetail(item)} />
  )

  navigateToEventDetail(item) {
    this.props.navigation.navigate('EventDetailScreen', { eventName: item.japanese_name })
  }

  componentDidMount() {
    this.getEvents()
  }

  /**
   *Khi scroll đến cuối danh sách
   *
   * @memberof CardsScreen
   */
  _onEndReached = () => {
    this.getEvents()
  }

  getEvents() {
    console.log(`========== Events.getEvents.page ${this.state.filter.page} ==========`)
    LLSIFService.fetchEventList(this.state.filter).then((result) => {
      var x = [...this.state.list, ...result]
      x = x.filter((thing, index, self) =>
        index === self.findIndex((t) => (
          t.japanese_name === thing.japanese_name
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
    if (this.state.isLoading) return <SplashScreen bgColor={Colors.violet} />
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.content}
          data={this.state.list}
          initialNumToRender={6}
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
)(EventsScreen)
