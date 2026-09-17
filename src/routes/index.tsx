import '../global.css';
import {setRootViewBackgroundColor} from '@pnthach95/react-native-root-view-background';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {useThemeColor} from 'heroui-native/hooks';
import {HeroUINativeProvider} from 'heroui-native/provider';
import Modals from 'modals';
import {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ModalProvider} from 'react-native-modalfy';
import {NetworkProvider} from 'react-native-offline';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AboutMeScreen from 'screens/aboutme';
import CardDetailScreen from 'screens/carddetail';
import EventDetailScreen from 'screens/eventdetail';
import EventTrackerScreen from 'screens/eventdetail/Tracker';
import GalleryScreen from 'screens/gallery';
import IdolDetailScreen from 'screens/idoldetail';
import IdolsScreen from 'screens/idols';
import SongDetailScreen from 'screens/songdetail';
import SongsScreen from 'screens/songs';
import {useAppTheme} from 'store';
import LLSIFTab from './tabs';
import type {RootStackParamList} from 'typings/navigation';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(localizedFormat);

const Stack = createNativeStackNavigator<RootStackParamList>();

const noHeader = {headerShown: false};

const MainContainer = () => {
  const appTheme = useAppTheme();
  const [background, border, card, primary, text] = useThemeColor([
    'background',
    'border',
    'surface',
    'accent',
    'foreground',
  ]);
  const theme: ReactNavigation.Theme = {
    dark: appTheme === 'dark',
    fonts: appTheme === 'dark' ? DarkTheme.fonts : DefaultTheme.fonts,
    colors: {
      background,
      border,
      card,
      notification:
        appTheme === 'dark'
          ? DarkTheme.colors.notification
          : DefaultTheme.colors.notification,
      primary,
      text,
    },
  };

  useEffect(() => {
    setRootViewBackgroundColor(background);
  }, [background]);

  const onReady = () => {
    BootSplash.hide({fade: true});
  };

  return (
    <NetworkProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView className="flex-1">
          <HeroUINativeProvider>
            <StatusBar
              animated
              translucent
              backgroundColor="transparent"
              barStyle={appTheme === 'dark' ? 'light-content' : 'dark-content'}
            />
            <ModalProvider stack={Modals}>
              <NavigationContainer theme={theme} onReady={onReady}>
                <Stack.Navigator
                  screenOptions={{headerBackButtonDisplayMode: 'minimal'}}>
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
                  <Stack.Screen
                    component={GalleryScreen}
                    name="Gallery"
                    options={{headerShown: false}}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </ModalProvider>
          </HeroUINativeProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </NetworkProvider>
  );
};

export default MainContainer;
