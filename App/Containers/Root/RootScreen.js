import React, { Component } from 'react'
import { View } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

import { ApplicationStyles } from 'App/Theme'
import NavigationService from 'App/Services/NavigationService'

import MainScreen from 'App/Containers/MainScreen/Main'
import CardsScreen from 'App/Containers/CardsScreen/Cards'
import IdolsScreen from 'App/Containers/IdolsScreen/Idols'
import EventsScreen from 'App/Containers/EventsScreen/Events'
import SongsScreen from 'App/Containers/SongsScreen/Songs'
import Drawer from 'App/Containers/Drawer/Drawer'

import CardDetailScreen from 'App/Containers/CardDetailScreen/CardDetail'
import EventDetailScreen from 'App/Containers/EventDetailScreen/EventDetail'
import IdolDetailScreen from 'App/Containers/IdolDetailScreen/IdolDetail'
import SongDetailScreen from 'App/Containers/SongDetailScreen/SongDetail'

const LLSIFTab = createBottomTabNavigator(
  {
    MainScreen: MainScreen,
    CardsScreen: CardsScreen,
    IdolsScreen: IdolsScreen,
    EventsScreen: EventsScreen,
    SongsScreen: SongsScreen
  },
  { initialRouteName: 'MainScreen' }
)

LLSIFTab.navigationOptions = { header: null }

const Stack = createStackNavigator(
  {
    LLSIFScreen: LLSIFTab,
    CardDetailScreen: CardDetailScreen,
    EventDetailScreen: EventDetailScreen,
    IdolDetailScreen: IdolDetailScreen,
    SongDetailScreen: SongDetailScreen
  },
  { initialRouteName: 'LLSIFScreen' }
)

const AppNav = createDrawerNavigator({ Stack: Stack }, { contentComponent: Drawer })

export default class RootScreen extends Component {
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
