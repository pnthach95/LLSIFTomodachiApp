/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View, SafeAreaView, Alert } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { Provider } from 'react-redux';
import firebase from 'react-native-firebase';
import { Sentry } from 'react-native-sentry';

import StatusBarBackground from '~/Components/StatusBarBackground/StatusBar';
import { ApplicationStyles } from '~/Theme';
import { loadSettings } from '~/Utils';
import NavigationService from '~/Services/NavigationService';
import { FirebaseTopic } from '~/Config';
import ConfigureStore from '~/redux/store';

import LoadingScreen from './LoadingScreen';
import MainScreen from './MainScreen';
import CardsScreen from './CardsScreen/Cards';
import IdolsScreen from './IdolsScreen/Idols';
import EventsScreen from './EventsScreen/Events';
import SongsScreen from './SongsScreen/Songs';
import Drawer from './Drawer/Drawer';

import CardDetailScreen from './CardDetailScreen';
import EventDetailScreen from './EventDetailScreen';
import IdolDetailScreen from './IdolDetailScreen/IdolDetail';
import SongDetailScreen from './SongDetailScreen';
import ImageViewer from './ImageViewer/ImageViewer';

Sentry.config('https://ac9aa894ab9341fba115b29731378b6b@sentry.io/1330276').install();
const store = ConfigureStore;

const LLSIFTab = createBottomTabNavigator(
  {
    MainScreen,
    CardsScreen,
    IdolsScreen,
    EventsScreen,
    SongsScreen,
  },
  {
    initialRouteName: 'MainScreen',
    navigationOptions: {
      header: null,
    },
  },
);

const Stack = createStackNavigator(
  {
    LLSIFScreen: LLSIFTab,
    CardDetailScreen,
    EventDetailScreen,
    IdolDetailScreen,
    SongDetailScreen,
    ImageViewerScreen: ImageViewer,
  },
  {
    initialRouteName: 'LLSIFScreen',
    headerMode: 'none',
  },
);

const AppStack = createDrawerNavigator({ Stack }, { contentComponent: Drawer });

const SwitchNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  AppStack,
});

const AppContainer = createAppContainer(SwitchNavigator);

export default class MainContainer extends Component {
  componentDidMount() {
    // eslint-disable-next-line no-undef
    if (__DEV__) {
      // console.clear();
      // eslint-disable-next-line no-console
      console.log('App is running in DEV mode', FirebaseTopic);
    }
    firebase.messaging().hasPermission()
      .then((enabled) => {
        // console.log('firebase.messaging.hasPermission', enabled);
        if (enabled) {
          // user has permissions
        } else {
          // user doesn't have permission
          firebase.messaging().requestPermission()
            .then(() => {
              // console.log('User has authorised');
            })
            .catch((error) => {
              // console.log('User has rejected permissions');
            });
        }
      });

    this.notificationDisplayedListener = firebase.notifications()
      .onNotificationDisplayed((notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID.
        // You will have to specify this manually if you'd like to re-display the notification.
        // console.log('notificationDisplayedListener', notification);
      });

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      // console.log('notificationListener', notification);
    });

    this.messageListener = firebase.messaging().onMessage((message) => {
      // Process your message as required
      // console.log('messageListener', message);
    });

    this.notificationOpenedListener = firebase.notifications()
      .onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        // Get information about the notification that was opened
        // eslint-disable-next-line no-unused-vars
        const { action, notification } = notificationOpen;
        // console.log('notificationOpenedListener', action, notification);
      });

    firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          // Get information about the notification that was opened
          const { action, notification } = notificationOpen;
          // console.log('firebase.notifications().getInitialNotification()', action, notification);
          if (notification.data.event !== undefined) {
            NavigationService.navigate('EventDetailScreen', { eventName: notification.data.event });
          }
          if (notification.data.message !== undefined) {
            Alert.alert('Message', notification.data.message);
          }
        }
      });

    loadSettings().then((res) => {
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
  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={ApplicationStyles.screen}>
          <View style={ApplicationStyles.screen}>
            <StatusBarBackground />
            <AppContainer />
          </View>
        </SafeAreaView>
      </Provider>
    );
  }
}
