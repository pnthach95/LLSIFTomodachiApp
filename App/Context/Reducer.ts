import { Appearance } from 'react-native';

import type { ActionType, AppState, CachedDataObject } from '~/typings';

const reducer: React.Reducer<AppState, ActionType> = (prevState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...prevState,
        loading: action.loading,
      };
    case 'SAVE_CACHED_DATA':
      return {
        ...prevState,
        cachedData: action.data,
      };
    case 'SAVE_OPTIONS':
      return {
        ...prevState,
        options: action.data,
      };
    default:
      return prevState;
  }
};

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
  wwEvent: true,
  jpEvent: true,
  worldwideOnly: false,
  isDark: Appearance.getColorScheme() === 'dark',
};

/** Initial state */
export const initState: AppState = {
  /** Loading cached data */
  loading: true,
  cachedData: initCachedData,
  /** App options */
  options: initAppOptions,
};

export default reducer;
