import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  fetchCachedData: null,
  fetchCachedDataLoading: null,
  fetchCachedDataSuccess: ['cachedData'],
  fetchCachedDataFailure: ['errorMessage'],
})

export const CachedDataTypes = Types
export default Creators
