import {Appearance} from 'react-native';

export const initCachedData: CachedDataObject = {
  ENEvent: {
    image: '',
    japanese_name: '',
    website_url: '',
  },
  JPEvent: {
    image: '',
    japanese_name: '',
    website_url: '',
  },
  eventInfo: {
    jp: [],
    ww: [],
  },
  idols: [],
  maxStats: {
    Smile: 0,
    Pure: 0,
    Cool: 0,
  },
  schools: [],
  skills: [],
  songsMaxStats: 0,
  subUnits: [],
};

export const initAppOptions = {
  jpEvent: true,
  worldwideOnly: false,
  isDark: Appearance.getColorScheme() === 'dark',
};
