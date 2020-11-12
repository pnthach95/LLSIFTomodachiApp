import React, { useContext } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ModalProvider } from 'react-native-modalfy';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';

import { AppStyles, Dark, Light } from '~/Theme';
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

import type { RootStackParamList } from '~/Utils/types';

const Stack = createStackNavigator<RootStackParamList>();

const Routes = (): JSX.Element => {
  const { state } = useContext(UserContext);
  const { colors } = useTheme();
  const bgColor = { backgroundColor: colors.background };

  return (
    <PaperProvider theme={state.options.isDark ? Dark : Light}>
      <ModalProvider stack={Modals}>
        <View style={[AppStyles.screen, bgColor]}>
          <NavigationContainer theme={state.options.isDark ? Dark : Light}>
            <Stack.Navigator>
              {state.loading ? (
                <Stack.Screen
                  name='SplashScreen'
                  component={SplashScreen}
                  options={{
                    headerShown: false
                  }}
                />
              ) : (
                <>
                  <Stack.Screen
                    name='Main'
                    component={LLSIFTab}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='IdolsScreen'
                    component={IdolsScreen}
                    options={{
                      title: 'School Idols'
                    }}
                  />
                  <Stack.Screen
                    name='SongsScreen'
                    component={SongsScreen}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='CardDetailScreen'
                    component={CardDetailScreen}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='EventDetailScreen'
                    component={EventDetailScreen}
                    options={{
                      title: ''
                    }}
                  />
                  <Stack.Screen
                    name='EventTrackerScreen'
                    component={EventTrackerScreen}
                    options={{
                      title: ''
                    }}
                  />
                  <Stack.Screen
                    name='IdolDetailScreen'
                    component={IdolDetailScreen}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='SongDetailScreen'
                    component={SongDetailScreen}
                    options={{
                      headerShown: false
                    }}
                  />
                  <Stack.Screen
                    name='AboutMeScreen'
                    component={AboutMeScreen}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </ModalProvider>
    </PaperProvider>
  );
};

export default Routes;
