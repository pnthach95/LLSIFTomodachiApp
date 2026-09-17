import {type ClassValue, clsx} from 'clsx';
import {Alert, Linking} from 'react-native';
import {MMKVLoader, create} from 'react-native-mmkv-storage';
import {twMerge} from 'tailwind-merge';
import {Uniwind} from 'uniwind';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const MMKV = new MMKVLoader().initialize();
export const useStorage = create(MMKV);

/** Add `https:` for image link */
export const AddHTTPS = (link?: string): string | undefined =>
  link ? `https:${link}` : undefined;

/** Find color by attribute */
export const findColorByAttribute = (
  key: AttributeType,
): (string | undefined)[] => {
  const smileColor = Uniwind.getCSSVariable('--color-smile')?.toString();
  const lightSmileColor = Uniwind.getCSSVariable(
    '--color-light-smile',
  )?.toString();
  const pureColor = Uniwind.getCSSVariable('--color-pure')?.toString();
  const lightPureColor =
    Uniwind.getCSSVariable('--color-light-pure')?.toString();
  const coolColor = Uniwind.getCSSVariable('--color-cool')?.toString();
  const lightCoolColor =
    Uniwind.getCSSVariable('--color-light-cool')?.toString();
  const otherAttributeColor = Uniwind.getCSSVariable(
    '--color-other-attribute',
  )?.toString();
  const lightOtherAttributeColor = Uniwind.getCSSVariable(
    '--color-light-other-attribute',
  )?.toString();

  switch (key) {
    case 'Smile':
      return [smileColor, lightSmileColor];
    case 'Pure':
      return [pureColor, lightPureColor];
    case 'Cool':
      return [coolColor, lightCoolColor];
    default:
      return [otherAttributeColor, lightOtherAttributeColor];
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
