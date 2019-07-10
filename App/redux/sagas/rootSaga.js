import { takeLatest } from 'redux-saga/effects';
import fetchCachedData from './CachedDataSaga';
import * as ActionTypes from '../actions/actionTypes';

export default function* rootSaga() {
  yield [
    yield takeLatest(ActionTypes.FETCH_CACHED_DATA, fetchCachedData),
  ];
}
