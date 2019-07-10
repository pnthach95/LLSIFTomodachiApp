import { createReducer } from 'reduxsauce';
import { INITIAL_STATE } from './InitialState';
import { CachedDataTypes } from './Actions';

export const fetchCachedDataLoading = state => state.merge({
  cachedDataIsLoading: true,
  cachedDataErrorMessage: '',
});

export const fetchCachedDataSuccess = (state, { cachedData }) => state.merge({
  cachedData,
  cachedDataIsLoading: false,
  cachedDataErrorMessage: null,
});

export const fetchCachedDataFailure = (state, { errorMessage }) => state.merge({
  cachedData: null,
  cachedDataIsLoading: false,
  cachedDataErrorMessage: errorMessage,
});

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [CachedDataTypes.FETCH_CACHED_DATA_LOADING]: fetchCachedDataLoading,
  [CachedDataTypes.FETCH_CACHED_DATA_SUCCESS]: fetchCachedDataSuccess,
  [CachedDataTypes.FETCH_CACHED_DATA_FAILURE]: fetchCachedDataFailure,
});
