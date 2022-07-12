import {Alert, Linking} from 'react-native';
import {MMKVLoader, create} from 'react-native-mmkv-storage';
import {Colors} from '~/Theme';
import type {AttributeType} from '../typings';

const MMKV = new MMKVLoader().initialize();
export const useStorage = create(MMKV);

/** Add `https:` for image link */
export const AddHTTPS = (link: string): string => `https:${link}`;

/** Find color by attribute */
export const findColorByAttribute = (key: AttributeType): string[] => {
  switch (key) {
    case 'Smile':
      return [Colors.pink, Colors.lightPink];
    case 'Pure':
      return [Colors.green, Colors.lightGreen];
    case 'Cool':
      return [Colors.blue, Colors.lightBlue];
    default:
      return [Colors.violet, Colors.lightViolet];
  }
};

/** Find image for skill */
export const findSkill = (key: string): number => {
  switch (key) {
    case 'Score Up':
    case 'Perfect Charm':
    case 'Rhythmical Charm':
    case 'Total Charm':
    case 'Timer Charm':
      return 0;
    case 'Perfect Lock':
    case 'Total Trick':
    case 'Timer Trick':
      return 1;
    case 'Healer':
    case 'Timer Yell':
    case 'Total Yell':
    case 'Rhythmical Yell':
    case 'Perfect Yell':
      return 2;
    default:
      return 3;
  }
};

export const openLink = (link: string) => {
  Alert.alert('Open link', link, [
    {text: 'Cancel', style: 'cancel'},
    {text: 'OK', onPress: () => Linking.openURL(link)},
  ]);
};
