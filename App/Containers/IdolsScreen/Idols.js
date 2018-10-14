import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { create } from 'apisauce'
import { connect } from 'react-redux'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons'

import { Config } from '../../Config'
import CachedDataActions from 'App/Stores/CachedData/Actions'
import { AddHttps } from '../../Utils'
import SplashScreen from '../SplashScreen/SplashScreen'
import { Metrics, Colors } from '../../Theme'
import styles from './styles'

class IdolsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  static navigationOptions = {
    tabBarIcon: ({ focused }) => (
      focused
        ? <Icon name='ios-star' size={30} color={Colors.pink} />
        : <Icon name='ios-star-outline' size={30} color={Colors.inactive} />
    ),
    tabBarLabel: 'Idols',
    tabBarOptions: {
      activeTintColor: Colors.pink,
      inactiveTintColor: Colors.inactive
    }
  }

  componentDidMount() {
  }

  render() {
    return <SplashScreen bgColor={Colors.blue} />
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdolsScreen)
