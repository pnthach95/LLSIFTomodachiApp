import { put, call } from 'redux-saga/effects'
import CachedDataActions from 'App/Stores/CachedData/Actions'
import { LLSIFService } from 'App/Services/LLSIFService'

export function* fetchCachedData() {
  yield put(CachedDataActions.fetchCachedDataLoading())
  const data = yield call(LLSIFService.fetchCachedData)
  if (data) {
    yield put(CachedDataActions.fetchCachedDataSuccess(data))
  } else {
    yield put(CachedDataActions.fetchCachedDataFailure('There was an error while fetching cached data.'))
  }
}
