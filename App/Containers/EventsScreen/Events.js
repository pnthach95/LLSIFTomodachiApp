import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { create } from 'apisauce'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons'
import { Config } from '../../Config'
import { Metrics, Colors } from '../../Theme'
import CachedDataActions from 'App/Stores/CachedData/Actions'
import { AddHttps } from '../../Utils'
import SplashScreen from '../SplashScreen/SplashScreen'

class EventsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
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

  componentDidMount() {
  }

  render() {
    return (<SplashScreen bgColor={Colors.violet} />)
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
