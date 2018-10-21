import { put, call } from 'redux-saga/effects'
import CachedDataActions from '../Stores/CachedData/Actions'
import { LLSIFService } from '../Services/LLSIFService'

export function* fetchCachedData() {
  yield put(CachedDataActions.fetchCachedDataLoading())
  var data = yield call(LLSIFService.fetchCachedData)
  let eventEN = data.current_event_en.japanese_name
  let eventJP = data.current_event_jp.japanese_name
  let data1 = yield call(LLSIFService.fetchEventData, eventEN)
  let data2 = yield call(LLSIFService.fetchEventData, eventJP)
  data.eventEN = data1
  data.eventJP = data2
  if (data) {
    yield put(CachedDataActions.fetchCachedDataSuccess(data))
  } else {
    yield put(CachedDataActions.fetchCachedDataFailure('There was an error while fetching cached data.'))
  }
}
