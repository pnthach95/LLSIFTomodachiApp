import { offlineActionTypes } from 'react-native-offline';
import * as ActionTypes from './actions/actionTypes';

const init = {
  cachedData: null,
  error: null,
};

export default (state = init, action) => {
  switch (action.type) {
    // SUCCESS
    case ActionTypes.CACHED_DATA_SUCCESS:
      return { ...state, cachedData: action.payload, error: null };
    // ERROR
    case ActionTypes.CACHED_DATA_FAILED:
      return { ...state, error: action.error };
    // react-native-offline
    case offlineActionTypes.CONNECTION_CHANGE:
      return state;
    case offlineActionTypes.FETCH_OFFLINE_MODE:
      return state;
    // DEFAULT
    default:
      return state;
  }
};
