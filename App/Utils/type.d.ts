/*
 * File: type.d.ts
 * Project: llsiftomodachi
 * Created Date: Monday, 02/11/2020, 4:38:28 pm
 * Author: Pham Ngoc Thach
 * -----
 * Last Modified: Monday, 02/11/2020, 11:08:22 pm
 * Modified By: Pham Ngoc Thach (thachpn@honeynet.vn)
 * -----
 * Copyright © 2020 HONEYNET
 * ------------------------------------
 */

import { StackScreenProps } from '@react-navigation/stack';

type iconComponent = React.FC<{
  focused?: boolean;
  color: string;
}>;

type bottomTabList = {
  MainScreen: undefined;
  CardsScreen: undefined;
  IdolsScreen: undefined;
  EventsScreen: undefined;
  SongsScreen: undefined;
};

type RootStackParamList = {
  DrawerScreen: undefined,
  CardDetailScreen: undefined,
  EventDetailScreen: undefined,
  IdolDetailScreen: undefined,
  SongDetailScreen: undefined,
};

type DrawerScreenProps = StackScreenProps<RootStackParamList, 'DrawerScreen'>;
type CardDetailScreenProps = StackScreenProps<RootStackParamList, 'CardDetailScreen'>;
type EventDetailScreenProps = StackScreenProps<RootStackParamList, 'EventDetailScreen'>;
type IdolDetailScreenProps = StackScreenProps<RootStackParamList, 'IdolDetailScreen'>;
type SongDetailScreenProps = StackScreenProps<RootStackParamList, 'SongDetailScreen'>;

type YearType = 'First' | 'Second' | 'Third' | '';
type MainUnitNames = `μ's` | 'Aqours' | '';
type BooleanOrEmpty = 'True' | 'False' | '';
type AttributeType = 'Smile' | 'Pure' | 'Cool' | 'All' | '';
type RarityType = 'N' | 'R' | 'SR' | 'SSR' | 'UR' | '';
type SkillType = 'Score Up' | 'Healer' | 'Perfect Lock' | 'Perfect Charm'
  | 'Rhythmical Charm' | 'Timer Yell' | 'Timer Charm' | 'Rhythmical Yell'
  | 'Total Charm' | 'Total Trick' | 'Perfect Yell' | 'Total Yell' | 'Timer Trick';

type CardObject = {
  id: number
  idol: MiniIdolObject
  rarity: RarityType
  attribute: AttributeType
  japanese_collection?: string
  translated_collection?: string
  japanese_attribute?: string
  is_promo?: boolean
  promo_item?: string
  promo_link?: string
  release_date?: string
  japan_only?: boolean
  event?: MiniEventObject
  is_special?: boolean
  hp?: number
  minimum_statistics_smile?: string
  minimum_statistics_pure?: string
  minimum_statistics_cool?: string
  non_idolized_maximum_statistics_smile?: string
  non_idolized_maximum_statistics_pure?: string
  non_idolized_maximum_statistics_cool?: string
  idolized_maximum_statistics_smile?: string
  idolized_maximum_statistics_pure?: string
  idolized_maximum_statistics_cool?: string
  skill?: SkillType
  japanese_skill?: string
  skill_details?: string
  japanese_skill_details?: string
  center_skill?: string
  center_skill_details?: string
  japanese_center_skill?: string
  japanese_center_skill_details?: string
  card_image?: string
  card_idolized_image?: string
  round_card_image?: string
  round_card_idolized_image?: string
  video_story?: string
  japanese_video_story?: string
  website_url: string
  non_idolized_max_level?: number
  idolized_max_level?: number
  transparent_image?: string
  transparent_idolized_image?: string
  clean_ur?: string
  clean_ur_idolized?: string
  skill_up_cards?: TinyCardForSkillUpObject
  ur_pair?: URPairObject
  total_owners?: number
  total_wishlist?: number
  ranking_attribute?: number
  ranking_rarity?: number
  ranking_special?: number
}

type MiniIdolObject = {
  name: string
  school?: string
  year?: string
  main_unit?: string
  japanese_name?: string
  sub_unit?: string
}

type MiniEventObject = {
  japanese_name: string
  english_name?: string
  translated_name?: string
  image?: string
}

type TinyCardForSkillUpObject = {
  id?: string
  round_card_image: string
}

type URPairObject = {
  card?: {
    attribute?: string
    round_card_image?: string
    id?: string
    name?: string
  }
  reverse_display_idolized?: string
  reverse_display?: string
}

type EventObject = {
  japanese_name: string
  romaji_name?: string
  english_name?: string
  translated_name?: string
  image: string
  english_image?: string
  beginning?: string
  end?: string
  english_beginning?: string
  english_end?: string
  japan_current?: boolean
  world_current?: boolean
  english_status?: string
  japan_status?: string
  japanese_t1_points?: number
  japanese_t1_rank?: number
  japanese_t2_points?: number
  japanese_t2_rank?: number
  english_t1_points?: number
  english_t1_rank?: number
  english_t2_points?: number
  english_t2_rank?: number
  note?: string
  website_url: string
}

type IdolObject = {
  name: string
  japanese_name?: string
  main?: boolean
  age?: number
  school?: string
  birthday?: string
  astrological_sign?: string
  blood?: string
  height?: number
  measurements?: string
  favorite_food?: string
  least_favorite_food?: string
  hobbies?: string
  attribute?: AttributeType
  year?: string
  main_unit?: string
  sub_unit?: string
  cv?: CVObject
  summary?: string
  website_url: string
  wiki_url?: string
  wikia_url?: string
  official_url?: string
  chibi?: string
  chibi_small?: string
}

type CVObject = {
  name: string
  nickname: string
  url: string
  twitter?: string
  instagram?: string
}

type SongObject = {
  name: string
  romaji_name?: string
  translated_name?: string
  attribute?: AttributeType
  main_unit?: string
  BPM?: number
  time?: number
  event?: string
  rank?: number
  daily_rotation?: string
  daily_rotation_position?: number
  image: string
  easy_difficulty?: number
  easy_notes?: number
  normal_difficulty?: number
  normal_notes?: number
  hard_difficulty?: number
  hard_notes?: number
  expert_difficulty?: number
  expert_random_difficulty?: number
  expert_notes?: number
  master_difficulty?: number
  master_notes?: number
  available?: boolean
  itunes_id?: number
  website_url?: string
}
