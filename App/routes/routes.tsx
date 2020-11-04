import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabNavigationProp
} from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabBarItemConfig
} from '@gorhom/animated-tabbar';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import type { BottomTabList, RootStackParamList } from '~/Utils/types';
import UserContext from '~/Context/UserContext';

import LoadingScreen from '~/screens/Loading';
import MainScreen from '~/screens/Main';
import CardsScreen from '~/screens/Cards';
import IdolsScreen from '~/screens/Idols';
import EventsScreen from '~/screens/Events';
import SongsScreen from '~/screens/Songs';
import MoreScreen from '~/screens/More';
import CardDetailScreen from '~/screens/CardDetail';
import EventDetailScreen from '~/screens/EventDetail';
import IdolDetailScreen from '~/screens/IdolDetail';
import SongDetailScreen from '~/screens/SongDetail';

const homeIcon = () => <Icon name='home' />;
const cardIcon = () => <Ionicons name='ios-albums-sharp' />;
const eventIcon = () => <Ionicons name='md-calendar' />;
const songIcon = () => <Ionicons name='ios-musical-notes' />;

const tabs: TabsConfig<BubbleTabBarItemConfig> = {
  MainScreen: {
    labelStyle: {
      color: '#5B37B7'
    },
    icon: {
      component: homeIcon,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)'
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)'
    }
  },
  CardsScreen: {
    labelStyle: {
      color: '#1194AA'
    },
    icon: {
      component: cardIcon,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)'
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)'
    }
  },
  EventsScreen: {
    labelStyle: {
      color: '#1194AA'
    },
    icon: {
      component: eventIcon,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)'
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)'
    }
  },
  MoreScreen: {
    labelStyle: {
      color: '#1194AA'
    },
    icon: {
      component: songIcon,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)'
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)'
    }
  }
};

const Tab = createBottomTabNavigator<BottomTabList>();
const Stack = createStackNavigator<RootStackParamList>();

const LLSIFTab: React.FC<BottomTabNavigationProp<BottomTabList>> = () => {
  return (
    <Tab.Navigator
      //@ts-ignore
      tabBar={(props) => <AnimatedTabBar tabs={tabs} {...props} />}>
      <Tab.Screen
        name='MainScreen'
        component={MainScreen}
        options={{
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name='CardsScreen'
        component={CardsScreen}
        options={{
          tabBarLabel: 'Cards'
        }}
      />
      <Tab.Screen
        name='EventsScreen'
        component={EventsScreen}
        options={{
          tabBarLabel: 'Events'
        }}
      />
      <Tab.Screen
        name='MoreScreen'
        component={MoreScreen}
        options={{
          tabBarLabel: 'More'
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = (): JSX.Element => {
  const { state } = useContext(UserContext);
  return (
    <PaperProvider theme={DefaultTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.loading ? (
            <Stack.Screen
              name='LoadingScreen'
              component={LoadingScreen}
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
              <Stack.Screen name='IdolsScreen' component={IdolsScreen} />
              <Stack.Screen name='SongsScreen' component={SongsScreen} />
              <Stack.Screen
                name='CardDetailScreen'
                component={CardDetailScreen}
              />
              <Stack.Screen
                name='EventDetailScreen'
                component={EventDetailScreen}
              />
              <Stack.Screen
                name='IdolDetailScreen'
                component={IdolDetailScreen}
              />
              <Stack.Screen
                name='SongDetailScreen'
                component={SongDetailScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Routes;
