/**
 * @typedef {object} AppStateProps
 * @property {boolean} [loading=true] Trạng thái đang tải
 * @property {object} cachedData
 */

/** Bộ action cho reducer */
export const actions = {
  LOADING: 'LOADING',
  DONE_LOADING: 'DONE_LOADING',
};

/**
 * Reducer
 *
 * @param {AppStateProps} prevState State cũ
 * @param {object} action Action chứa type và các thông số khác
 * @returns {AppStateProps} State mới
 */
function Reducer(prevState, action) {
  switch (action.type) {
    case actions.LOADING:
      return {
        ...prevState,
        loading: true,
      };
    case actions.DONE_LOADING:
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

export default Reducer;
