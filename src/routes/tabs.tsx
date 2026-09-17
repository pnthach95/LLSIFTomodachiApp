import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MaterialDesignIcons} from 'components/uniwind';
import CardsScreen from 'screens/cards';
import EventsScreen from 'screens/events';
import MainScreen from 'screens/main';
import MoreScreen from 'screens/more';
import type {BottomTabList} from 'typings/navigation';

const Tab = createBottomTabNavigator<BottomTabList>();

const LLSIFTab = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        component={MainScreen}
        name="MainScreen"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused, size}) => (
            <MaterialDesignIcons
              colorClassName="data-[checked=true]:accent-pink accent-gray-600"
              data-checked={focused}
              name="home"
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        component={CardsScreen}
        name="CardsScreen"
        options={{
          tabBarLabel: 'Cards',
          tabBarIcon: ({focused, size}) => (
            <MaterialDesignIcons
              colorClassName="data-[checked=true]:accent-green accent-gray-600"
              data-checked={focused}
              name="cards"
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        component={EventsScreen}
        name="EventsScreen"
        options={{
          tabBarLabel: 'Events',
          tabBarIcon: ({focused, size}) => (
            <MaterialDesignIcons
              colorClassName="data-[checked=true]:accent-blue accent-gray-600"
              data-checked={focused}
              name="calendar"
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        component={MoreScreen}
        name="MoreScreen"
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({focused, size}) => (
            <MaterialDesignIcons
              colorClassName="accent-gray-600 data-[checked=true]:accent-yellow-900"
              data-checked={focused}
              name="dots-horizontal"
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default LLSIFTab;
