import React, { Component } from 'react'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationStyles } from 'App/Theme'

import NavigationService from 'App/Services/NavigationService'
import SplashScreen from 'App/Containers/SplashScreen/SplashScreen'
import MainScreen from 'App/Containers/MainScreen/Main'
import CardsScreen from 'App/Containers/CardsScreen/Cards'
import IdolsScreen from 'App/Containers/IdolsScreen/Idols'
import EventsScreen from 'App/Containers/EventsScreen/Events'
import SongsScreen from 'App/Containers/SongsScreen/Songs'
import CardDetailScreen from 'App/Containers/CardDetailScreen/CardDetail'
import StartupActions from 'App/Stores/Startup/Actions'

const LLSIFGame = createBottomTabNavigator(
  {
    MainScreen: MainScreen,
    CardsScreen: CardsScreen,
    IdolsScreen: IdolsScreen,
    EventsScreen: EventsScreen,
    SongsScreen: SongsScreen
  },
  { initialRouteName: 'MainScreen' }
)

LLSIFGame.navigationOptions = { header: null }

const AppNav = createStackNavigator(
  {
    SplashScreen: SplashScreen,
    LLSIFScreen: LLSIFGame,
    CardDetailScreen: CardDetailScreen
  },
  {
    initialRouteName: 'SplashScreen',
    headerMode: 'none',
  }
)

class RootScreen extends Component {
  componentDidMount() {
    // Run the startup saga when the application is starting
    this.props.startup()
  }

  render() {
    return (
      <View style={ApplicationStyles.screen}>
        <AppNav
          // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef)
          }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootScreen)
