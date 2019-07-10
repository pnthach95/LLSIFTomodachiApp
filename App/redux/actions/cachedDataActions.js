import * as ActionTypes from './actionTypes';

export const fetchCachedDataSuccess = data => ({
  type: ActionTypes.CACHED_DATA_SUCCESS,
  cachedData: data,
});

export const fetchCachedDataFailure = error => ({
  type: ActionTypes.CACHED_DATA_FAILED,
  error,
});
