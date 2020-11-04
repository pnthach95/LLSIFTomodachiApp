import type { ActionType, AppState, CachedDataObject } from '~/Utils/types';

const reducer: React.Reducer<AppState, ActionType> = (prevState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...prevState,
        loading: true
      };
    case 'DONE_LOADING':
      return {
        ...prevState,
        loading: false,
        cachedData: action.data
      };
    default:
      return prevState;
  }
};

export const initCachedData: CachedDataObject = {
  ENEvent: {
    image: '',
    japanese_name: '',
    website_url: ''
  },
  JPEvent: {
    image: '',
    japanese_name: '',
    website_url: ''
  },
  bgImage: '',
  eventInfo: {},
  idols: [],
  maxStats: [],
  randomCard: {
    attribute: 'All',
    card_idolized_image: '',
    game_id: '',
    id: 0,
    idol: {
      name: ''
    },
    rarity: 'N',
    website_url: ''
  },
  schools: [],
  skills: [],
  songsMaxStats: [],
  subUnits: []
};

/** Bộ state ban đầu */
export const initState: AppState = {
  /** Trạng thái đang tải */
  loading: true,
  cachedData: initCachedData
};

export default reducer;
