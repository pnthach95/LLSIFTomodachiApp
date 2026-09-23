import type {NativeBottomTabScreenProps} from '@react-navigation/bottom-tabs/unstable';
import type {CompositeScreenProps} from '@react-navigation/native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Main: undefined;
  SplashScreen: undefined;
  IdolsScreen: undefined;
  SongsScreen: undefined;
  CardDetailScreen: {item: CardObject};
  EventDetailScreen: {eventName: string};
  IdolDetailScreen: {name: string};
  SongDetailScreen: {item: SongObject; tag: string};
  AboutMeScreen: undefined;
  Gallery: {idx: number; images: string[]};
};

type BottomTabList = {
  CardsScreen: undefined;
  EventsScreen: undefined;
  MoreScreen: undefined;
};

type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

type MainTabScreenProps<T extends keyof BottomTabList> = CompositeScreenProps<
  NativeBottomTabScreenProps<BottomTabList, T>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
