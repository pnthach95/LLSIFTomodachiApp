import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {StackScreenProps} from '@react-navigation/stack';

type RootStackParamList = {
  Main: undefined;
  SplashScreen: undefined;
  IdolsScreen: undefined;
  SongsScreen: undefined;
  CardDetailScreen: {item: CardObject};
  EventDetailScreen: {eventName: string};
  EventTrackerScreen: {isWW: boolean; name: string; backup?: string};
  IdolDetailScreen: {name: string};
  SongDetailScreen: {item: SongObject};
  AboutMeScreen: undefined;
};

type BottomTabList = {
  MainScreen: undefined;
  CardsScreen: undefined;
  EventsScreen: undefined;
  MoreScreen: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

type MainTabScreenProps<T extends keyof BottomTabList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabList, T>,
  StackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
