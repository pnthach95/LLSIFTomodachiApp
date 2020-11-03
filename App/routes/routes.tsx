/*
 * Filename: d:\Projects\LLSIFTomodachiApp\App\routes\routes.tsx
 * Path: d:\Projects\LLSIFTomodachiApp
 * Created Date: Tuesday, November 3rd 2020, 1:57:03 pm
 * Author: Pham Ngoc Thach
 *
 * Copyright (c) 2020 HONEYNET
 */
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
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { BottomTabList, RootStackParamList } from '~/Utils/type';
import UserContext from '~/Context/UserContext';

import LoadingScreen from '~/screens/Loading';
import MainScreen from '~/screens/Main';
import CardsScreen from '~/screens/Cards';
import IdolsScreen from '~/screens/Idols';
import EventsScreen from '~/screens/Events';
import SongsScreen from '~/screens/Songs';

import CardDetailScreen from '~/screens/CardDetail';
import EventDetailScreen from '~/screens/EventDetail';
import IdolDetailScreen from '~/screens/IdolDetail';
import SongDetailScreen from '~/screens/SongDetail';

const tabs: TabsConfig<BubbleTabBarItemConfig> = {
  MainScreen: {
    labelStyle: {
      color: '#5B37B7'
    },
    icon: {
      component: () => <Icon name='home' />,
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
      component: () => <Ionicons name='ios-albums-sharp' />,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)'
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)'
    }
  },
  IdolsScreen: {
    labelStyle: {
      color: '#1194AA'
    },
    icon: {
      component: () => <Ionicons name='ios-star' />,
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
      component: () => <Ionicons name='md-calendar' />,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)'
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)'
    }
  },
  SongsScreen: {
    labelStyle: {
      color: '#1194AA'
    },
    icon: {
      component: () => <Ionicons name='ios-musical-notes' />,
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
      // @ts-ignore
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
        name='IdolsScreen'
        component={IdolsScreen}
        options={{
          tabBarLabel: 'Idols'
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
        name='SongsScreen'
        component={SongsScreen}
        options={{
          tabBarLabel: 'Songs'
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  const { state } = useContext(UserContext);
  return (
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
  );
};

export default Routes;
