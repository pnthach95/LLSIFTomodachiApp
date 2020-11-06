import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import {
  ModalComponentWithOptions,
  ModalComponentProp
} from 'react-native-modalfy';

type AppOptions = {
  isDark: boolean;
  wwEvent: boolean;
  jpEvent: boolean;
  worldwideOnly: boolean;
};

type AppState = {
  loading: boolean;
  cachedData: CachedDataObject;
  options: AppOptions;
};

type ActionType =
  | { type: 'LOADING'; loading: boolean }
  | { type: 'SAVE_CACHED_DATA'; data: CachedDataObject }
  | { type: 'SAVE_OPTIONS'; data: AppOptions };

type BottomTabList = {
  MainScreen: undefined;
  CardsScreen: undefined;
  EventsScreen: undefined;
  MoreScreen: undefined;
};

type MainScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabList, 'MainScreen'>,
    StackNavigationProp<RootStackParamList>
  >;
};
type CardsScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabList, 'CardsScreen'>,
    StackNavigationProp<RootStackParamList>
  >;
};
type EventsScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabList, 'EventsScreen'>,
    StackNavigationProp<RootStackParamList>
  >;
};
type MoreScreenProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabList, 'MoreScreen'>,
    StackNavigationProp<RootStackParamList>
  >;
};

type RootStackParamList = {
  Main: undefined;
  SplashScreen: undefined;
  IdolsScreen: undefined;
  SongsScreen: undefined;
  CardDetailScreen: { item: CardObject };
  EventDetailScreen: { eventName: string };
  IdolDetailScreen: { name: string };
  SongDetailScreen: { item: SongObject };
  AboutMeScreen: undefined;
};

type SplashScreenProps = StackScreenProps<RootStackParamList, 'SplashScreen'>;
type SongsScreenProps = StackScreenProps<RootStackParamList, 'SongsScreen'>;
type CardDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'CardDetailScreen'
>;
type EventDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'EventDetailScreen'
>;
type IdolDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'IdolDetailScreen'
>;
type SongDetailScreenProps = StackScreenProps<
  RootStackParamList,
  'SongDetailScreen'
>;

type ModalStackParamList = {
  list: {
    title: string;
    selectedItem: string | undefined;
    data?: string[];
    objectData?: SelectionObject[];
    onPress: <T extends string & SkillType>(item: T) => void;
  };
};

type ListModalComponent = ModalComponentWithOptions<
  ModalComponentProp<ModalStackParamList, void, 'list'>
>;

type YearType = 'First' | 'Second' | 'Third' | '';
type MainUnitNames = `μ's` | 'Aqours' | '';
type SubUnitNames =
  | 'Printemps'
  | 'Lily White'
  | 'Bibi'
  | 'CYaRon!'
  | 'AZALEA'
  | 'Guilty Kiss'
  | 'Saint Snow'
  | 'A-RISE';

type BooleanOrEmpty = 'True' | 'False' | '';
type AttributeType = 'Smile' | 'Pure' | 'Cool' | 'All' | '';
type RarityType = 'N' | 'R' | 'SR' | 'SSR' | 'UR' | '';
type SkillType =
  | 'All'
  | 'Score Up'
  | 'Healer'
  | 'Perfect Lock'
  | 'Perfect Charm'
  | 'Rhythmical Charm'
  | 'Timer Yell'
  | 'Timer Charm'
  | 'Rhythmical Yell'
  | 'Total Charm'
  | 'Total Trick'
  | 'Perfect Yell'
  | 'Total Yell'
  | 'Timer Trick';

type SelectionObject = { label: string; value: string };

type CachedDataObject = {
  idols: string[];
  skills: string[];
  subUnits: SubUnitNames[];
  schools: string[];
  maxStats: {
    Smile: number;
    Pure: number;
    Cool: number;
  };
  songsMaxStats: number;
  ENEvent: EventObject;
  JPEvent: EventObject;
  eventInfo: LLNETEventInfo;
};

type LLNETEvent = {
  event_id: number;
  start_date: number;
};

type LLNETEventInfo = { ww: LLNETEvent[] | null; jp: LLNETEvent[] | null };

type LLSIFnetParams = {
  server: string;
  id: number;
};

type LLSIFnetEvent = {
  banner_url: string;
  end_date: number;
  end_date_localized: string;
  event_cards: number[];
  event_girls: string[];
  event_id: number;
  event_name: string;
  event_type: string;
  final_t1: number;
  final_t2: number;
  final_t3: number;
  start_date: number;
  start_date_localized: string;
  t3_is_significant: boolean;
  no_tier_event: boolean;
  points_cutoffs: number[];
  score_cutoffs: number[];
  final_points_tiers: number[];
  final_score_tiers: number[];
};

type LLSIFnetData = {
  current_en_event: number | null;
  current_jp_event: number | null;
  en_events: Record<string, LLSIFnetEvent>;
  jp_events: Record<string, LLSIFnetEvent>;
};

