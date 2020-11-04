import { Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Color from 'color';
import { Colors, Images } from '../Theme';
import type { AttributeType } from './types';

/**
 * Add `https:` for image link
 */
export const AddHTTPS = (link: string): string => `https:${link}`;

/**
 * Find color by attribute
 */
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

/**
 * Find icon by attribute
 */
export const findAttribute = (key: AttributeType) => {
  switch (key) {
    case 'Smile':
      return Images.attribute[0];
    case 'Pure':
      return Images.attribute[1];
    case 'Cool':
      return Images.attribute[2];
    default:
      return Images.attribute[3];
  }
};

/**
 * Find icon by main unit
 */
export const findMainUnit = (key: string) => {
  switch (key) {
    case 'Aqours':
      return Images.mainUnit[1];
    case "μ's":
      return Images.mainUnit[0];
    default:
      return null;
  }
};

/**
 * Find icon by sub unit
 */
export const findSubUnit = (key: string) => {
  switch (key) {
    case 'Printemps':
      return Images.subUnit[0];
    case 'Lily White':
      return Images.subUnit[1];
    case 'Bibi':
      return Images.subUnit[2];
    case 'CYaRon!':
      return Images.subUnit[3];
    case 'AZALEA':
      return Images.subUnit[4];
    case 'Guilty Kiss':
      return Images.subUnit[5];
    case 'Saint Snow':
      return Images.subUnit[6];
    case 'A-RISE':
      return Images.subUnit[7];
    default:
      return null;
  }
};

/**
 * Find image for skill
 */
export const findSkill = (key: string) => {
  switch (key) {
    case 'Score Up':
    case 'Perfect Charm':
    case 'Rhythmical Charm':
    case 'Total Charm':
    case 'Timer Charm':
      return Images.skill[0];
    case 'Perfect Lock':
    case 'Total Trick':
    case 'Timer Trick':
      return Images.skill[1];
    case 'Healer':
    case 'Timer Yell':
    case 'Total Yell':
    case 'Rhythmical Yell':
    case 'Perfect Yell':
      return Images.skill[2];
    default:
      return Images.skill[3];
  }
};

export const loadSettings = async () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('settings')
      .then((res) => {
        if (res === null) {
          resolve({
            ww_event: true,
            jp_event: true,
            worldwide_only: false
          });
        } else {
          resolve(JSON.parse(res));
        }
        resolve(res);
      })
      .catch((err) => reject(err));
  });

export const saveSettings = (settings) => {
  AsyncStorage.setItem('settings', JSON.stringify(settings));
};

export const darkenColor = (color) => Color(color).darken(0.5);

export const openLink = (link: string) => {
  Alert.alert('Open link', link, [
    { text: 'Cancel', onPress: () => {}, style: 'cancel' },
    { text: 'OK', onPress: () => Linking.openURL(link) }
  ]);
};
