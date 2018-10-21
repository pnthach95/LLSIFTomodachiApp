import { put, call } from 'redux-saga/effects'
import CardListActions from '../Stores/CardList/Actions'
import { LLSIFService } from '../Services/LLSIFService'

export function* fetchCardList(filter) {
  yield put(CardListActions.fetchCardListLoading())
  var data = yield call(LLSIFService.fetchCardList, filter)
  let eventEN = data.current_event_en.japanese_name
  let eventJP = data.current_event_jp.japanese_name
  let data1 = yield call(LLSIFService.fetchEventData, eventEN)
  let data2 = yield call(LLSIFService.fetchEventData, eventJP)
  data.eventEN = data1
  data.eventJP = data2
  if (data) {
    yield put(CardListActions.fetchCachedDataSuccess(data))
  } else {
    yield put(CardListActions.fetchCachedDataFailure('There was an error while fetching card list.'))
  }
}
