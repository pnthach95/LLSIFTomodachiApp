import {setRootViewBackgroundColor} from '@pnthach95/react-native-root-view-background';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {ModalProvider} from 'react-native-modalfy';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {NetworkProvider} from 'react-native-offline';
import {Provider as PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FirebaseTopic} from '~/Config';
import {Colors, Dark, Light} from '~/Theme';
import {useStorage} from '~/Utils';
import Modals from '~/modals';
import AboutMeScreen from '~/screens/AboutMe';
import CardDetailScreen from '~/screens/CardDetail';
import EventDetailScreen from '~/screens/EventDetail';
import EventTrackerScreen from '~/screens/EventDetail/Tracker';
import IdolDetailScreen from '~/screens/IdolDetail';
import IdolsScreen from '~/screens/Idols';
import SongDetailScreen from '~/screens/SongDetail';
import SongsScreen from '~/screens/Songs';
import SplashScreen from '~/screens/Splash';
import useStore from '~/store';
import {initAppOptions} from '~/store/init';
import type {RootStackParamList} from '~/typings/navigation';
import LLSIFTab from './tabs';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(localizedFormat);

const Stack = createStackNavigator<RootStackParamList>();

const noHeader = {headerShown: false};

const MainContainer = () => {
  const [settings] = useStorage('settings', initAppOptions);
  const appRoute = useStore(s => s.appRoute);
  const switchTheme = settings.isDark ? Dark : Light;
  const statusBarColor = settings.isDark ? Dark.colors.card : Light.colors.card;
  const statusBarStyle = settings.isDark ? 'light-content' : 'dark-content';

  useEffect(() => {
    if (__DEV__) {
      // console.clear();
      // eslint-disable-next-line no-console
      console.log('App is running in DEV mode', FirebaseTopic);
    }
    messaging()
      .hasPermission()
      .then(enabled => {
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
            .catch(error => {
              // console.log('User has rejected permissions');
            });
        }
      });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const messageListener = messaging().onMessage(message => {
      // Process your message as required
      // console.log('messageListener', message);
    });

    messaging().subscribeToTopic(FirebaseTopic.MESSAGE);

    return () => {
      messageListener();
    };
  }, []);

  useEffect(() => {
    setRootViewBackgroundColor(
      settings.isDark ? Dark.colors.background : Light.colors.background,
    );
    try {
      changeNavigationBarColor(statusBarColor, !settings.isDark, false);
    } catch (cnbcError) {
      // console.log(cnbcError);
    }
  }, [settings.isDark]);

  return (
    <NetworkProvider>
      <SafeAreaProvider>
        <PaperProvider theme={switchTheme}>
          <StatusBar
            translucent
            backgroundColor={Colors.transparent}
            barStyle={statusBarStyle}
          />
          <ModalProvider stack={Modals}>
            <NavigationContainer theme={switchTheme}>
              <Stack.Navigator screenOptions={{headerBackTitle: 'Back'}}>
                {appRoute === 'LOADING' ? (
                  <Stack.Screen
                    component={SplashScreen}
                    name="SplashScreen"
                    options={noHeader}
                  />
                ) : (
                  <>
                    <Stack.Screen
                      component={LLSIFTab}
                      name="Main"
                      options={noHeader}
                    />
                    <Stack.Screen
                      component={IdolsScreen}
                      name="IdolsScreen"
                      options={{title: 'School Idols'}}
                    />
                    <Stack.Screen
                      component={SongsScreen}
                      name="SongsScreen"
                      options={noHeader}
                    />
                    <Stack.Screen
                      component={CardDetailScreen}
                      name="CardDetailScreen"
                      options={noHeader}
                    />
                    <Stack.Screen
                      component={EventDetailScreen}
                      name="EventDetailScreen"
                      options={noHeader}
                    />
                    <Stack.Screen
                      component={EventTrackerScreen}
                      name="EventTrackerScreen"
                      options={{title: ''}}
                    />
                    <Stack.Screen
                      component={IdolDetailScreen}
                      name="IdolDetailScreen"
                      options={noHeader}
                    />
                    <Stack.Screen
                      component={SongDetailScreen}
                      name="SongDetailScreen"
                      options={noHeader}
                    />
                    <Stack.Screen
                      component={AboutMeScreen}
                      name="AboutMeScreen"
                      options={{title: 'About me'}}
                    />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </ModalProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </NetworkProvider>
  );
};

export default MainContainer;
