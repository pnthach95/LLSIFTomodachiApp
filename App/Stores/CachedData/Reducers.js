/**
 * Reducers specify how the application's state changes in response to actions sent to the store.
 *
 * @see https://redux.js.org/basics/reducers
 */

import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { CachedDataTypes } from './Actions'

export const fetchCachedDataLoading = (state) =>
  state.merge({
    cachedDataIsLoading: true,
    cachedDataErrorMessage: '',
  })

export const fetchCachedDataSuccess = (state, { cachedData }) =>
  state.merge({
    cachedData: cachedData,
    cachedDataIsLoading: false,
    cachedDataErrorMessage: null,
  })

export const fetchCachedDataFailure = (state, { errorMessage }) =>
  state.merge({
    cachedData: null,
    cachedDataIsLoading: false,
    cachedDataErrorMessage: errorMessage,
  })

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const reducer = createReducer(INITIAL_STATE, {
  [CachedDataTypes.FETCH_CACHED_DATA_LOADING]: fetchCachedDataLoading,
  [CachedDataTypes.FETCH_CACHED_DATA_SUCCESS]: fetchCachedDataSuccess,
  [CachedDataTypes.FETCH_CACHED_DATA_FAILURE]: fetchCachedDataFailure,
})
