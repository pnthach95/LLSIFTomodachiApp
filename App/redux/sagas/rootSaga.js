import { takeLatest, fork, all } from 'redux-saga/effects';
import { networkSaga } from 'react-native-offline';
import fetchCachedData from './CachedDataSaga';
import * as ActionTypes from '../actions/actionTypes';

export default function* rootSaga() {
  // eslint-disable-next-line redux-saga/no-unhandled-errors
  yield all([
    takeLatest(ActionTypes.FETCH_CACHED_DATA, fetchCachedData),
    fork(networkSaga),
  ]);
}
