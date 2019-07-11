import * as ActionTypes from './actions/actionTypes';

const init = {
  cachedData: null,
  error: null,
};

export default (state = init, action) => {
  switch (action.type) {
    // SUCCESS
    case ActionTypes.CACHED_DATA_SUCCESS:
      return { ...state, cachedData: action.payload };
    // ERROR
    case ActionTypes.CACHED_DATA_FAILED:
      return { ...state, error: action.payload };
    // DEFAULT
    default:
      return state;
  }
};
