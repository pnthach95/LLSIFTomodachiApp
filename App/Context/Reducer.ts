import type { ActionType } from '~/Utils/type';

const reducer: React.Reducer<typeof initState, ActionType> = (prevState, action) =>{
  switch (action.type) {
    case 'LOADING':
      return {
        ...prevState,
        loading: true,
      };
    case 'DONE_LOADING':
      return {
        ...prevState,
        loading: false,
        cachedData: action.data,
      };
    default:
      return prevState;
  }
}

/** Bộ state ban đầu */
export const initState = {
  /** Trạng thái đang tải */
  loading: true,
  cachedData: {},
};

export default reducer;
