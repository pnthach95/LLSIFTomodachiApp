/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NetworkProvider } from 'react-native-offline';
import firebase from 'react-native-firebase';
import * as Sentry from '@sentry/react-native';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { FirebaseTopic } from '~/Config';
import { UserProvider } from '~/Context/UserContext';
import Routes from './routes';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(localizedFormat);

Sentry.init({
  dsn: 'https://ac9aa894ab9341fba115b29731378b6b@sentry.io/1330276'
});

const MainContainer: React.FC<null> = () => {
  useEffect(() => {
    if (__DEV__) {
      // console.clear();
      // eslint-disable-next-line no-console
      console.log('App is running in DEV mode', FirebaseTopic);
    }
    void firebase
      .messaging()
      .hasPermission()
      .then((enabled) => {
        // console.log('firebase.messaging.hasPermission', enabled);
        if (enabled) {
          // user has permissions
        } else {
          // user doesn't have permission
          firebase
            .messaging()
            .requestPermission()
            .then(() => {
              // console.log('User has authorised');
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
              // console.log('User has rejected permissions');
            });
        }
      });

    const channel = new firebase.notifications.Android.Channel(
      'notifications',
      'Default channel',
      firebase.notifications.Android.Importance.High
    ).enableLights(false);
    void firebase.notifications().android.createChannel(channel);
    const notificationDisplayedListener = firebase
      .notifications()
      .onNotificationDisplayed((notification) => {
        // Process your notification as required
        // ANDROID: Remote notifications do not contain the channel ID.
        // You will have to specify this manually if you'd like to re-display the notification.
        // console.log('notificationDisplayedListener', notification);
      });

    // eslint-disable-next-line no-unused-vars
    const notificationListener = firebase
      .notifications()
      .onNotification((notification) => {
        // Process your notification as required
        // console.log('notificationListener', notification);
      });

    // eslint-disable-next-line no-unused-vars
    const messageListener = firebase.messaging().onMessage((message) => {
      // Process your message as required
      // console.log('messageListener', message);
    });

    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        // Get the action triggered by the notification being opened
        // Get information about the notification that was opened
        // eslint-disable-next-line no-unused-vars
        const { action, notification } = notificationOpen;
        // console.log('notificationOpenedListener', action, notification);
      });

    void firebase
      .notifications()
      .getInitialNotification()
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

    firebase.messaging().subscribeToTopic(FirebaseTopic.MESSAGE);

    return () => {
      notificationDisplayedListener();
      notificationListener();
      notificationOpenedListener();
      messageListener();
    };
  }, []);

  return (
    <NetworkProvider>
      <SafeAreaProvider>
        <UserProvider>
          <Routes />
        </UserProvider>
      </SafeAreaProvider>
    </NetworkProvider>
  );
};

export default MainContainer;
