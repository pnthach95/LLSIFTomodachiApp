import { put, call } from 'redux-saga/effects';
import CardListActions from '../Stores/CardList/Actions';
import { LLSIFService } from '~/Services/LLSIFService';

export function* fetchCardList(action) {
  yield put(CardListActions.fetchCardListLoading());
  // console.log('fetchCardList:', JSON.stringify(action.filter))
  const data = yield call(LLSIFService.fetchCardList, action.filter);
  if (data) {
    yield put(CardListActions.fetchCardListSuccess(data));
  } else {
    yield put(CardListActions.fetchCardListFailure('There was an error while fetching card list.'));
  }
}
