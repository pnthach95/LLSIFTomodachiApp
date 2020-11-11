import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabBarItemConfig
} from '@gorhom/animated-tabbar';
import { ModalProvider } from 'react-native-modalfy';
import { Provider as PaperProvider, useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors, Dark, Light } from '~/Theme';
import UserContext from '~/Context/UserContext';
import Modals from '~/modals';

import SplashScreen from '~/screens/Splash';
import MainScreen from '~/screens/Main';
import CardsScreen from '~/screens/Cards';
import IdolsScreen from '~/screens/Idols';
import EventsScreen from '~/screens/Events';
import SongsScreen from '~/screens/Songs';
import MoreScreen from '~/screens/More';
import CardDetailScreen from '~/screens/CardDetail';
import EventDetailScreen from '~/screens/EventDetail';
import EventTrackerScreen from '~/screens/EventDetail/Tracker';
import IdolDetailScreen from '~/screens/IdolDetail';
import SongDetailScreen from '~/screens/SongDetail';
import AboutMeScreen from '~/screens/AboutMe';

import type { BottomTabList, RootStackParamList } from '~/Utils/types';

type IconProps = {
  color: Animated.Node<string>;
  size: number;
};

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
      color: Colors.pink
    },
    icon: {
      component: homeIcon,
      activeColor: Colors.pink,
      inactiveColor: Colors.grey600
    },
    background: {
      activeColor: Colors.lightPink,
      inactiveColor: Colors.transparent
    }
  },
  CardsScreen: {
    labelStyle: {
      color: Colors.green
    },
    icon: {
      component: cardIcon,
      activeColor: Colors.green,
      inactiveColor: Colors.grey600
    },
    background: {
      activeColor: Colors.lightGreen,
      inactiveColor: Colors.transparent
    }
  },
  EventsScreen: {
    labelStyle: {
      color: Colors.blue
    },
    icon: {
      component: eventIcon,
      activeColor: Colors.blue,
      inactiveColor: Colors.grey600
    },
    background: {
      activeColor: Colors.lightBlue,
      inactiveColor: Colors.transparent
    }
  },
  MoreScreen: {
    labelStyle: {
      color: Colors.yellow900
    },
    icon: {
      component: moreIcon,
      activeColor: Colors.yellow900,
      inactiveColor: Colors.grey600
    },
    background: {
      activeColor: Colors.yellow200,
      inactiveColor: Colors.transparent
    }
  }
};

const Tab = createBottomTabNavigator<BottomTabList>();
const Stack = createStackNavigator<RootStackParamList>();

const LLSIFTab = () => {
  const { colors } = useTheme();
  const tabStyle = {
    backgroundColor: colors.card
  };

  return (
    <Tab.Navigator
      tabBar={(props) => (
        //@ts-ignore
        <AnimatedTabBar tabs={tabs} style={tabStyle} {...props} />
      )}>
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
    <PaperProvider theme={state.options.isDark ? Dark : Light}>
      <ModalProvider stack={Modals}>
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
                <Stack.Screen name='IdolsScreen' component={IdolsScreen} />
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
                <Stack.Screen name='AboutMeScreen' component={AboutMeScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </PaperProvider>
  );
};

export default Routes;
