import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NetworkProvider } from 'react-native-offline';
import messaging from '@react-native-firebase/messaging';
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
  dsn: 'https://ac9aa894ab9341fba115b29731378b6b@sentry.io/1330276',
});

const MainContainer: React.FC<null> = () => {
  useEffect(() => {
    if (__DEV__) {
      // console.clear();
      // eslint-disable-next-line no-console
      console.log('App is running in DEV mode', FirebaseTopic);
    }
    void messaging()
      .hasPermission()
      .then((enabled) => {
        // console.log('firebase.messaging.hasPermission', enabled);
        if (enabled) {
          // user has permissions
        } else {
          // user doesn't have permission
          messaging()
            .requestPermission()
            .then(() => {
              // console.log('User has authorised');
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((error) => {
              // console.log('User has rejected permissions');
            });
        }
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const messageListener = messaging().onMessage((message) => {
      // Process your message as required
      // console.log('messageListener', message);
    });

    void messaging().subscribeToTopic(FirebaseTopic.MESSAGE);

    return () => {
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
