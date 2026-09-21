import Icon from '@react-native-vector-icons/material-design-icons';
import {createNativeBottomTabNavigator} from '@react-navigation/bottom-tabs/unstable';
import {useThemeColor} from 'heroui-native/hooks';
import CardsScreen from 'screens/cards';
import EventsScreen from 'screens/events';
import MoreScreen from 'screens/more';
import type {BottomTabList, RootStackScreenProps} from 'typings/navigation';

const ICON_SIZE = 24;
const Tab = createNativeBottomTabNavigator<BottomTabList>();

const LLSIFTab = ({navigation}: RootStackScreenProps<'Main'>) => {
  //@ts-ignore
  const [smile, pure, cool]: string[] = useThemeColor([
    //@ts-ignore
    'smile',
    'pure',
    'cool',
  ]);

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        component={CardsScreen}
        listeners={{
          focus: () => {
            navigation.setOptions({title: 'Cards'});
          },
        }}
        name="CardsScreen"
        options={{
          tabBarLabel: 'Cards',
          tabBarActiveTintColor: smile,
          tabBarIcon: {
            source: Icon.getImageSourceSync('cards', {size: ICON_SIZE}),
            type: 'image',
          },
        }}
      />
      <Tab.Screen
        component={EventsScreen}
        listeners={{
          focus: () => {
            navigation.setOptions({title: 'Events'});
          },
        }}
        name="EventsScreen"
        options={{
          tabBarLabel: 'Events',
          tabBarActiveTintColor: pure,
          tabBarIcon: {
            source: Icon.getImageSourceSync('calendar', {size: ICON_SIZE}),
            type: 'image',
          },
        }}
      />
      <Tab.Screen
        component={MoreScreen}
        listeners={{
          focus: () => {
            navigation.setOptions({title: 'More'});
          },
        }}
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
