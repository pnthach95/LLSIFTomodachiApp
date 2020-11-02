/*
 * File: type.d.ts
 * Project: llsiftomodachi
 * Created Date: Monday, 02/11/2020, 4:38:28 pm
 * Author: Pham Ngoc Thach
 * -----
 * Last Modified: Monday, 02/11/2020, 4:44:07 pm
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
