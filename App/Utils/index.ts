import { Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '~/Theme';
import { initAppOptions } from '~/Context/Reducer';
import type { AppOptions, AttributeType } from './types';

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

export const loadSettings = async (): Promise<AppOptions> => {
  const res = await AsyncStorage.getItem('settings');
  if (res === null) {
    return initAppOptions;
  } else {
    const parsed: AppOptions = JSON.parse(res);
    return parsed;
  }
};

export const saveSettings = (settings: AppOptions): void => {
  void AsyncStorage.setItem('settings', JSON.stringify(settings));
};

export const openLink = (link: string): void => {
  Alert.alert('Open link', link, [
    { text: 'Cancel', style: 'cancel' },
    { text: 'OK', onPress: () => Linking.openURL(link) },
  ]);
};
