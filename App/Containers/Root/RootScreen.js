import React, { Component } from 'react'
import { View, SafeAreaView } from 'react-native'
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'
import { connect } from 'react-redux'

import StatusBarBackground from '../../Components/StatusBarBackground/StatusBar'
import CachedDataActions from '../../Stores/CachedData/Actions'
import { ApplicationStyles } from '../../Theme'
import NavigationService from '../../Services/NavigationService'

import MainScreen from '../MainScreen/Main'
import CardsScreen from '../CardsScreen/Cards'
import IdolsScreen from '../IdolsScreen/Idols'
import EventsScreen from '../EventsScreen/Events'
import SongsScreen from '../SongsScreen/Songs'
import Drawer from '../Drawer/Drawer'

import CardDetailScreen from '../CardDetailScreen/CardDetail'
import EventDetailScreen from '../EventDetailScreen/EventDetail'
import IdolDetailScreen from '../IdolDetailScreen/IdolDetail'
import SongDetailScreen from '../SongDetailScreen/SongDetail'
import ImageViewer from '../ImageViewer/ImageViewer'

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
    SongDetailScreen: SongDetailScreen,
    ImageViewerScreen: ImageViewer
  },
  {
    initialRouteName: 'LLSIFScreen',
    headerMode: 'none',
  }
)

const AppNav = createDrawerNavigator({ Stack: Stack }, { contentComponent: Drawer })

class RootScreen extends Component {
  componentDidMount() {
    if (__DEV__) {
      console.clear()
      console.log('App is running in DEV mode')
    }
    this.props.startup()
  }

  render() {
    return (
      <SafeAreaView style={ApplicationStyles.screen}>
        <View style={ApplicationStyles.screen}>
          <StatusBarBackground />
          <AppNav
            // Initialize the NavigationService (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(CachedDataActions.fetchCachedData())
})

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen)
