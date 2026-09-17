import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

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
  Gallery: {idx: number; images: string[]};
};

type BottomTabList = {
  MainScreen: undefined;
  CardsScreen: undefined;
  EventsScreen: undefined;
  MoreScreen: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

type MainTabScreenProps<T extends keyof BottomTabList> = CompositeScreenProps<
  BottomTabScreenProps<BottomTabList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
