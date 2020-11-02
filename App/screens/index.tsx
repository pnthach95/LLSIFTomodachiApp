import React, { useEffect, useMemo, useReducer } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NetworkProvider } from 'react-native-offline';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firebase from 'react-native-firebase';
import * as Sentry from '@sentry/react-native';

import { BottomTabList, IconComponent, RootStackParamList } from '~/Utils/type';
import { loadSettings } from '~/Utils';
import { FirebaseTopic } from '~/Config';
import UserContext from '~/Context/UserContext';
import reducer, { initState } from '~/Context/Reducer';
import { Colors } from '~/Theme';

import LoadingScreen from './Loading';
import MainScreen from './Main';
import CardsScreen from './Cards';
import IdolsScreen from './Idols';
import EventsScreen from './Events';
import SongsScreen from './Songs';
import DrawerScreen from './Drawer';

import CardDetailScreen from './CardDetail';
import EventDetailScreen from './EventDetail';
import IdolDetailScreen from './IdolDetail';
import SongDetailScreen from './SongDetail';

Sentry.init({ dsn: 'https://ac9aa894ab9341fba115b29731378b6b@sentry.io/1330276' });

const Tab = createBottomTabNavigator<BottomTabList>();
const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const LLSIFTab: React.FC<BottomTabNavigationProp<BottomTabList>> = () => {
  const homeIcon: IconComponent = ({ color }) => <Icon name='home'
    size={25} color={color} />;

  const cardIcon: IconComponent = ({ color }) => <Ionicons name='ios-photos'
    size={30} color={color} />;

  const idolIcon: IconComponent = ({ focused, color }) => <Ionicons size={30}
    name={focused ? 'ios-star' : 'ios-star-outline'}
    color={color} />;

  const eventIcon: IconComponent = ({ color }) => <Ionicons name='md-calendar'
    size={30} color={color} />;

  const songIcon: IconComponent = ({ color }) => <Ionicons name='ios-musical-notes'
    size={30} color={color} />;

  return <Tab.Navigator tabBarOptions={{
    activeTintColor: Colors.pink,
    inactiveTintColor: Colors.inactive,
  }}>
    <Tab.Screen name='MainScreen'
      component={MainScreen}
      options={{
        tabBarIcon: homeIcon,
        tabBarLabel: 'Home',
      }} />
    <Tab.Screen name='CardsScreen'
      component={CardsScreen}
      options={{
        tabBarIcon: cardIcon,
        tabBarLabel: 'Cards',
      }} />
    <Tab.Screen name='IdolsScreen'
      component={IdolsScreen}
      options={{
        tabBarIcon: idolIcon,
        tabBarLabel: 'Idols',
      }} />
    <Tab.Screen name='EventsScreen'
      component={EventsScreen}
      options={{
        tabBarIcon: eventIcon,
        tabBarLabel: 'Events',
      }} />
    <Tab.Screen name='SongsScreen'
      component={SongsScreen}
      options={{
        tabBarIcon: songIcon,
        tabBarLabel: 'Songs',
      }} />
  </Tab.Navigator >;
};

const LLSIFDrawer = () => {
  return <Drawer.Navigator drawerContent={() => <DrawerScreen />}>
    <Drawer.Screen name='Main' component={LLSIFTab} />
  </Drawer.Navigator>;
};

const MainContainer: React.FC<{}> = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const userReducer = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  useEffect(() => {
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
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
              // console.log('User has rejected permissions');
            });
        }
      });

    const channel = new firebase.notifications.Android.Channel('notifications', 'Default channel', firebase.notifications.Android.Importance.High).enableLights(false);
    firebase.notifications().android.createChannel(channel);
    const notificationDisplayedListener = firebase.notifications()
      // eslint-disable-next-line no-unused-vars
      .onNotificationDisplayed((notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID.
        // You will have to specify this manually if you'd like to re-display the notification.
        // console.log('notificationDisplayedListener', notification);
      });

    // eslint-disable-next-line no-unused-vars
    const notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      // console.log('notificationListener', notification);
    });

    // eslint-disable-next-line no-unused-vars
    const messageListener = firebase.messaging().onMessage((message) => {
      // Process your message as required
      // console.log('messageListener', message);
    });

    const notificationOpenedListener = firebase.notifications()
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
          // eslint-disable-next-line no-unused-vars
          const { action, notification } = notificationOpen;
          // console.log('firebase.notifications().getInitialNotification()', action, notification);
          if (notification.data.event !== undefined) {
            //
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

    return () => {
      notificationDisplayedListener();
      notificationListener();
      notificationOpenedListener();
      messageListener();
    };
  }, []);

  // console.log('state', state);
  return <NetworkProvider>
    <UserContext.Provider value={userReducer}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.loading ? <Stack.Screen name='LoadingScreen'
            component={LoadingScreen}
            options={{
              headerShown: false,
            }} />
            : <>
              <Stack.Screen name='DrawerScreen'
                component={LLSIFDrawer}
                options={{
                  headerShown: false,
                }} />
              <Stack.Screen name='CardDetailScreen'
                component={CardDetailScreen} />
              <Stack.Screen name='EventDetailScreen'
                component={EventDetailScreen} />
              <Stack.Screen name='IdolDetailScreen'
                component={IdolDetailScreen} />
              <Stack.Screen name='SongDetailScreen'
                component={SongDetailScreen} />
            </>}
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  </NetworkProvider>;
};

export default MainContainer;
