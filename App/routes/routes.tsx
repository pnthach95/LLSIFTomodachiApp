import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { setRootViewBackgroundColor } from '@pnthach95/react-native-root-view-background';
import { ModalProvider } from 'react-native-modalfy';
import { Provider as PaperProvider } from 'react-native-paper';

import { Colors, Dark, Light } from '~/Theme';
import UserContext from '~/Context/UserContext';
import Modals from '~/modals';

import LLSIFTab from './tabs';
import SplashScreen from '~/screens/Splash';
import IdolsScreen from '~/screens/Idols';
import SongsScreen from '~/screens/Songs';
import CardDetailScreen from '~/screens/CardDetail';
import EventDetailScreen from '~/screens/EventDetail';
import EventTrackerScreen from '~/screens/EventDetail/Tracker';
import IdolDetailScreen from '~/screens/IdolDetail';
import SongDetailScreen from '~/screens/SongDetail';
import AboutMeScreen from '~/screens/AboutMe';

import type { RootStackParamList } from '~/typings';

const Stack = createStackNavigator<RootStackParamList>();

const noHeader = { headerShown: false };

const Routes = (): JSX.Element => {
  const { state } = useContext(UserContext);
  const switchTheme = state.options.isDark ? Dark : Light;
  const statusBarColor = state.options.isDark
    ? Dark.colors.card
    : Light.colors.card;
  const statusBarStyle = state.options.isDark
    ? 'light-content'
    : 'dark-content';

  useEffect(() => {
    setRootViewBackgroundColor(
      state.options.isDark ? Dark.colors.background : Light.colors.background,
    );
    try {
      changeNavigationBarColor(statusBarColor, !state.options.isDark, false);
    } catch (cnbcError) {
      // console.log(cnbcError);
    }
  }, [state.options.isDark]);

  return (
    <PaperProvider theme={switchTheme}>
      <StatusBar
        backgroundColor={Colors.transparent}
        barStyle={statusBarStyle}
        translucent
      />
      <ModalProvider stack={Modals}>
        <NavigationContainer theme={switchTheme}>
          <Stack.Navigator screenOptions={{ headerBackTitle: 'Back' }}>
            {state.loading ? (
              <Stack.Screen
                name='SplashScreen'
                component={SplashScreen}
                options={noHeader}
              />
            ) : (
              <>
                <Stack.Screen
                  name='Main'
                  component={LLSIFTab}
                  options={noHeader}
                />
                <Stack.Screen
                  name='IdolsScreen'
                  component={IdolsScreen}
                  options={{ title: 'School Idols' }}
                />
                <Stack.Screen
                  name='SongsScreen'
                  component={SongsScreen}
                  options={noHeader}
                />
                <Stack.Screen
                  name='CardDetailScreen'
                  component={CardDetailScreen}
                  options={noHeader}
                />
                <Stack.Screen
                  name='EventDetailScreen'
                  component={EventDetailScreen}
                  options={noHeader}
                />
                <Stack.Screen
                  name='EventTrackerScreen'
                  component={EventTrackerScreen}
                  options={{ title: '' }}
                />
                <Stack.Screen
                  name='IdolDetailScreen'
                  component={IdolDetailScreen}
                  options={noHeader}
                />
                <Stack.Screen
                  name='SongDetailScreen'
                  component={SongDetailScreen}
                  options={noHeader}
                />
                <Stack.Screen
                  name='AboutMeScreen'
                  component={AboutMeScreen}
                  options={{ title: 'About me' }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </PaperProvider>
  );
};

export default Routes;
