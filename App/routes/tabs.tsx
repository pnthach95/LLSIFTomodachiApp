import AnimatedTabBar from '@gorhom/animated-tabbar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import {useTheme} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '~/Theme';
import CardsScreen from '~/screens/Cards';
import EventsScreen from '~/screens/Events';
import MainScreen from '~/screens/Main';
import MoreScreen from '~/screens/More';
import type {BottomTabList} from '~/typings/navigation';
import type {BubbleTabBarItemConfig, TabsConfig} from '@gorhom/animated-tabbar';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';

type IconProps = {
  color: Animated.Node<string>;
  size: number;
};

const Tab = createBottomTabNavigator<BottomTabList>();

const Icon = Animated.createAnimatedComponent(Ionicons);

const homeIcon = ({size, color}: IconProps) => (
  <Icon color={color} name="home" size={size} />
);
const cardIcon = ({size, color}: IconProps) => (
  <Icon color={color} name="albums" size={size} />
);
const eventIcon = ({size, color}: IconProps) => (
  <Icon color={color} name="calendar" size={size} />
);
const moreIcon = ({size, color}: IconProps) => (
  <Icon color={color} name="ellipsis-horizontal" size={size} />
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

const LLSIFTab = () => {
  const {colors} = useTheme();
  const tabStyle = {backgroundColor: colors.card};

  const TabBar = useCallback(
    (props: BottomTabBarProps) => {
      return <AnimatedTabBar style={tabStyle} tabs={tabs} {...props} />;
    },
    [tabStyle],
  );

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={{headerShown: false}}
      tabBar={TabBar}>
      <Tab.Screen
        component={MainScreen}
        name="MainScreen"
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        component={CardsScreen}
        name="CardsScreen"
        options={{tabBarLabel: 'Cards'}}
      />
      <Tab.Screen
        component={EventsScreen}
        name="EventsScreen"
        options={{tabBarLabel: 'Events'}}
      />
      <Tab.Screen
        component={MoreScreen}
        name="MoreScreen"
        options={{tabBarLabel: 'More'}}
      />
    </Tab.Navigator>
  );
};

export default LLSIFTab;
