import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';

import StatusBarBackground from '../../Components/StatusBarBackground/StatusBar';
import CachedDataActions from '../../Stores/CachedData/Actions';
import { ApplicationStyles } from '../../Theme';
import { loadSettings } from '../../Utils';
import NavigationService from '../../Services/NavigationService';
import {FirebaseTopic} from '../../Config';

import MainScreen from '../MainScreen/Main';
import CardsScreen from '../CardsScreen/Cards';
import IdolsScreen from '../IdolsScreen/Idols';
import EventsScreen from '../EventsScreen/Events';
import SongsScreen from '../SongsScreen/Songs';
import Drawer from '../Drawer/Drawer';

import CardDetailScreen from '../CardDetailScreen/CardDetail';
import EventDetailScreen from '../EventDetailScreen/EventDetail';
import IdolDetailScreen from '../IdolDetailScreen/IdolDetail';
import SongDetailScreen from '../SongDetailScreen/SongDetail';
import ImageViewer from '../ImageViewer/ImageViewer';

const LLSIFTab = createBottomTabNavigator(
  {
    MainScreen: MainScreen,
    CardsScreen: CardsScreen,
    IdolsScreen: IdolsScreen,
    EventsScreen: EventsScreen,
    SongsScreen: SongsScreen
  },
  { initialRouteName: 'MainScreen' }
);

LLSIFTab.navigationOptions = { header: null };

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
    headerMode: 'none'
  }
);

const AppNav = createDrawerNavigator({ Stack: Stack }, { contentComponent: Drawer });

class RootScreen extends Component {
  componentDidMount() {
    if (__DEV__) {
      // console.clear();
      console.log('App is running in DEV mode', FirebaseTopic);
    }
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
        } else {
          // user doesn't have permission
          firebase.messaging().requestPermission()
            .then(() => {
              // User has authorised
            })
            .catch(error => {
              // User has rejected permissions
            });
        }
      });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
      console.log('notificationDisplayedListener', notification);
    });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      console.log('notificationListener', notification);
    });

    this.messageListener = firebase.messaging().onMessage((message) => {
      // Process your message as required
      console.log('messageListener', message);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification = notificationOpen.notification;
      console.log('notificationOpenedListener', action, notification);
    });

    firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification = notificationOpen.notification;
          console.log('firebase.notifications().getInitialNotification()', action, notification);
          if (notification.data.event !== undefined) {
            NavigationService.navigate('EventDetailScreen', { eventName: notification.data.event });
          }
        }
      });

    loadSettings().then(res => {
      if (res.jp_event) {
        firebase.messaging().subscribeToTopic(FirebaseTopic.JP_EVENT);
      } else {
        firebase.messaging().unsubscribeFromTopic(FirebaseTopic.JP_EVENT);
      }
      if (res.ww_event) {
        firebase.messaging().subscribeToTopic(FirebaseTopic.WW_EVENT);
      } else {
        firebase.messaging().unsubscribeFromTopic(FirebaseTopic.WW_EVENT);
      }
    });
    firebase.messaging().subscribeToTopic(FirebaseTopic.MESSAGE);
    this.props.startup();
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }

  render() {
    return (
      <SafeAreaView style={ApplicationStyles.screen}>
        <View style={ApplicationStyles.screen}>
          <StatusBarBackground />
          <AppNav
            // Initialize the NavigationService
            // (see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html)
            ref={(navigatorRef) => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(CachedDataActions.fetchCachedData())
});

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
