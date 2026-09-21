import Icon from '@react-native-vector-icons/material-design-icons';
import {createNativeBottomTabNavigator} from '@react-navigation/bottom-tabs/unstable';
import {useThemeColor} from 'heroui-native/hooks';
import CardsScreen from 'screens/cards';
import EventsScreen from 'screens/events';
import MoreScreen from 'screens/more';
import type {BottomTabList} from 'typings/navigation';

const ICON_SIZE = 24;
const Tab = createNativeBottomTabNavigator<BottomTabList>();

const LLSIFTab = () => {
  //@ts-ignore
  const [smile, pure, cool]: string[] = useThemeColor([
    //@ts-ignore
    'smile',
    'pure',
    'cool',
  ]);

  return (
    <Tab.Navigator backBehavior="initialRoute">
      <Tab.Screen
        component={CardsScreen}
        name="CardsScreen"
        options={{
          headerShown: true,
          tabBarLabel: 'Cards',
          tabBarActiveTintColor: smile,
          tabBarIcon: {
            source: Icon.getImageSourceSync('cards', {size: ICON_SIZE}),
            type: 'image',
          },
          title: 'Cards',
        }}
      />
      <Tab.Screen
        component={EventsScreen}
        name="EventsScreen"
        options={{
          tabBarLabel: 'Events',
          tabBarActiveTintColor: pure,
          tabBarIcon: {
            source: Icon.getImageSourceSync('calendar', {size: ICON_SIZE}),
            type: 'image',
          },
          title: 'Events',
        }}
      />
      <Tab.Screen
        component={MoreScreen}
        name="MoreScreen"
        options={{
          tabBarLabel: 'More',
          tabBarActiveTintColor: cool,
          tabBarIcon: {
            source: Icon.getImageSourceSync('dots-horizontal', {
              size: ICON_SIZE,
            }),
            type: 'image',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default LLSIFTab;