type CardObject = {
  id: number;
  game_id: string;
  idol: MiniIdolObject;
  rarity: RarityType;
  attribute: AttributeType;
  japanese_collection?: string;
  translated_collection?: string;
  japanese_attribute?: string;
  is_promo?: boolean;
  promo_item?: string;
  promo_link?: string;
  release_date?: string;
  japan_only?: boolean;
  event?: MiniEventObject;
  other_event?: MiniEventObject;
  is_special?: boolean;
  hp?: number;
  minimum_statistics_smile?: number;
  minimum_statistics_pure?: number;
  minimum_statistics_cool?: number;
  non_idolized_maximum_statistics_smile?: number;
  non_idolized_maximum_statistics_pure?: number;
  non_idolized_maximum_statistics_cool?: number;
  idolized_maximum_statistics_smile?: number;
  idolized_maximum_statistics_pure?: number;
  idolized_maximum_statistics_cool?: number;
  skill?: SkillType;
  japanese_skill?: string;
  skill_details?: string;
  japanese_skill_details?: string;
  center_skill?: string;
  center_skill_details?: string;
  japanese_center_skill?: string;
  japanese_center_skill_details?: string;
  card_image?: string;
  card_idolized_image: string;
  round_card_image?: string;
  round_card_idolized_image?: string;
  video_story?: string;
  japanese_video_story?: string;
  website_url: string;
  non_idolized_max_level?: number;
  idolized_max_level?: number;
  transparent_image?: string;
  transparent_idolized_image?: string;
  clean_ur?: string;
  clean_ur_idolized?: string;
  skill_up_cards?: TinyCardForSkillUpObject;
  ur_pair?: URPairObject;
  total_owners?: number;
  total_wishlist?: number;
  ranking_attribute?: number;
  ranking_rarity?: number;
  ranking_special?: number;
};

type MiniIdolObject = {
  name: string;
  school?: string;
  year?: string;
  main_unit?: MainUnitNames;
  japanese_name?: string;
  sub_unit?: SubUnitNames;
};

type MiniEventObject = {
  japanese_name: string;
  english_name?: string;
  translated_name?: string;
  image: string;
};

type TinyCardForSkillUpObject = {
  id?: string;
  round_card_image: string;
};

type URPairObject = {
  card?: {
    attribute?: string;
    round_card_image?: string;
    id?: string;
    name?: string;
  };
  reverse_display_idolized?: string;
  reverse_display?: string;
};

type EventObject = {
  japanese_name: string;
  romaji_name?: string;
  english_name?: string;
  translated_name?: string;
  image: string;
  english_image?: string;
  beginning?: string;
  end?: string;
  english_beginning?: string;
  english_end?: string;
  japan_current?: boolean;
  world_current?: boolean;
  english_status?: string;
  japan_status?: string;
  japanese_t1_points?: number;
  japanese_t1_rank?: number;
  japanese_t2_points?: number;
  japanese_t2_rank?: number;
  english_t1_points?: number;
  english_t1_rank?: number;
  english_t2_points?: number;
  english_t2_rank?: number;
  note?: string;
  website_url: string;
};

type IdolObject = {
  name: string;
  japanese_name?: string;
  main?: boolean;
  age?: number;
  school?: string;
  birthday?: string;
  astrological_sign?: string;
  blood?: string;
  height?: number;
  measurements?: string;
  favorite_food?: string;
  least_favorite_food?: string;
  hobbies?: string;
  attribute?: AttributeType;
  year?: string;
  main_unit?: string;
  sub_unit?: string;
  cv?: CVObject;
  summary?: string;
  website_url: string;
  wiki_url?: string;
  wikia_url?: string;
  official_url?: string;
  chibi?: string;
  chibi_small?: string;
};

type CVObject = {
  name: string;
  nickname: string;
  url: string;
  twitter?: string;
  instagram?: string;
};

type SongObject = {
  name: string;
  romaji_name?: string;
  translated_name?: string;
  attribute: AttributeType;
  main_unit?: MainUnitNames;
  BPM?: number;
  time: number;
  event?: EventObject;
  rank?: number;
  daily_rotation?: string;
  daily_rotation_position?: number;
  image: string;
  easy_difficulty: number;
  easy_notes: number;
  normal_difficulty: number;
  normal_notes: number;
  hard_difficulty: number;
  hard_notes: number;
  expert_difficulty: number;
  expert_random_difficulty?: number;
  expert_notes: number;
  master_difficulty?: number;
  master_notes?: number;
  available?: boolean;
  itunes_id?: number;
  website_url?: string;
};

type GithubRepoType = {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  author: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets: {
    url: string;
    id: number;
    node_id: string;
    name: string;
    label: string | null;
    uploader: {
      login: string;
      id: number;
      node_id: string;
      avatar_url: string;
      gravatar_id: string;
      url: string;
      html_url: string;
      followers_url: string;
      following_url: string;
      gists_url: string;
      starred_url: string;
      subscriptions_url: string;
      organizations_url: string;
      repos_url: string;
      events_url: string;
      received_events_url: string;
      type: string;
      site_admin: boolean;
    };
    content_type: string;
    state: string;
    size: number;
    download_count: number;
    created_at: string;
    updated_at: string;
    browser_download_url: string;
  }[];
  tarball_url: string;
  zipball_url: string;
  body: string;
};

type LLSIFCacheData = {
  current_event_en: {
    image: string;
    japanese_name: string;
  };
  current_event_jp: {
    image: string;
    japanese_name: string;
  };
  current_contests: {
    url: string;
    image: string;
    homepage_image: string;
    name: string | null;
  }[];
  cards_info: {
    max_stats: {
      Smile: number;
      Pure: number;
      Cool: number;
    };
    en_cards: number[];
    years: string[];
    schools: string[];
    songs_max_stats: number;
    idols: {
      total: number;
      name: string;
      idol__japanese_name: string;
    }[];
    sub_units: string[];
    total_cards: number;
    translated_collections: {
      total: number;
      translated_collection: string;
    }[];
    skills: {
      skill: string;
      total: number;
    }[];
    collections: {
      total: number;
      japanese_collection: string;
    }[];
  };
};

type CardSearchParams = {
  search?: string;
  name?: string;
  rarity?: string;
  attribute?: string;
};
