import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import { useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '~/Theme';

import MainScreen from '~/screens/Main';
import CardsScreen from '~/screens/Cards';
import EventsScreen from '~/screens/Events';
import MoreScreen from '~/screens/More';

import type { BottomTabList } from '~/Utils/types';

type IconProps = {
  color: Animated.Node<string>;
  size: number;
};

const Tab = createBottomTabNavigator<BottomTabList>();

const Icon = Animated.createAnimatedComponent(Ionicons);

const homeIcon = ({ size, color }: IconProps) => (
  <Icon name='home' size={size} color={color} />
);
const cardIcon = ({ size, color }: IconProps) => (
  <Icon name='albums' size={size} color={color} />
);
const eventIcon = ({ size, color }: IconProps) => (
  <Icon name='calendar' size={size} color={color} />
);
const moreIcon = ({ size, color }: IconProps) => (
  <Icon name='ellipsis-horizontal' size={size} color={color} />
);

const tabs: TabsConfig<BubbleTabBarItemConfig, BottomTabList> = {
  MainScreen: {
    labelStyle: {
      color: Colors.pink,
    },
    icon: {
      component: homeIcon,
      activeColor: Colors.pink,
      inactiveColor: Colors.grey600,
    },
    background: {
      activeColor: Colors.lightPink,
      inactiveColor: Colors.transparent,
    },
  },
  CardsScreen: {
    labelStyle: {
      color: Colors.green,
    },
    icon: {
      component: cardIcon,
      activeColor: Colors.green,
      inactiveColor: Colors.grey600,
    },
    background: {
      activeColor: Colors.lightGreen,
      inactiveColor: Colors.transparent,
    },
  },
  EventsScreen: {
    labelStyle: {
      color: Colors.blue,
    },
    icon: {
      component: eventIcon,
      activeColor: Colors.blue,
      inactiveColor: Colors.grey600,
    },
    background: {
      activeColor: Colors.lightBlue,
      inactiveColor: Colors.transparent,
    },
  },
  MoreScreen: {
    labelStyle: {
      color: Colors.yellow900,
    },
    icon: {
      component: moreIcon,
      activeColor: Colors.yellow900,
      inactiveColor: Colors.grey600,
    },
    background: {
      activeColor: Colors.yellow200,
      inactiveColor: Colors.transparent,
    },
  },
};

const LLSIFTab = (): JSX.Element => {
  const { colors } = useTheme();
  const tabStyle = { backgroundColor: colors.card };

  return (
    <Tab.Navigator
      backBehavior='initialRoute'
      tabBar={(props) => (
        //@ts-ignore
        <AnimatedTabBar tabs={tabs} style={tabStyle} {...props} />
      )}>
      <Tab.Screen
        name='MainScreen'
        component={MainScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name='CardsScreen'
        component={CardsScreen}
        options={{ tabBarLabel: 'Cards' }}
      />
      <Tab.Screen
        name='EventsScreen'
        component={EventsScreen}
        options={{ tabBarLabel: 'Events' }}
      />
      <Tab.Screen
        name='MoreScreen'
        component={MoreScreen}
        options={{ tabBarLabel: 'More' }}
      />
    </Tab.Navigator>
  );
};

export default LLSIFTab;
